<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubTopic;
use App\Models\Course;

class SubTopicController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'pdf' => 'nullable|file|mimes:pdf|max:10240',
            'video' => 'nullable|file|mimes:mp4,mov,avi,wmv|max:51200',
        ]);

        $pdfPath = $request->hasFile('pdf') ? $request->file('pdf')->store('pdfs', 'public') : null;
        $videoPath = $request->hasFile('video') ? $request->file('video')->store('videos', 'public') : null;

        SubTopic::create([
            'course_id' => $validated['course_id'],
            'title' => $validated['title'],
            'content' => $validated['content'],
            'pdf_path' => $pdfPath,
            'video_path' => $videoPath,
        ]);

        return redirect()->back()->with('success', 'Subtopic berhasil ditambahkan.');
    }

    public function update(Request $request, SubTopic $subtopic)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'pdf' => 'nullable|file|mimes:pdf|max:10240',
            'video' => 'nullable|file|mimes:mp4,mov,avi,wmv|max:51200',
        ]);

        if ($request->hasFile('pdf')) {
            $validated['pdf_path'] = $request->file('pdf')->store('pdfs', 'public');
        }

        if ($request->hasFile('video')) {
            $validated['video_path'] = $request->file('video')->store('videos', 'public');
        }

        $subtopic->update($validated);

        return redirect()->back()->with('success', 'Subtopic berhasil diperbarui.');
    }

    public function destroy(SubTopic $subtopic)
    {
        $subtopic->delete();

        return redirect()->back()->with('success', 'Subtopic berhasil dihapus.');
    }

}

