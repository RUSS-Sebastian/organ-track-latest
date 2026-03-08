<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Organ;
use App\Models\OrganScoreHistory;
use App\Models\HealthReport;
use Illuminate\Support\Facades\Log;

class OrganScoreController extends Controller
{
    public function getLatestOrganScores()
{
    $userId = Auth::id();

    $latestScores = OrganScoreHistory::where('user_id', $userId)
        ->orderBy('report_date', 'desc')
        ->get()
        ->unique('organ_id')
        ->keyBy('organ_id');

    $organs = Organ::all();

    $result = [];

    foreach ($organs as $organ) {

        if ($organ->name === 'Prostate' && auth()->user()->gender !== 'male') continue;
        if ($organ->name === 'Uterus' && auth()->user()->gender !== 'female') continue;

        $score = $latestScores[$organ->id]->score ?? 75;

        $result[$organ->name] = $score;
    }

    return response()->json([
        'scores' => $result
    ]);
}

public function getLatestOrganStatus()
{
    $userId = Auth::id();
    // 1️⃣ Get latest report with organs
    $latestReport = HealthReport::with('organs', 'user')
        ->where('user_id', $userId)
        ->orderByDesc('report_date')
        ->first();

    if (!$latestReport) {
        return response()->json([
            'message' => 'No reports found'
        ], 404);
    }

    $organHealth = [
        "brain" => null,
        "lungs" => null,
        "stomach" => null,
        "kidney" => null,
        "heart" => null,
        "liver" => null,
        "muscles" => null,
        "intestine" => null,
        "gallBladder" => null,
        "pancreas" => null,
        "skin" => null,
        "bladder" => null,
        "bloodVessels" => null,
        "bone" => null,
        "maleOrgan" => null,
        "femaleOrgan" => null,
    ];

    $debugOrgans = []; // Collect debug info

    foreach ($latestReport->organs as $organ) {
        if (!$organ->ai_response) continue;

        $aiData = is_string($organ->ai_response) ? json_decode($organ->ai_response, true) : (array) $organ->ai_response;

        if (!$aiData || !isset($aiData['score'], $aiData['name'])) continue;

        $name = lcfirst(str_replace(' ', '', $aiData['name']));
        $score = $aiData['score'];

        // Status calculation
        if ($score >= 75) {
            $status = "Good";
        } elseif ($score >= 60) {
            $status = "Moderate";
        } else {
            $status = "Needs Attention";
        }

        $organHealth[$name] = ["status" => $status];

        // Add to debug log
        $debugOrgans[] = [
            'name' => $aiData['name'],
            'score' => $score,
            'status' => $status
        ];
    }

    // 2️⃣ Log the latest organs with scores for debugging
    Log::info("Latest organ scores for user {$userId}:", $debugOrgans);

    return response()->json([
        "userId" => $userId,
        "gender" => $latestReport->user->gender ?? null,
        "organHealth" => $organHealth
    ]);
}
    //
}
