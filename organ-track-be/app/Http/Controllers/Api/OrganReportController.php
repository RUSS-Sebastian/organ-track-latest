<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\HealthReport;
use App\Models\HealthReportOrgan;

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
        $date = $request->query('date'); // expected format: YYYY-MM-DD

        // Try to get health report
        $healthReportQuery = HealthReport::where('user_id', $user->id);

        if ($date) {
            $healthReportQuery->whereDate('report_date', $date);
        }

        $healthReport = $healthReportQuery->latest()->first();

        // Default empty organ data
        $emptyData = [
            'organ' => 'unknown',
            'score' => 0,
            'summaryTitle' => 'Summary of Organ',
            'summary' => '',
            'positiveHabits' => [],
            'negativeHabits' => [],
            'conditions' => [],
            'recommendations' => [],
            'report_date' => $date ?? null,
        ];

        if (!$healthReport) {
            // Return empty organ structure for missing date
            return response()->json($emptyData);
        }

        // Fetch organ data
        $aiReport = HealthReportOrgan::where('health_report_id', $healthReport->id)
            ->where('organ_id', $organId)
            ->first();

        if (!$aiReport) {
            // If health report exists but organ missing, return empty organ structure
            $emptyData['report_date'] = $healthReport->report_date;
            return response()->json($emptyData);
        }

        $aiData = is_array($aiReport->ai_response)
            ? $aiReport->ai_response
            : json_decode($aiReport->ai_response, true);

        $organData = [
            'organ' => strtolower($aiData['name'] ?? 'unknown'),
            'score' => $aiData['score'] ?? 0,
            'summaryTitle' => 'Summary of ' . ($aiData['name'] ?? 'Organ') . ' on ' . $healthReport->report_date,
            'summary' => $aiData['summary'] ?? '',
            'positiveHabits' => $aiData['positive_effects'] ?? [],
            'negativeHabits' => $aiData['negative_effects'] ?? [],
            'conditions' => $aiData['identified_conditions'] ?? [],
            'recommendations' => $aiData['recommendations'] ?? [],
            'report_date' => $healthReport->report_date
        ];

        return response()->json($organData);
    }
}