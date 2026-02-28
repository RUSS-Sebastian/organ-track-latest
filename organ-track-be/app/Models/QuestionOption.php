<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'option_text_en',
        'option_text_mm',
        'score',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    
}