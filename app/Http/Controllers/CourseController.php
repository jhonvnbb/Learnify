<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
     public function index()
    {
        // Dummy data topik pembelajaran
        $courses = [
            ['title' => 'Pengenalan Pemrograman', 'description' => 'Dasar-dasar algoritma dan logika pemrograman'],
            ['title' => 'HTML & CSS', 'description' => 'Dasar membuat tampilan web yang menarik'],
            ['title' => 'JavaScript Dasar', 'description' => 'Interaktivitas web dengan JS'],
            ['title' => 'Database MySQL', 'description' => 'Mengelola data dengan SQL'],
            ['title' => 'PHP Dasar', 'description' => 'Belajar backend menggunakan PHP'],
            ['title' => 'Laravel Beginner', 'description' => 'Framework PHP modern dan praktis'],
            ['title' => 'ReactJS Dasar', 'description' => 'Membuat UI dinamis dengan React'],
            ['title' => 'Git & Github', 'description' => 'Versi kontrol dan kolaborasi kode'],
            ['title' => 'UX/UI Design', 'description' => 'Dasar desain antarmuka pengguna'],
            ['title' => 'Membangun API RESTful', 'description' => 'Backend yang bisa digunakan semua platform'],
        ];

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
        ]);
    }
}
