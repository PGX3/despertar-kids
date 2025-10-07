<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $date = now()->toDateString();

        // Buscar alunos já agrupados pelas turmas fixas
        $students = Student::query()
            ->whereIn('class', Student::GROUPS)
            ->orderBy('class')
            ->orderBy('name')
            ->get(['id','name','class']);

        // Presenças já registradas hoje
        $existing = Attendance::query()
            ->whereDate('attendance_date', $date)
            ->pluck('present', 'student_id');

        // Agrupa por turma
        $groups = collect(Student::GROUPS)->mapWithKeys(function ($g) use ($students) {
            return [$g => $students->where('class', $g)->values()];
        });

        return Inertia::render('Admin/Attendance/Index', [
            'date' => $date,
            'groups' => $groups,
            'existingRecords' => $existing,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'date' => ['required','date'],
            'records' => ['required','array'],
            'records.*.student_id' => ['required','exists:students,id'],
            'records.*.present' => ['required','boolean'],
        ]);

        $rows = collect($data['records'])->map(fn($r) => [
            'student_id'      => $r['student_id'],
            'attendance_date' => $data['date'],
            'present'         => $r['present'],
            'updated_at'      => now(),
            'created_at'      => now(),
        ])->all();

        // Atualiza ou cria (sem duplicar)
        Attendance::upsert(
            $rows,
            ['student_id','attendance_date'],
            ['present','updated_at']
        );

        return back()->with('success', 'Chamada salva com sucesso!');
    }
}
