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


    // ✅ MODIFY THIS FUNCTION
    public function report()
    {
        // explicitly specify the foreign key column
        return $this->belongsTo(HealthReport::class, 'health_report_id');
    }


    public function organ()
    {
        return $this->belongsTo(Organ::class);
    }
}