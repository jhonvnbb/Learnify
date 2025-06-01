<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Course;


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

}
