<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthReport extends Model
{
    
    protected $fillable = ['user_id', 'report_date', 'status', 'job_params'];

    public function organs()
    {
        return $this->hasMany(HealthReportOrgan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
