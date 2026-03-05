<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organ extends Model
{
    protected $fillable = ['name', 'gender'];

    public function questions()
{
    return $this->hasMany(Question::class, 'organ_id');
}
}
