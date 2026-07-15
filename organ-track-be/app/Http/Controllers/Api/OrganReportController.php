<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\HealthReport;
use App\Models\HealthReportOrgan;
use App\Models\Organ;
use App\Models\OrganScoreHistory;

class OrganReportController extends Controller
{
    public function show($organId)
    {
        $user = Auth::user();

        // Latest health report
        $healthReport = HealthReport::where('user_id', $user->id)
            ->latest()
            ->first();

        if (!$healthReport) {
            return response()->json(['message' => 'No health report found'], 404);
        }

        // Organ report
        $aiReport = HealthReportOrgan::where('health_report_id', $healthReport->id)
            ->where('organ_id', $organId)
            ->first();

        if (!$aiReport) {
            return response()->json(['message' => 'Organ report not found'], 404);
        }

        // Safe extraction
        $aiData = is_array($aiReport->ai_response)
            ? $aiReport->ai_response
            : json_decode($aiReport->ai_response, true);

        $organData = [
            'organ' => strtolower($aiData['name'] ?? 'unknown'),
            'score' => $aiData['score'] ?? 0,
            'summaryTitle' => 'Summary of ' . ($aiData['name'] ?? 'Organ') . ' Today',
            'summary' => $aiData['summary'] ?? '',
            'positiveHabits' => $aiData['positive_effects'] ?? [],
            'negativeHabits' => $aiData['negative_effects'] ?? [],
            'conditions' => $aiData['identified_conditions'] ?? [],
            'recommendations' => $aiData['recommendations'] ?? [],
        ];

        return response()->json($organData);
    }

    /**
     * Fetch organ report by organ ID and optional report date.
     * Returns empty organ data if no report exists for the date.
     */
    public function showspecific(Request $request, $organId)
    {
        $user = Auth::user();
        $date = $request->query('date');

        // 1. Try to find the health report for the given date
        $healthReportQuery = HealthReport::where('user_id', $user->id);
        if ($date) {
            $healthReportQuery->whereDate('report_date', $date);
        }
        $healthReport = $healthReportQuery->latest()->first();

        // 2. Fetch the organ's real name from the organs table
        $organ = Organ::find($organId);
        $organName = $organ ? $organ->name : 'Unknown';

        // 3. Get the latest score for this organ (from any report)
        $latestScore = OrganScoreHistory::where('user_id', $user->id)
            ->where('organ_id', $organId)
            ->latest('report_date')
            ->value('score') ?? 0; // default 0 if never scored

        // 4. If a health report exists for that date, try to get the specific organ data
        if ($healthReport) {
            $aiReport = HealthReportOrgan::where('health_report_id', $healthReport->id)
                ->where('organ_id', $organId)
                ->first();

            if ($aiReport) {
                // Exact data for the requested date
                $aiData = is_array($aiReport->ai_response)
                    ? $aiReport->ai_response
                    : json_decode($aiReport->ai_response, true);

                return response()->json([
                    'organ' => strtolower($aiData['name'] ?? $organName),
                    'score' => $aiData['score'] ?? $latestScore,
                    'summaryTitle' => 'Summary of ' . ($aiData['name'] ?? $organName) . ' on ' . $healthReport->report_date,
                    'summary' => $aiData['summary'] ?? '',
                    'positiveHabits' => $aiData['positive_effects'] ?? [],
                    'negativeHabits' => $aiData['negative_effects'] ?? [],
                    'conditions' => $aiData['identified_conditions'] ?? [],
                    'recommendations' => $aiData['recommendations'] ?? [],
                    'report_date' => $healthReport->report_date,
                    'is_fallback' => false,
                ]);
            }
            // If organ data is missing in this report, fall through to fallback
        }

        // 5. Fallback: no report for that date, or organ missing
        return response()->json([
            'organ' => strtolower($organName),
            'score' => $latestScore,
            'summaryTitle' => 'Summary of ' . $organName . ' (latest data)',
            'summary' => 'No detailed report available for this date.',
            'positiveHabits' => [],
            'negativeHabits' => [],
            'conditions' => [],
            'recommendations' => [],
            'report_date' => $date ?? now()->format('Y-m-d'),
            'is_fallback' => true,            // frontend can use this flag
        ]);
    }
}