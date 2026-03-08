<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\OrganController;
use App\Http\Controllers\Api\TrackController;
use App\Http\Controllers\Api\AnswerController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user/organs', [MeController::class, 'organs']);
    Route::get('/user', [MeController::class, 'me']);

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/profile/image', [AuthController::class, 'updateImage']);

    Route::get('/organs', [OrganController::class, 'index']);
    Route::get('/organs/{id}', [OrganController::class, 'showOrganQuestions']);

    Route::get('/tracks', [TrackController::class, 'index']);
    Route::put('/tracks/{id}', [TrackController::class, 'update']);
    Route::delete('/tracks/{id}', [TrackController::class, 'destroy']);

    Route::post('/submit-and-generate-report', [AnswerController::class, 'submitAndGenerateReport']);

    Route::get('/ai-report/{report}', [AnswerController::class, 'getReportById']);
    Route::post('/logout', [AuthController::class, 'logout']);
});



Route::get('/test', function() {
    return response()->json(['message' => 'API is working!']);
});

Route::post('/test-register', function(\Illuminate\Http\Request $request) {
    return response()->json([
        'message' => 'Test POST received',
        'data_received' => $request->all(),
        'has_file' => $request->hasFile('image'),
        'file_info' => $request->file('image') ? [
            'name' => $request->file('image')->getClientOriginalName(),
            'size' => $request->file('image')->getSize(),
            'mime' => $request->file('image')->getMimeType(),
        ] : null
    ]);
});
