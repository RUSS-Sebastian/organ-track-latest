<?php

    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Models\Track;

    class TrackController extends Controller
    {
        public function index(Request $request, $user_id)
        {
            $page = $request->query('page', 1);
            $limit = $request->query('limit', 10);

            $tracks = Track::where('user_id', $user_id)
                        ->paginate($limit, ['*'], 'page', $page);

            return response()->json([
                'data' => $tracks->items(),
                'pagination' => [
                    'page' => $tracks->currentPage(),
                    'total_pages' => $tracks->lastPage(),
                ]
            ]);
        }


        public function update(Request $request, $id)
        {
            $track = Track::find($id);

            if (!$track) {
                return response()->json([
                    'message' => 'Track not found'
                ], 404);
            }

            /*if ($track->user_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            } */

            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $track->update($request->only('name'));

            return response()->json([
                'message' => 'Track renamed successfully',
                'data' => $track
            ]);
        }

        public function destroy(Request $request, $id)
        {
            $track = Track::find($id);

            if (!$track) {
                return response()->json([
                    'message' => 'Track not found'
                ], 404);
            }

            
            /*if ($track->user_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }*/

            $track->delete();

            return response()->json([
                'message' => 'Track deleted successfully'
            ]);
        }


    }
