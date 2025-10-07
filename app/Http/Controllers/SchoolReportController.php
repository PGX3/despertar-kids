<?php

namespace App\Http\Controllers;

use App\Models\SchoolReport;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SchoolReportController extends Controller
{
    public function index()
    {
        return Inertia::render('SchoolReports/Index', [
            'schoolReports' => SchoolReport::with('student')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('SchoolReports/Create');
    }

    public function store(Request $request)
    {
        SchoolReport::create($request->validate([
            'student_id' => 'required|exists:students,id',
            'file_path' => 'required|string',
            'description' => 'nullable|string'
        ]));

        return redirect()->route('school-reports.index');
    }
}
