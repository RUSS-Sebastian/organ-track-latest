<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrganScoreHistory;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class OrganChartController extends Controller
{
    /**
     * Get organ scores for chart
     * @param organId - organ id
     * @param range - 'week', 'month', 'year'
     */
    public function getOrganChart(Request $request, $organId)
    {
        $userId = Auth::id();
        $range = $request->query('range', 'week'); // default week
        $today = date('Y-m-d');

        // Determine start and end dates based on range
        if ($range === 'week') {
            $start = date('Y-m-d', strtotime('monday this week', strtotime($today)));
            $end   = date('Y-m-d', strtotime('sunday this week', strtotime($today)));
            $prevStart = date('Y-m-d', strtotime('-1 week monday', strtotime($today)));
            $prevEnd   = date('Y-m-d', strtotime('-1 week sunday', strtotime($today)));
        } elseif ($range === 'month') {
            $start = date('Y-m-01', strtotime($today));
            $end   = date('Y-m-t', strtotime($today));
            $prevStart = date('Y-m-01', strtotime('-1 month', strtotime($today)));
            $prevEnd   = date('Y-m-t', strtotime('-1 month', strtotime($today)));
        } elseif ($range === 'year') {
            $start = date('Y-01-01', strtotime($today));
            $end   = date('Y-12-31', strtotime($today));
            $prevStart = date('Y-01-01', strtotime('-1 year', strtotime($today)));
            $prevEnd   = date('Y-12-31', strtotime('-1 year', strtotime($today)));
        } else {
            return response()->json(['error' => 'Invalid range'], 400);
        }

        // Fetch current period scores
        $currentScores = OrganScoreHistory::where('user_id', $userId)
            ->where('organ_id', $organId)
            ->whereBetween('report_date', [$start, $end])
            ->orderBy('report_date')
            ->pluck('score', 'report_date')
            ->toArray();

        // Fetch previous period scores
        $previousScores = OrganScoreHistory::where('user_id', $userId)
            ->where('organ_id', $organId)
            ->whereBetween('report_date', [$prevStart, $prevEnd])
            ->orderBy('report_date')
            ->pluck('score', 'report_date')
            ->toArray();

        // Response structure
        return response()->json([
            'organId' => $organId,
            'range' => $range,
            'current' => $currentScores,   // e.g., ['2026-03-08' => 70, '2026-03-09' => 75]
            'previous' => $previousScores, // e.g., ['2026-03-01' => 65, ...]
        ]);
    }
}