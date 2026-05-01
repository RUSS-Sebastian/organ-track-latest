<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organ;
use App\Models\Track;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MeController extends Controller
{
    /**
     * GET /api/me
     * Returns current user info (id, name, email, gender)
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id'                  => $user->id,
            'name'                => $user->name,
            'email'               => $user->email,
            'gender'              => $user->gender,
            'language_preference' => $user->language_preference,
        ]);
    }

    public function updateLanguage(Request $request)
    {
        $user = $request->user(); // authenticated user

        $validated = $request->validate([
            'language_preference' => 'required|in:Eng,Bur',
        ]);

        $user->language_preference = $validated['language_preference'];
        $user->save();

        return response()->json([
            'message' => 'Language preference updated successfully.',
            'language_preference' => $user->language_preference,
        ]);
    }

    /**
     * GET /api/me/organs
     * Returns organ health statuses for grid + condition summary.
     * Organs are fetched dynamically from the database.
     */
    public function organs(Request $request)
    {
        $user = $request->user();
        $gender = $user->gender;

        // Get user's most recent track per organ
        $tracksByOrgan = Track::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->get()
            ->unique('organ')
            ->keyBy(function ($track) {
                return strtolower($track->organ);
            });

        $getStatus = function ($organName) use ($tracksByOrgan) {
            $organKey = strtolower($organName);
            $track = $tracksByOrgan->get($organKey);
            if (!$track) {
                return ['status' => 'Needs Attention'];
            }
            $daysAgo = Carbon::parse($track->date)->diffInDays(Carbon::now());
            if ($daysAgo <= 7) {
                return ['status' => 'Good'];
            }
            if ($daysAgo <= 30) {
                return ['status' => 'Moderate'];
            }
            return ['status' => 'Needs Attention'];
        };

        // Build organHealth dynamically from database
        $organHealth = [];

        // Common organs (Heart, Brain, Lungs, etc.)
        $commonOrgans = Organ::where('gender', 'common')->pluck('name');
        foreach ($commonOrgans as $organName) {
            $organHealth[strtolower($organName)] = $getStatus($organName);
        }

        // Gender-specific organ
        $genderOrgan = Organ::where('gender', $gender)->first();
        $organHealth['femaleOrgan'] = $gender === 'female' && $genderOrgan
            ? $getStatus($genderOrgan->name)
            : null;
        $organHealth['maleOrgan'] = $gender === 'male' && $genderOrgan
            ? $getStatus($genderOrgan->name)
            : null;

        return response()->json([
            'organHealth' => $organHealth,
        ]);
    }
}
