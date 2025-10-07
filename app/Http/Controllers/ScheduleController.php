<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Listar todos os eventos do calendário
     */
    public function index()
    {
        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => Schedule::with('user')
                ->orderBy('schedule_date')
                ->get()
        ]);
    }

    /**
     * Formulário de criação (pode receber data do calendário)
     */
    public function create(Request $request)
    {
        $date = $request->get('date');

        return Inertia::render('Admin/Schedules/Create', [
            'date' => $date,
        ]);
    }

    /**
     * Salvar um novo evento
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'       => 'nullable|exists:users,id',
            'schedule_date' => 'required|date',
            'type'          => 'required|in:onibus,reforco,atividade',
            'activity'      => 'nullable|string|max:255',
        ]);

        Schedule::create($validated);

        return redirect()->route('schedules.index')
            ->with('success', 'Evento criado com sucesso!');
    }

    /**
     * Formulário de edição
     */
    public function edit(Schedule $schedule)
    {
        return Inertia::render('Admin/Schedules/Edit', [
            'schedule' => $schedule
        ]);
    }

    /**
     * Atualizar evento
     */
    public function update(Request $request, Schedule $schedule)
    {
        $validated = $request->validate([
            'user_id'       => 'nullable|exists:users,id',
            'schedule_date' => 'required|date',
            'type'          => 'required|in:onibus,reforco,atividade',
            'activity'      => 'nullable|string|max:255',
        ]);

        $schedule->update($validated);

        return redirect()->route('schedules.index')
            ->with('success', 'Evento atualizado com sucesso!');
    }

    /**
     * Deletar evento
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();

        return redirect()->route('schedules.index')
            ->with('success', 'Evento removido com sucesso!');
    }
}
