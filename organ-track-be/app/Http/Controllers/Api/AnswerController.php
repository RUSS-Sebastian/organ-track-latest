<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAnswer;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\AiReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnswerController extends Controller
{
    /**
     * Submit answers, generate AI report, and return report ID
     */
    public function submitAndGenerateReport(Request $request)
{
    $userId = Auth::id();
    $answers = $request->answers;

    if (empty($answers)) {
        return response()->json(['message' => 'No answers provided'], 400);
    }

    $aiFormat = [];
    $organGroups = [];

    // Collect question & option IDs
    $questionIds = collect($answers)->pluck('question_id');
    $optionIds = collect($answers)->pluck('option_ids');

    $questions = Question::with('organ')->whereIn('id', $questionIds)->get()->keyBy('id');
    $options = QuestionOption::whereIn('id', $optionIds)->get()->keyBy('id');

    // Save answers and group by organ
    foreach ($answers as $answer) {
        $question = $questions[$answer['question_id']] ?? null;
        $optionId = is_array($answer['option_ids']) ? $answer['option_ids'][0] : $answer['option_ids'];
        $option = $options[$optionId] ?? null;

        if ($question && $option) {
            UserAnswer::create([
                'user_id' => $userId,
                'question_id' => $question->id,
                'option_id' => $option->id,
                'answered_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $organName = $question->organ?->name ?? 'General';

            $aiFormat[] = [
                'question_text' => $question->question_text_en,
                'option_text' => $option->option_text_en,
                'organ' => $organName
            ];

            $organGroups[$organName][] = [
                'question' => $question->question_text_en,
                'answer' => $option->option_text_en
            ];
        }
    }

    $results = [];

    // Generate AI report per organ
    foreach ($organGroups as $organName => $qaPairs) {
        $formattedQA = "";
        $count = 1;
        foreach ($qaPairs as $qa) {
            $formattedQA .= "Q{$count}: {$qa['question']}\n";
            $formattedQA .= "Answer: {$qa['answer']}\n\n";
            $count++;
        }

        $prompt = "
You are a health symptom analysis assistant for a mobile health tracking app.
Your job:
Analyze the provided question and answer pairs related to ONE organ and generate structured health insights for a user interface.

IMPORTANT RULES:
- This is NOT a medical diagnosis.
- Use calm, supportive language.
- Avoid scary or alarming words.
- Do not mention AI, analysis, or reasoning.
- Do not explain anything outside the format.
- Keep language simple and easy to read.

IMPORTANT OUTPUT RULES:
You MUST return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanations.
Do NOT include text before or after JSON.

Return JSON in this exact structure:

{
  \"risk_level\": \"Good | Moderate | High\",
  \"possible_indicators\": [\"short phrase\"],
  \"immediate_recommendations\": [\"short action\"],
  \"lifestyle_adjustments\": [\"long-term habit\"],
  \"seek_medical_help_if\": [\"red flag symptom\"]
}
Now analyze the following answers:

Organ: {$organName}

{$formattedQA}
";

        $aiResult = $this->callOpenRouter($prompt);

        // Save new AI report
        $report = AiReport::create([
            'user_id' => $userId,
            'answered_date' => now(),
            'organ_name' => $organName,
            'ai_response' => $aiResult,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $results[$organName] = $report->id; // return latest report ID per organ
    }

    return response()->json([
        'report_ids' => $results
    ]);
}


    /**
     * Call OpenRouter API
     */
    private function callOpenRouter($prompt)
{
    try {
        $apiKey = env('OPENROUTER_API_KEY');
        
        if (empty($apiKey)) {
            Log::error('OpenRouter API key is missing');
            return [];
        }
        
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => 'arcee-ai/trinity-large-preview:free',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ]
        ]);

        // Check if response is valid
        if (!$response instanceof \Illuminate\Http\Client\Response) {
            Log::error('Invalid response object');
            return [];
        }

        if ($response->failed()) {
            Log::error('OpenRouter API request failed', [
                'status' => method_exists($response, 'status') ? $response->status() : 'unknown',
                'body' => method_exists($response, 'body') ? $response->body() : 'unknown',
            ]);
            return [];
        }

        $data = method_exists($response, 'json') ? $response->json() : null;
        
        if (!$data) {
            Log::error('Failed to parse response JSON');
            return [];
        }

        if (!isset($data['choices'][0]['message']['content'])) {
            Log::error('OpenRouter response missing content', ['response' => $data]);
            return [];
        }

        $raw = $data['choices'][0]['message']['content'];

        // Remove markdown if AI adds it
        $raw = preg_replace('/```json|```/', '', $raw);
        $raw = trim($raw);

        $decoded = json_decode($raw, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Invalid JSON from OpenRouter', ['raw' => $raw]);
            return [];
        }

        return $decoded;

    } catch (\Exception $e) {
        Log::error('OpenRouter API exception', [
            'error' => $e->getMessage()
        ]);
        return [];
    }
}
}