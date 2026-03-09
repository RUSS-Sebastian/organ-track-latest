<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthRangeReport extends Model
{
    protected $table = 'health_range_reports';

    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'overall_score',
        'ai_report',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'ai_report' => 'array', // automatically cast JSON to array
    ];

    /**
     * The user who owns this report.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Optional: you can relate to HealthReportOrgans if needed later.
     */
    // public function organs()
    // {
    //     return $this->hasMany(HealthReportOrgan::class, 'health_report_id', 'id');
    // }
}