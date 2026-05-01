<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\OrganController;
use App\Http\Controllers\Api\TrackController;
use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\OrganScoreController;
use App\Http\Controllers\Api\OrganReportController;
use App\Http\Controllers\Api\OrganChartController;
use App\Http\Controllers\Api\HealthAnalysisController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me/organs', [MeController::class, 'organs']);
    Route::get('/me', [MeController::class, 'me']);
    Route::put('/user/language', [MeController::class, 'updateLanguage']);

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/profile/image', [AuthController::class, 'updateImage']);

    Route::get('/organs', [OrganController::class, 'index']);
    Route::get('/organs/{id}', [OrganController::class, 'showOrganQuestions']);
    Route::get('/daily-questions', [OrganController::class, 'showDailyQuestions']);

    Route::get('/tracks', [TrackController::class, 'index']);
    Route::put('/tracks/{id}', [TrackController::class, 'update']);
    Route::delete('/tracks/{id}', [TrackController::class, 'destroy']);

    Route::post('/submit-and-generate-report', [AnswerController::class, 'submitAndGenerateReport']);
    Route::get('/daily-check', [AnswerController::class, 'check']);
    Route::get('/ai-report/{report}', [AnswerController::class, 'getReportById']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/submit-daily', [AnswerController::class, 'submitDaily']);
    Route::get('/latest-organ-status', [OrganScoreController::class, 'getLatestOrganStatus']);
    Route::get('/organ-report/{organId}',[OrganReportController::class, 'show']);
    Route::get('/organ-report-specific/{organId}',[OrganReportController::class, 'showspecific']);
    Route::get('/organ-chart/{organId}', [OrganChartController::class, 'getOrganChart']);
    Route::post('/health-report/generate', [HealthAnalysisController::class, 'generatePrompt']);

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
