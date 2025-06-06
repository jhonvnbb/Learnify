<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\QuizAnswer;


class CourseController extends Controller
{
     public function index()
    {
        // $user = auth()->user();
        $user = Auth::user();
        $courses = Course::with('subTopics')->get();

        return Inertia::render('User/Courses', [
            'courses' => $courses,
            'userPackageType' => $user->package_type,
        ]);
    }

public function show($id)
{
    $course = Course::with('subTopics')->findOrFail($id);

    return Inertia::render('User/CourseDetail', [
        'course' => $course,
    ]);
}

// Di dalam controller Laravel kamu
public function quiz($id)
{
    $user = Auth::user();
    $quiz = Quiz::with('questions')->where('course_id', $id)->first();

    if (!$quiz) {
        return response()->json(null);
    }

    $attempt = $quiz->attempts()->where('user_id', $user->id)->with('answers')->first();

    $already_attempted = !!$attempt;
    $user_answers = $attempt ? $attempt->answers->pluck('user_answer', 'question_id') : [];
    $score = $attempt?->score;

    return response()->json([
        'quiz' => $quiz,
        'already_attempted' => $already_attempted,
        'user_answers' => $user_answers,
        'score' => $score,
    ]);
}



public function submit(Request $request, $quizId)
{
    $user = Auth::user();

    // 🚫 Cek apakah user sudah pernah mengerjakan kuis ini
    $existingAttempt = QuizAttempt::where('user_id', $user->id)
        ->where('quiz_id', $quizId)
        ->first();

    if ($existingAttempt) {
        return response()->json([
            'message' => 'Kuis hanya bisa dikerjakan satu kali.',
            'already_attempted' => true,
            'score' => $existingAttempt->score,
            'total' => $existingAttempt->quiz->questions->count(),
        ], 403);
    }

    // ✅ Lanjutkan proses normal...
    $request->validate([
        'answers' => 'required|array',
        'answers.*.question_id' => 'required|exists:questions,id',
        'answers.*.user_answer' => 'required|in:A,B,C,D',
    ]);

    $quiz = Quiz::with('questions')->findOrFail($quizId);

    $attempt = QuizAttempt::create([
        'user_id' => $user->id,
        'quiz_id' => $quiz->id,
    ]);

    $correctCount = 0;

    foreach ($request->answers as $ans) {
        $question = $quiz->questions->firstWhere('id', $ans['question_id']);
        $isCorrect = $question && $question->correct_answer === $ans['user_answer'];

        QuizAnswer::create([
            'quiz_attempt_id' => $attempt->id,
            'question_id' => $ans['question_id'],
            'user_answer' => $ans['user_answer'],
            'is_correct' => $isCorrect,
        ]);

        if ($isCorrect) {
            $correctCount++;
        }
    }

    $attempt->update(['score' => $correctCount]);

    return response()->json([
        'message' => 'Kuis berhasil disubmit!',
        'score' => $correctCount,
        'total' => $quiz->questions->count(),
    ]);
}



}
