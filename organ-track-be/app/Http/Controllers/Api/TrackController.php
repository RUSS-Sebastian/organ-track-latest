<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Track;
use App\Models\AiReport;

class TrackController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 10);

        $tracks = AiReport::orderBy('answered_date', 'asc') //desc
            ->paginate($perPage);

        return response()->json([
            'data' => $tracks->map(function ($item) {
                return [
                    'id' => $item->id,
                    'report_name' => $item->report_name,
                    'answered_date' => $item->answered_date
                ];
            }),
            'pagination' => [
                'currentPage' => $tracks->currentPage(),
                'perPage' => $tracks->perPage(),
                'totalPages' => $tracks->lastPage(),
                'totalItems' => $tracks->total()
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'report_name' => 'required|string|max:255'
        ]);

        $track = AiReport::find($id);

        if (!$track) {
            return response()->json([
                'message' => 'Track not found'
            ], 404);
        }

        $track->report_name = $request->report_name;
        $track->save();

        return response()->json([
            'message' => 'Report name updated successfully',
            'data' => [
                'id' => $track->id,
                'report_name' => $track->report_name,
                'answered_date' => $track->answered_date
            ]
        ]);
    }

    public function destroy($id)
    {
        $track = AiReport::find($id);

        if (!$track) {
            return response()->json([
                'message' => 'Track not found'
            ], 404);
        }

        $track->delete();

        return response()->json([
            'message' => 'Track deleted successfully'
        ]);
    }
}
