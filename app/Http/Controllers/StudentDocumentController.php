<?php

namespace App\Http\Controllers;

use App\Models\StudentDocument;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentDocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('StudentDocuments/Index', [
            'documents' => StudentDocument::with('student')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('StudentDocuments/Create');
    }

    public function store(Request $request)
    {
        StudentDocument::create($request->validate([
            'student_id' => 'required|exists:students,id',
            'file_path' => 'required|string',
            'description' => 'nullable|string'
        ]));

        return redirect()->route('student-documents.index');
    }
}
