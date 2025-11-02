<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Carbon\Carbon;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $date = now()->toDateString();

        $students = Student::orderBy('class')->orderBy('name')->get();
        $existing = Attendance::whereDate('attendance_date', $date)
            ->pluck('present', 'student_id');

        $groups = $students->groupBy('class')->toArray();

        return Inertia::render('Admin/Attendance/Index', [
            'date' => $date,
            'groups' => $groups,
            'existingRecords' => $existing,
        ]);
    }

public function store()
{
    request()->validate([
        'date' => ['required', 'date'],
        // se quiser obrigar ao menos 1, use 'required|array|min:1'
        // se quiser aceitar vazio, use 'present|array'
        'records' => ['present', 'array'],
        'records.*.student_id' => ['required', 'exists:students,id'],
        'records.*.present' => ['required', 'boolean'],
    ]);

    $date = request('date');
    $rows = collect(request('records', []))->map(fn ($r) => [
        'student_id'      => $r['student_id'],
        'attendance_date' => $date,
        'present'         => (bool) $r['present'],
        'updated_at'      => now(),
        'created_at'      => now(),
    ])->all();

    if (!empty($rows)) {
        \App\Models\Attendance::upsert(
            $rows,
            ['student_id', 'attendance_date'],
            ['present', 'updated_at']
        );
    }

    return back()->with('success', '✅ Chamada salva com sucesso!');
}


    // ✅ Aqui começa o histórico real
    public function history()
    {
        $history = Attendance::selectRaw('attendance_date, COUNT(*) as total')
            ->groupBy('attendance_date')
            ->orderBy('attendance_date', 'desc')
            ->get()
            ->map(function ($h) {
                $h->formatted = Carbon::parse($h->attendance_date)
                    ->translatedFormat('d/m/Y');
                return $h;
            });

        return Inertia::render('Admin/Attendance/History', [
            'history' => $history,
        ]);
    }

    // ✅ Ver uma chamada antiga!
    public function show($date)
    {
        return redirect()->route('attendances.index', ['date' => $date]);
    }
}
