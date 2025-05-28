<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'total_users' => User::where('role', 0)->count(),
            'total_admins' => User::where('role', 1)->count(),
            'total_basic' => User::where('package_type', 'basic')->count(),
            'total_premium' => User::where('package_type', 'premium')->count(),

            // Aktivitas terbaru (email_verified_at)
            'recent_verified' => User::whereNotNull('email_verified_at')
                ->orderByDesc('email_verified_at')
                ->take(5)
                ->get(['name', 'email', 'email_verified_at']),
        ]);
    }

    public function users()
    {
        $users = User::where('role', 0)->get();
        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function courses()
    {
        return Inertia::render('Admin/Courses');
    }

}
