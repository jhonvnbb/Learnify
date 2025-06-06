<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'score',
    ];

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke kuis
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    // Relasi ke jawaban-jawaban
    public function answers()
    {
        return $this->hasMany(QuizAnswer::class);
    }
}
