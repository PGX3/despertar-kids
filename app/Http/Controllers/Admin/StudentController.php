<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    // Lista todos os alunos
    public function index()
    {
        $students = Student::all();
        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
        ]);
    }

    // Mostra formulário de criação
    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    // Salva um novo aluno
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class' => 'nullable|string', // turma
            'age' => 'nullable|integer',
            'guardian_name' => 'nullable|string|max:255', // nome do responsável
            'guardian_contact' => 'nullable|string|max:255',
        ]);

        Student::create($data);

        return redirect()
            ->route('students.index')
            ->with('success', 'Aluno cadastrado com sucesso!');
    }

    // Mostra um aluno
    public function show(Student $student)
    {
        return Inertia::render('Admin/Students/Show', [
            'student' => $student,
        ]);
    }

    // Mostra formulário de edição
    public function edit(Student $student)
    {
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student,
        ]);
    }

    // Atualiza aluno
    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class' => 'nullable|string',
            'age' => 'nullable|integer',
            'guardian_name' => 'nullable|string|max:255',
            'guardian_contact' => 'nullable|string|max:255',
        ]);

        $student->update($data);

        return redirect()
            ->route('students.index')
            ->with('success', 'Aluno atualizado com sucesso!');
    }

    // Exclui aluno
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()
            ->route('students.index')
            ->with('success', 'Aluno excluído com sucesso!');
    }
}
