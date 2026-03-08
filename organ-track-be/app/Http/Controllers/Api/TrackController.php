<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Track;
use App\Models\AiReport;
use Illuminate\Support\Facades\Auth;

class TrackController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id(); // current user
        $perPage = $request->query('perPage', 10);

        $tracks = AiReport::where('user_id', $userId)
            ->orderBy('answered_date', 'asc')
            ->paginate($perPage);
            
        $data = $tracks->getCollection()->map(function ($item) {
            return [
                'id' => $item->id,
                'report_name' => $item->report_name,
                'answered_date' => $item->answered_date,
            ];
        });

        return response()->json([
            'data' => $data,
            'pagination' => [
                'currentPage' => $tracks->currentPage(),
                'perPage' => $tracks->perPage(),
                'totalPages' => $tracks->lastPage(),
                'totalItems' => $tracks->total()
            ]
        ]);
    }

    /**
     * Rename a track (report_name)
     */
    public function update(Request $request, $id)
    {
        $userId = Auth::id();

        $track = AiReport::where('id', $id)->where('user_id', $userId)->first();

        if (!$track) {
            return response()->json(['message' => 'Track not found'], 404);
        }

        $request->validate([
            'report_name' => 'required|string|max:255',
        ]);

        $track->report_name = $request->report_name;
        $track->save();

        return response()->json(['message' => 'Track renamed successfully']);
    }

    /**
     * Delete a track
     */
    public function destroy($id)
    {
        $userId = Auth::id();

        $track = AiReport::where('id', $id)->where('user_id', $userId)->first();

        if (!$track) {
            return response()->json(['message' => 'Track not found'], 404);
        }

        $track->delete();

        return response()->json(['message' => 'Track deleted successfully']);
    }
}