<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;

class AdminCourseController extends Controller {
    public function index() {
        $courses = Course::with('subTopics')->latest()->get();
        return Inertia::render('Admin/Courses', ['courses' => $courses]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'access_type' => 'required|in:basic,premium',
        ]);

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course berhasil ditambahkan.');
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'access_type' => 'required|in:basic,premium',
        ]);

        $course->update($validated);

        return redirect()->back()->with('success', 'Course berhasil diperbarui.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->back()->with('success', 'Course berhasil dihapus.');
    }
}
