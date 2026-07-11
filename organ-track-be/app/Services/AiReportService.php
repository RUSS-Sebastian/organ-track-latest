<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiReportService
{
    public function generateDailyHealthReportAI(string $prompt): ?array
    {
        
        try {
            Log::info('Health Report AI: Request started');

            $apiKey = env('OPENROUTER_API_KEY');

            if (!$apiKey) {
                Log::error('Health Report AI: Missing OPENROUTER_API_KEY');
                return null;
            }

            $response = Http::timeout(240)
                ->connectTimeout(30)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . $apiKey,
                    'Content-Type'  => 'application/json',
                ])
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model'             => 'tencent/hy3:free',
                    'messages'          => [
                        [
                            'role'    => 'user',
                            'content' => $prompt
                        ]
                    ]
                ]);

            if ($response->failed()) {
                Log::error('Health Report AI: API request failed', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                return null;
            }

            $data = $response->json();

            if (!isset($data['choices'][0]['message']['content'])) {
                Log::error('Health Report AI: Missing AI content', ['response' => $data]);
                return null;
            }

            $raw = $data['choices'][0]['message']['content'];

            // Clean up markdown
            $raw = preg_replace('/```json|```/', '', $raw);
            $raw = trim($raw);
            $raw = preg_replace('/[\x00-\x1F\x7F]/u', '', $raw);

            // Check for truncation
            if (!str_ends_with(trim($raw), '}')) {
                Log::error('Health Report AI: Response truncated');
                return null;
            }

            $decoded = json_decode($raw, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Health Report AI: Invalid JSON', [
                    'json_error' => json_last_error_msg(),
                    'raw'        => $raw
                ]);
                return null;
            }

            if (!isset($decoded['organs'])) {
                Log::error('Health Report AI: Missing organs key');
                return null;
            }

            Log::info('Health Report AI: Successfully parsed', [
                'organ_count' => count($decoded['organs'])
            ]);

            return $decoded;

        } catch (\Exception $e) {
            Log::error('Health Report AI: Exception occurred', [
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }
}