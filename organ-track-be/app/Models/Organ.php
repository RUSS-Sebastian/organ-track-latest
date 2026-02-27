<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organ extends Model
{
    protected $fillable = ['name', 'gender'];

    // If you want to specify the table name (optional, Laravel will use 'organs' by default)
    protected $table = 'organs';

    // Timestamps are enabled by default, but you can specify if needed
    public $timestamps = true;

    /**
     * Get the questions for the organ.
     */
    public function questions()
    {
        return $this->hasMany(Question::class, 'organ_id', 'id');
    }
}