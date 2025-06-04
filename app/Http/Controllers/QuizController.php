<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Course;


class QuizController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Quiz', [
            'quizzes' => Quiz::with('course')->get(),
            'availableCourses' => Course::doesntHave('quiz')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id|unique:quizzes,course_id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Quiz::create($data);

        return redirect()->back()->with('success', 'Quiz berhasil ditambahkan!');
    }

    public function update(Request $request, Quiz $quiz)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $quiz->update($data);

        return redirect()->back()->with('success', 'Quiz berhasil diperbarui!');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()->back()->with('success', 'Quiz berhasil dihapus!');
    }
}