<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiReport extends Model
{
    protected $fillable = [
        'user_id',
        'answered_date',
        'ai_response',
        'report_name'
    ];
    protected $casts = [
    'ai_response' => 'array', // auto-convert JSON to array
    ];
}
