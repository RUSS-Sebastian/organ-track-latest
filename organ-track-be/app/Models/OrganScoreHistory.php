<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrganScoreHistory extends Model
{
    protected $fillable = [
        'user_id',
        'organ_id',
        'report_date',
        'score'
    ];

    public function organ()
    {
        return $this->belongsTo(Organ::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
