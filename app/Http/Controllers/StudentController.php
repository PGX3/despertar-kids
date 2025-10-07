<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Students/Index', [
            'students' => Student::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Students/Create');
    }

    public function store(Request $request)
    {
        Student::create($request->validate([
            'name' => 'required|string',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'guardian_name' => 'nullable|string',
            'guardian_contact' => 'nullable|string',
            'notes' => 'nullable|string'
        ]));

        return redirect()->route('students.index');
    }
}
