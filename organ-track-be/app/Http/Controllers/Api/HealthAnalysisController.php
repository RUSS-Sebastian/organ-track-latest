<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\HealthReportOrgan;
use App\Models\HealthReport;

class HealthAnalysisController extends Controller
{
    /**
     * Prepare AI prompt for health analysis based on date range.
     */
    public function generatePrompt(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $userId = Auth::id();
        $startDate = $request->start_date;
        $endDate = $request->end_date;

        // Fetch all organs ai_response for this user between start_date and end_date
        $organResponses = HealthReportOrgan::whereHas('report', function ($query) use ($userId, $startDate, $endDate) {
                $query->where('user_id', $userId)
                      ->whereBetween('report_date', [$startDate, $endDate]);
            })
            ->with('organ')
            ->orderBy('report.report_date')
            ->get();
        

        // Prepare list of JSON objects for prompt
        $dataForAnalysis = $organResponses->map(function ($item) {
            $ai = $item->ai_response;
            return [
                'date' => $item->report->report_date->toDateString(),
                'name' => $item->organ->name,
                'score' => $ai['score'] ?? null,
                'summary' => $ai['summary'] ?? '',
                'positive_effects' => $ai['positive_effects'] ?? [],
                'negative_effects' => $ai['negative_effects'] ?? [],
                'identified_conditions' => $ai['identified_conditions'] ?? [],
                'recommendations' => $ai['recommendations'] ?? [],
            ];
        });

        // Encode array as JSON string with pretty print for readability
        $dataJson = json_encode($dataForAnalysis, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        // Construct the full prompt string
        $prompt = <<<PROMPT
            You are a health analysis assistant. You will receive multiple JSON objects from a user's organ health reports between {$startDate} and {$endDate}. Each JSON represents one organ's daily AI analysis.

            Each object looks like this:

            {
            "name": "Pancreas",
            "score": 73,
            "summary": "No sugar intake helps, but unbalanced diet may affect insulin regulation.",
            "positive_effects": ["Avoided sugary foods and processed items"],
            "negative_effects": ["Lack of balanced meals with protein and vegetables", "General poor dietary habits"],
            "identified_conditions": ["Risk of metabolic imbalance or insulin resistance"],
            "recommendations": [
                "Eat meals with protein, healthy fats, and complex carbs",
                "Avoid skipping meals to regulate blood sugar",
                "Limit refined carbohydrates",
                "Include foods like nuts and legumes",
                "Get regular blood sugar checks if at risk"
            ]
            }

            You will receive a **list of these JSON objects**, for all organs for all days in the range. 

            Your task is to:

            1. Generate an **overallScore** (0-100) and a **short overallSummary** (1-2 sentences) summarizing user's habits and health trends.
            2. Write **overallSummary**: a short paragraph describing the user's general habits and health based on all organs.
            3. For each organ:
            - Include `avg`, `max`, `min`, `score` (overall average score for that organ across the date range)
            - Include `explanation`: a short compact 1 sentence summarizing the organ health. 
            4. Aggregate **habits**:
            - positive: merge all positive_effects across organs and remove duplicates
            - negative: merge all negative_effects across organs and remove duplicates
            5. Generate **habit streaks** based on repeated positive or negative patterns. Include at least one streak if possible.
            - Format: { text: "habit description", days: <number>, type: "positive" | "negative" }
            6. Generate **recommendations** (at most 7 items) for improving health, related to observed habits and organ health.
            
            **Constraints**:
            - overallSummary and organ explanations must be compact, 1-2 sentences
            - recommendations max 7 items
            - include at least one habit streak if possible
            - output must be valid JSON only

            Here is the **data for analysis**:

            {$dataJson}
            PROMPT;

        // call AI
        $aiReport = $this->generateHealthReportAI($prompt);

        if (!$aiReport) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate AI report.'
            ], 500);
        }
    }


    private function generateHealthReportAI($prompt)
{
    // allow longer execution for AI call
    set_time_limit(240);

    try {
        \Log::info('Health Report AI: Request started');

        $apiKey = env('OPENROUTER_API_KEY');

        if (!$apiKey) {
            \Log::error('Health Report AI: Missing OPENROUTER_API_KEY');
            return null;
        }

        // send request to OpenRouter
        $response = \Illuminate\Support\Facades\Http::timeout(240)
            ->connectTimeout(30)
            ->withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])
            ->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'tencent/hy3:free',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ]
            ]);

        \Log::info('Health Report AI: API request sent');

        if (!$response instanceof \Illuminate\Http\Client\Response) {
            \Log::error('Health Report AI: Invalid response object');
            return null;
        }

        if ($response->failed()) {
            \Log::error('Health Report AI: API request failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return null;
        }

        $data = $response->json();

        if (!$data) {
            \Log::error('Health Report AI: Failed to parse API JSON');
            return null;
        }

        if (!isset($data['choices'][0]['message']['content'])) {
            \Log::error('Health Report AI: Missing AI content', [
                'response' => $data
            ]);
            return null;
        }

        $raw = $data['choices'][0]['message']['content'];

        \Log::info('Health Report AI: Raw response received');

        // Remove markdown if AI adds ```json or ```
        $raw = preg_replace('/```json|```/', '', $raw);
        $raw = trim($raw);

        // Decode JSON
        $decoded = json_decode($raw, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            \Log::error('Health Report AI: Invalid JSON returned', [
                'json_error' => json_last_error_msg(),
                'raw_response' => $raw
            ]);
            return null;
        }

        // Ensure organs key exists
        if (!isset($decoded['organs'])) {
            \Log::error('Health Report AI: Missing organs key', [
                'decoded' => $decoded
            ]);
            return null;
        }

        \Log::info('Health Report AI: Successfully parsed', [
            'organ_count' => count($decoded['organs'])
        ]);

        return $decoded;

    } catch (\Exception $e) {
        \Log::error('Health Report AI: Exception occurred', [
            'error' => $e->getMessage()
        ]);

        return null;
    }
}
}