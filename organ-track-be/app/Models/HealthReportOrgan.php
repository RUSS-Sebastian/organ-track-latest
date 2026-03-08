<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthReportOrgan extends Model
{
    protected $fillable = [
        'health_report_id',
        'organ_id',
        'ai_response'
    ];

    protected $casts = [
        'ai_response' => 'array'
    ];

    public function report()
    {
        return $this->belongsTo(HealthReport::class);
    }

    public function organ()
    {
        return $this->belongsTo(Organ::class);
    }
}