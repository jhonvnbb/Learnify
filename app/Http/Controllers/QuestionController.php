<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Quiz;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Quiz $quiz)
    {
        $quiz->load('questions');

        return Inertia::render('Admin/QuizQuestions', [
            'quiz' => $quiz,
        ]);
    }

    public function store(Request $request, $quizId)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'options' => 'required|array|size:4',
            'correct_answer' => 'required|in:A,B,C,D',
        ]);

        Question::create([
            'quiz_id' => $quizId,
            'question_text' => $validated['question_text'],
            'options' => json_encode($validated['options']),
            'correct_answer' => $validated['correct_answer'],
        ]);

        return redirect()->back()->with('success', 'Soal berhasil ditambahkan!');
    }

    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'options' => 'required|array|size:4',
            'options.*' => 'required|string',
            'correct_answer' => 'required|in:A,B,C,D',
        ]);

        $question->update([
            'question_text' => $validated['question_text'],
            'options' => json_encode($validated['options']),
            'correct_answer' => $validated['correct_answer'],
        ]);

        return redirect()->back()->with('success', 'Soal berhasil diperbarui!');
    }

    public function destroy(Question $question)
    {
        $question->delete();

        return redirect()->back()->with('success', 'Soal berhasil dihapus!');
    }
}
