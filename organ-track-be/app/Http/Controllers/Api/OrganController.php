<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organ;
use App\Models\Question;
use Illuminate\Http\Request;

class OrganController extends Controller
{
    public function index(Request $request)
    {
        $gender = $request->query('gender');

        $common = Organ::where('gender', 'common')->pluck('name');

        $genderSpecific = [];

        if ($gender) {
            $genderSpecific = Organ::where('gender', $gender)->pluck('name');
        }

        return response()->json([
            'common' => $common,
            'gender_specific' => $genderSpecific
        ]);
    }

    public function showOrganQuestions($id)
    {
        $organ = Organ::find($id);

        if (!$organ) {
            return response()->json([
                'message' => 'Organ not found'
            ], 404);
        }

        $questions = Question::where('organ_id', $id)
            ->with('options')
            ->where('is_active', true)
            ->get();

        return response()->json([
            'organ_id' => $organ->id,
            'organ_name' => $organ->name,
            'questions' => $questions
        ]);
    }
}
