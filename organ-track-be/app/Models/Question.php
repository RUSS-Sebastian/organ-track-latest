<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_type',
        'organ_id',
        'question_text_en',
        'question_text_mm',
        'question_type',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relationship with Organ
    public function organ()
    {
        return $this->belongsTo(Organ::class);
    }

    public function options()
{
    return $this->hasMany(QuestionOption::class);
}
}