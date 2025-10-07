<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index()
    {
        return Inertia::render('Lessons/Index', [
            'lessons' => Lesson::with('user')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Lessons/Create');
    }

    public function store(Request $request)
    {
        Lesson::create($request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'file_path' => 'nullable|string',
            'created_by' => 'required|exists:users,id'
        ]));

        return redirect()->route('lessons.index');
    }
}
