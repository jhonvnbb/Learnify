<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['title', 'description', 'access_type'];

    public function subTopics()
    {
        return $this->hasMany(SubTopic::class);
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }

}
