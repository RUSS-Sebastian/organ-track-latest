<?php

namespace App\Http\Controllers\Api;
use App\Models\Question;
use App\Http\Controllers\Controller;
use App\Models\Organ;
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
        ->where('is_active', true)
        ->select([
            'id',
            'organ_id',
            'question_text_en',
            'question_text_mm',
            'question_type'
        ])
        ->with(['options' => function ($q) {
            $q->select([
                'id',
                'question_id',
                'option_text_en',
                'option_text_mm'
            ]);
        }])
        ->get();

    return response()->json([
        'organ_id' => $organ->id,
        'organ_name' => $organ->name,
        'questions' => $questions
    ]);
}
}
