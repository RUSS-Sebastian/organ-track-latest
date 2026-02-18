<?php

namespace App\Http\Controllers\Api;

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
}
