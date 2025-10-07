<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::all();
        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Teachers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'class'  => 'nullable|string|max:255',       // turma
            'role'   => 'nullable|string|max:255',       // Professor / Auxiliar
            'contact'=> 'nullable|string|max:255',       // contato
        ]);

        Teacher::create([
            'name'   => $request->name,
            'class'  => $request->class,
            'role'   => $request->role,
            'contact'=> $request->contact,
        ]);

        return redirect()->route('teachers.index')
                         ->with('success','Professor cadastrado com sucesso!');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return redirect()->route('teachers.index')
                         ->with('success','Professor excluído com sucesso!');
    }
}
