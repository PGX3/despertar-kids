<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Busca todos os alunos
        $students = Student::all();

        // Busca todos os professores
        $teachers = Teacher::all();

        return Inertia::render('Admin/Dashboard', [
            'students' => $students,
            'teachers' => $teachers
        ]);
    }
}

