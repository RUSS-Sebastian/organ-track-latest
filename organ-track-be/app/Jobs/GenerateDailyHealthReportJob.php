<?php

namespace App\Jobs;

use App\Models\HealthReport;
use App\Models\HealthReportOrgan;
use App\Models\OrganScoreHistory;
use App\Services\AiReportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateDailyHealthReportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;      // Retry up to 3 times
    public $backoff = 10;   // Wait 10 seconds between retries

    protected $healthReportId;
    protected $formattedQA;
    protected $prevScores;
    protected $genderOrgan;
    protected $organMap;

    public function __construct($healthReportId, $formattedQA, $prevScores, $genderOrgan, $organMap)
    {
        $this->healthReportId = $healthReportId;
        $this->formattedQA = $formattedQA;
        $this->prevScores = $prevScores;
        $this->genderOrgan = $genderOrgan;
        $this->organMap = $organMap;
    }

    public function handle(AiReportService $aiService)
    {
        $report = HealthReport::find($this->healthReportId);

        if (!$report) {
            Log::error('GenerateDailyHealthReportJob: Report not found', ['id' => $this->healthReportId]);
            return;
        }

        $report->update(['status' => 'processing']);

        $prevScoresJson = json_encode($this->prevScores, JSON_PRETTY_PRINT);

        // ----- Build the exact same prompt you already use in submitDaily -----
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
            15. {$this->genderOrgan}

            ---

            USER DAILY HABIT ANSWERS

            {$this->formattedQA}

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

        // Call AI service
        $result = $aiService->generateDailyHealthReportAI($prompt);

        if (!$result) {
            // Throwing an exception will cause the job to retry (if tries left)
            throw new \Exception('AI report generation failed');
        }

        // Save organ data
        foreach ($result['organs'] as $organData) {
            $organName = $organData['name'];
            $organId = $this->organMap[$organName] ?? null;

            if (!$organId) {
                Log::warning('Job: Organ ID not found for', ['organ' => $organName]);
                continue;
            }

            $score = $organData['score'] ?? 75;

            HealthReportOrgan::create([
                'health_report_id' => $this->healthReportId,
                'organ_id'         => $organId,
                'ai_response'      => $organData,
            ]);

            OrganScoreHistory::create([
                'user_id'    => $report->user_id,
                'organ_id'   => $organId,
                'report_date'=> $report->report_date,
                'score'      => $score,
            ]);
        }

        $report->update(['status' => 'completed']);
        Log::info('GenerateDailyHealthReportJob: Completed', ['report_id' => $this->healthReportId]);
    }

    /**
     * Handle a job failure after all retries.
     */
    public function failed(\Throwable $exception)
    {
        Log::error('GenerateDailyHealthReportJob: Permanently failed', [
            'report_id' => $this->healthReportId,
            'error'     => $exception->getMessage()
        ]);

        $report = HealthReport::find($this->healthReportId);
        if ($report) {
            $report->update(['status' => 'failed']);
        }
    }
}