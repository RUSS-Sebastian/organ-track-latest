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
use App\Models\HealthReport;
use App\Models\HealthReportOrgan;
use App\Models\OrganScoreHistory;
use App\Http\Controllers\OrganScoreController;

class AnswerController extends Controller
{
    /**
     * Submit answers, generate AI report, and return report ID
     */
    /**public function submitDaily(Request $request)
    {
        $userId = Auth::id();
        $answers = $request->answers;

        $userTimezone = $request->input('timezone', config('app.timezone')); // default if not sent
        $dt = new \DateTime('now', new \DateTimeZone($userTimezone));
        $now = $dt->format('Y-m-d H:i:s'); // same format as Laravel's now()
        $reportDate = $dt->format('Y-m-d');

        $organMap = [
            'Heart' => 1,
            'Brain' => 2,
            'Lungs' => 3,
            'Liver' => 4,
            'Kidney' => 5,
            'Stomach' => 6,
            'Muscles' => 7,
            'Intestine' => 8,
            'Gall Bladder' => 9,
            'Pancreas' => 10,
            'Skin' => 11,
            'Bladder' => 12,
            'Blood Vessels' => 13,
            'Bone' => 14,
            'Prostate' => 15, // male
            'Uterus' => 16,   // female
        ];

        if (empty($answers)) {
            return response()->json(['message' => 'No answers provided'], 400);
        }

        $aiFormat = [];

        // Collect question & option IDs
        $questionIds = collect($answers)->pluck('question_id');
        $optionIds = collect($answers)->pluck('option_ids');

        $questions = Question::whereIn('id', $questionIds)->get()->keyBy('id');
        $options = QuestionOption::whereIn('id', $optionIds)->get()->keyBy('id');

        // Save answers and build AI format (no organ grouping)
        foreach ($answers as $answer) {

            $question = $questions[$answer['question_id']] ?? null;

            $optionId = is_array($answer['option_ids'])
                ? $answer['option_ids'][0]
                : $answer['option_ids'];

            $option = $options[$optionId] ?? null;

            if ($question && $option) {

                // Format only question & answer pair
                $aiFormat[] = [
                    'question_text' => $question->question_text_en,
                    'answer_text'   => $option->option_text_en
                ];

                UserAnswer::create([
                    'user_id' => $userId,
                    'question_id' => $question->id,
                    'option_id' => $option->id,
                    'answered_at' => $now
                ]);
            }
        }

        $formattedQA = "";
        $count = 1;

        foreach ($aiFormat as $qa) {
            $formattedQA .= "Q{$count}: {$qa['question_text']}\n";
            $formattedQA .= "Answer: {$qa['answer_text']}\n\n";
            $count++;
        }

        // Determine gender-specific organ
        $user = Auth::user();
        $genderOrgan = $user->gender === 'male' ? 'Prostate' : 'Uterus';
        $organScoresController = app(OrganScoreController::class);
        $scoresData = $organScoresController->getLatestOrganScores()->getData(true);
        $prevScores = $scoresData['scores'];

         // Make sure gender organ is included
        if (!isset($prevScores[$genderOrgan])) {
            $prevScores[$genderOrgan] = 75;
        }

        // Format as JSON string for prompt
        $prevScoresJson = json_encode($prevScores, JSON_PRETTY_PRINT);

        // --- BUILD AI PROMPT ---

        $prompt = "
            You are a medical lifestyle analysis AI.

            Your task is to analyze a user's daily habit question–answer pairs and generate a daily health report for 15 organs;

            This is NOT a medical diagnosis.

            Return ONLY valid JSON.

            ---

            ORGANS

            1. Heart
            2. Brain
            3. Lungs
            4. Liver
            5. Kidney
            6. Stomach
            7. Muscles
            8. Intestine
            9. Gall Bladder
            10. Pancreas
            11. Skin
            12. Bladder
            13. Blood Vessels
            14. Bone
            15. {$genderOrgan}

            ---

            USER DAILY HABIT ANSWERS

            {$formattedQA}

            ---

            PREVIOUS ORGAN SCORES

            {$prevScoresJson}

            ---

            SCORING RULES

            Score change must be between -2 and +2.

            for example, if current score is 65 then next score can only be between 63 and 67 including both.

            Score range must remain between 0 and 100.

            ---

            FOR EACH ORGAN RETURN

            score  
            summary (2 sentences)

            positive_effects  
            negative_effects  
            identified_conditions  
            recommendations (max 10)

            ---

            JSON FORMAT

            {
            \"organs\": [
            {
            \"name\": \"Heart\",
            \"score\": 66,
            \"summary\": \"...\",
            \"positive_effects\": [],
            \"negative_effects\": [],
            \"identified_conditions\": [],
            \"recommendations\": []
            }
            ]
            }

            ---

            IMPORTANT

            Return exactly 15 organs.

            Return JSON only.
        ";

        $result = $this->generateDailyHealthReportAI($prompt);

        // Save health report
        $healthReport = HealthReport::create([
            'user_id' => $userId,
            'report_date' => $reportDate,
        ]);

        $healthReportId = $healthReport->id;

        foreach ($result['organs'] as $organData) {
            $organName = $organData['name'];

            // Get organ_id from map
            $organId = $organMap[$organName] ?? null;
            if (!$organId) {
                // skip if mapping missing
                Log::warning("Organ ID not found for: {$organName}");
                continue;
            }

            // AI response for this organ only
            $aiResponse = json_encode($organData, JSON_UNESCAPED_UNICODE);
            // Get current score for organ (from AI response)
            $score = $organData['score'] ?? 75; // fallback default if missing


            // Save to health_report_organs
            HealthReportOrgan::create([
                'health_report_id' => $healthReportId,
                'organ_id' => $organId,
                'ai_response' => $aiResponse,
            ]);

            // Save to organ_score_histories
            OrganScoreHistory::create([
                'user_id'     => $userId,
                'organ_id'    => $organId,
                'report_date' => $reportDate,
                'score'       => $score,
            ]);


        }


    }**/
    public function submitDaily(Request $request)
    {
        Log::info('submitDaily: Request started', ['user_id' => Auth::id()]);

        $userId = Auth::id();
        $answers = $request->answers;

        $userTimezone = $request->input('timezone', config('app.timezone'));
        $dt = new \DateTime('now', new \DateTimeZone($userTimezone));
        $now = $dt->format('Y-m-d H:i:s');
        $reportDate = $dt->format('Y-m-d');

        $organMap = [
            'Heart' => 1, 'Brain' => 2, 'Lungs' => 3, 'Liver' => 4,
            'Kidney' => 5, 'Stomach' => 6, 'Muscles' => 7, 'Intestine' => 8,
            'Gall Bladder' => 9, 'Pancreas' => 10, 'Skin' => 11, 'Bladder' => 12,
            'Blood Vessels' => 13, 'Bone' => 14, 'Prostate' => 15, 'Uterus' => 16,
        ];

        if (empty($answers)) {
            Log::warning('submitDaily: No answers provided', ['user_id' => $userId]);
            return response()->json(['message' => 'No answers provided'], 400);
        }

        $aiFormat = [];

        // Collect IDs
        $questionIds = collect($answers)->pluck('question_id');
        $optionIds = collect($answers)->pluck('option_ids');

        $questions = Question::whereIn('id', $questionIds)->get()->keyBy('id');
        $options = QuestionOption::whereIn('id', $optionIds)->get()->keyBy('id');

        foreach ($answers as $answer) {
            $question = $questions[$answer['question_id']] ?? null;
            $optionId = is_array($answer['option_ids']) ? $answer['option_ids'][0] : $answer['option_ids'];
            $option = $options[$optionId] ?? null;

            if ($question && $option) {
                $aiFormat[] = [
                    'question_text' => $question->question_text_en,
                    'answer_text' => $option->option_text_en
                ];

                try {
                    UserAnswer::create([
                        'user_id' => $userId,
                        'question_id' => $question->id,
                        'option_id' => $option->id,
                        'answered_date' => $now
                    ]);
                } catch (\Exception $e) {
                    Log::error('submitDaily: Failed to save UserAnswer', [
                        'user_id' => $userId,
                        'question_id' => $question->id,
                        'option_id' => $option->id,
                        'error' => $e->getMessage()
                    ]);
                }
            }
        }

        // Format Q&A for AI
        $formattedQA = "";
        foreach ($aiFormat as $index => $qa) {
            $formattedQA .= "Q" . ($index + 1) . ": {$qa['question_text']}\n";
            $formattedQA .= "Answer: {$qa['answer_text']}\n\n";
        }

        // Determine gender-specific organ
        $user = Auth::user();
        $genderOrgan = $user->gender === 'male' ? 'Prostate' : 'Uterus';

        // Get previous scores
        try {
            $organScoresController = app(OrganScoreController::class);
            $scoresData = $organScoresController->getLatestOrganScores()->getData(true);
            $prevScores = $scoresData['scores'] ?? [];
        } catch (\Exception $e) {
            Log::error('submitDaily: Failed to fetch previous organ scores', [
                'user_id' => $userId,
                'error' => $e->getMessage()
            ]);
            $prevScores = [];
        }

        if (!isset($prevScores[$genderOrgan])) {
            $prevScores[$genderOrgan] = 75;
        }

        $prevScoresJson = json_encode($prevScores, JSON_PRETTY_PRINT);

        // Build AI prompt
        $prompt = "
            You are a medical lifestyle analysis AI.

            Your task is to analyze a user's daily habit question–answer pairs and generate a daily health report for 15 organs;

            This is NOT a medical diagnosis.

            Return ONLY valid JSON.

            ---

            ORGANS

            1. Heart
            2. Brain
            3. Lungs
            4. Liver
            5. Kidney
            6. Stomach
            7. Muscles
            8. Intestine
            9. Gall Bladder
            10. Pancreas
            11. Skin
            12. Bladder
            13. Blood Vessels
            14. Bone
            15. {$genderOrgan}

            ---

            USER DAILY HABIT ANSWERS

            {$formattedQA}

            ---

            PREVIOUS ORGAN SCORES

            {$prevScoresJson}

            ---

            SCORING RULES

            Score change must be between -2 and +2.

            for example, if current score is 65 then next score can only be between 63 and 67 including both.

            Score range must remain between 0 and 100.

            ---

            FOR EACH ORGAN RETURN

            score  
            summary (1 short sentence)

            positive_effects (as short and compact as possible)
            negative_effects (as short and compact as possible)
            identified_conditions (as short and compact as possible)
            recommendations (max 5)

            ---

            JSON FORMAT

            {
                \"organs\": [
                    {
                        \"name\": \"Heart\",
                        \"score\": 66,
                        \"summary\": \"...\",
                        \"positive_effects\": [...],
                        \"negative_effects\": [...],
                        \"identified_conditions\": [...],
                        \"recommendations\": [...]
                    } 
                ]
            }

            ---

            IMPORTANT

            Return exactly 15 organs.
            Return JSON only.
            Respond **ONLY** with valid JSON.
            
        ";

        $result = $this->generateDailyHealthReportAI($prompt);

        if (!$result) {
            Log::error('submitDaily: AI returned null or invalid response', ['user_id' => $userId]);
            return response()->json(['message' => 'AI report generation failed'], 500);
        }

        // Save HealthReport
        try {
            $healthReport = HealthReport::create([
                'user_id' => $userId,
                'report_date' => $reportDate,
            ]);
            $healthReportId = $healthReport->id;
        } catch (\Exception $e) {
            Log::error('submitDaily: Failed to create HealthReport', [
                'user_id' => $userId,
                'error' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to save health report'], 500);
        }

        // Save HealthReportOrgan & OrganScoreHistory
        foreach ($result['organs'] as $organData) {
            $organName = $organData['name'];
            $organId = $organMap[$organName] ?? null;

            if (!$organId) {
                Log::warning('submitDaily: Organ ID not found for organ', ['organ' => $organName]);
                continue;
            }

            
            $score = $organData['score'] ?? 75;

            try {
                HealthReportOrgan::create([
                    'health_report_id' => $healthReportId,
                    'organ_id' => $organId,
                    'ai_response' => $organData,
                ]);
            } catch (\Exception $e) {
                Log::error('submitDaily: Failed to save HealthReportOrgan', [
                    'health_report_id' => $healthReportId,
                    'organ_id' => $organId,
                    'error' => $e->getMessage()
                ]);
            }

            try {
                OrganScoreHistory::create([
                    'user_id' => $userId,
                    'organ_id' => $organId,
                    'report_date' => $reportDate,
                    'score' => $score,
                ]);
            } catch (\Exception $e) {
                Log::error('submitDaily: Failed to save OrganScoreHistory', [
                    'user_id' => $userId,
                    'organ_id' => $organId,
                    'score' => $score,
                    'error' => $e->getMessage()
                ]);
            }
        }

        Log::info('submitDaily: Successfully completed', ['user_id' => $userId, 'health_report_id' => $healthReportId]);

        // Return response to frontend
        return response()->json([
            'message' => 'Daily health report generated successfully',
            'health_report_id' => $healthReportId,
            'ai_report' => $result
        ]);
    }


    private function generateDailyHealthReportAI($prompt)
    {
        set_time_limit(240); // allow script to run for 120 seconds

        try {

            Log::info('Health Report AI: Request started');

            $apiKey = env('OPENROUTER_API_KEY');

            if (!$apiKey) {
                Log::error('Health Report AI: Missing OPENROUTER_API_KEY');
                return null;
            }



            $response = Http::timeout(240)
                ->connectTimeout(30)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'stepfun/step-3.5-flash:free',
                    'response_format' => ['type' => 'json_object'],
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ]
                ]
            );

            Log::info('Health Report AI: API request sent');

            if (!$response instanceof \Illuminate\Http\Client\Response) {
                Log::error('Health Report AI: Invalid response object');
                return null;
            }

            if ($response->failed()) {
                Log::error('Health Report AI: API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return null;
            }

            $data = $response->json();

            if (!$data) {
                Log::error('Health Report AI: Failed to parse API JSON');
                return null;
            }

            if (!isset($data['choices'][0]['message']['content'])) {
                Log::error('Health Report AI: Missing AI content', [
                    'response' => $data
                ]);
                return null;
            }

            $raw = $data['choices'][0]['message']['content'];

            Log::info('Health Report AI: Raw response received');

            // remove markdown if AI adds it
            $raw = preg_replace('/```json|```/', '', $raw);
            $raw = trim($raw);

            /*
            |---------------------------------------------
            | FIX 1: Remove control characters
            |---------------------------------------------
            | These characters sometimes break json_decode()
            */
            $raw = preg_replace('/[\x00-\x1F\x7F]/u', '', $raw);

            /*
            |---------------------------------------------
            | FIX 2: Detect truncated AI responses
            |---------------------------------------------
            | If JSON does not end with }, it means
            | the AI response was cut off.
            */
            if (!str_ends_with(trim($raw), '}')) {
                Log::error('Health Report AI: Response truncated', [
                    'raw_response' => $raw
                ]);
                return null;
            }

            $decoded = json_decode($raw, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Health Report AI: Invalid JSON returned', [
                    'json_error' => json_last_error_msg(),
                    'raw_response' => $raw
                ]);
                return null;
            }

            if (!isset($decoded['organs'])) {
                Log::error('Health Report AI: Missing organs key', [
                    'decoded' => $decoded
                ]);
                return null;
            }

            Log::info('Health Report AI: Successfully parsed', [
                'organ_count' => count($decoded['organs'])
            ]);

            if (!$decoded || !isset($decoded['organs'])) {
                Log::error('Health Report AI: Invalid AI response', ['data' => $data]);
                return null;
            }

            return $decoded;

        } catch (\Exception $e) {

            Log::error('Health Report AI: Exception occurred', [
                'error' => $e->getMessage()
            ]);

            return null;
        }
    }



    public function submitAndGenerateReport(Request $request)
    {
        $userId = Auth::id();
        $answers = $request->answers;

        $userTimezone = $request->input('timezone', config('app.timezone')); // default if not sent
        $dt = new \DateTime('now', new \DateTimeZone($userTimezone));
        $now = $dt->format('Y-m-d H:i:s'); // same format as Laravel's now()

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
                'answered_date' => $now,
                'organ_name' => $organName,
                'ai_response' => $aiResult,
                'created_at' => $now,
                'updated_at' =>$now
            ]);
            Log::info('Created AI report', ['report_id' => $report->id, 'user_id' => $userId]);
            $reportId = $report->id; // use directly

            // ✅ Update the report_name after getting the ID
            $report->report_name = "Track - {$reportId}";
            $report->save();

            // 5️⃣ Save UserAnswers using original IDs and link with report ID
            foreach ($answers as $answer) {
                $question = Question::find($answer['question_id']);
                $optionId = is_array($answer['option_ids']) ? $answer['option_ids'][0] : $answer['option_ids'];
                $option = QuestionOption::find($optionId);

                if ($question && $option) {
                    UserAnswer::create([
                        'user_id' => $userId,
                        'ai_report_id' => $reportId,
                        'question_id' => $question->id,
                        'option_id' => $option->id,
                        'answered_date' => $now,
                    ]);
                }
            }

            $results[$organName] = $reportId; // return latest report ID per organ
            Log::info('submitAndGenerateReport response', ['results' => $results]);
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
            'model' => "openrouter/owl-alpha",
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

    public function getReportById($reportId)
    {
        $userId = Auth::id();

        // Find AI report for this user
        $report = AiReport::where('id', $reportId)
                        ->where('user_id', $userId)
                        ->first();

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        // Return structured JSON for frontend
        return response()->json([
            'title' => $report->report_name,
            'date' => $report->answered_date,
            'riskLevel' => $report->ai_response['risk_level'] ?? 'Unknown',
            'indicators' => $report->ai_response['possible_indicators'] ?? [],
            'immediateRecommendations' => $report->ai_response['immediate_recommendations'] ?? [],
            'lifestyleAdjustments' => $report->ai_response['lifestyle_adjustments'] ?? [],
            'seekMedical' => $report->ai_response['seek_medical_help_if'] ?? [],
        ]);
    }

    public function check(Request $request)
    {
        $userId = Auth::id(); // get currently logged-in user
        $today = $request->query('today'); // YYYY-MM-DD from user device


        // Count of active Daily questions
        $totalDailyQuestions = Question::where('category_type', 'Daily')
            ->where('is_active', true) // tinyint 1
            ->count();

        // Count of today's answers by this user for Daily questions
        $todayAnswersCount = UserAnswer::where('user_id', $userId)
            ->whereNull('ai_report_id') // only Daily questions
            ->whereDate('answered_date', $today)
            ->count();

        $answeredToday = $todayAnswersCount >= $totalDailyQuestions;

        return response()->json([
            'answered_today' => $answeredToday,
            'total_daily_questions' => $totalDailyQuestions,
            'today_answers_count' => $todayAnswersCount
        ]);
    }
}