<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Listar todos os eventos do calendário
     */
    public function index()
    {
        $schedules = Schedule::with('teachers')
            ->orderBy('schedule_date', 'asc')
            ->get();

        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => $schedules,
        ]);
    }

    /**
     * Formulário de criação
     */
    public function create(Request $request)
    {
        $date = $request->get('date'); // pega a data que veio da URL
        $teachers = Teacher::all(['id', 'name']); // lista de professores

        return Inertia::render('Admin/Schedules/Create', [
            'date' => $date,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Salvar novo evento
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'schedule_date' => 'required|date',
            'type'          => 'required|string|in:onibus,reforco,atividade,palavra',
            'activity'      => 'nullable|string|max:255',
            'teacher_ids'   => 'array',
            'teacher_ids.*' => 'exists:teachers,id',
        ]);

        // cria o evento
        $schedule = Schedule::create([
            'schedule_date' => $data['schedule_date'],
            'type'          => $data['type'],
            'activity'      => $data['activity'] ?? null,
        ]);

        // vincula professores
        if (!empty($data['teacher_ids'])) {
            $schedule->teachers()->sync($data['teacher_ids']);
        }

        return redirect()->route('schedules.index')
            ->with('success', 'Evento adicionado ao calendário com sucesso!');
    }

    /**
     * Formulário de edição
     */
    public function edit(Schedule $schedule)
    {
        $teachers = Teacher::all(['id', 'name']);

        return Inertia::render('Admin/Schedules/Edit', [
            'schedule' => $schedule->load('teachers'),
            'teachers' => $teachers,
        ]);
    }

    /**
     * Atualizar evento
     */
    public function update(Request $request, Schedule $schedule)
    {
        $data = $request->validate([
            'schedule_date' => 'required|date',
            'type'          => 'required|string|in:onibus,reforco,atividade,palavra',
            'activity'      => 'nullable|string|max:255',
            'teacher_ids'   => 'array',
            'teacher_ids.*' => 'exists:teachers,id',
        ]);

        $schedule->update([
            'schedule_date' => $data['schedule_date'],
            'type'          => $data['type'],
            'activity'      => $data['activity'] ?? null,
        ]);

        $schedule->teachers()->sync($data['teacher_ids'] ?? []);

        return redirect()->route('schedules.index')
            ->with('success', 'Evento atualizado com sucesso!');
    }

    /**
     * Excluir evento
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return redirect()->route('schedules.index')
            ->with('success', 'Evento removido do calendário com sucesso!');
    }
}
