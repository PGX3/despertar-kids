<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Schedule;
use App\Models\Attendance;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'students' => Student::count(),
            'teachers' => Teacher::count(),
            'classes' => Schedule::count(),
        ];

        // ✅ Dados reais para o gráfico — últimos 5 dias úteis
        $startDate = Carbon::now()->subDays(4);
        $attendanceData = [];

        for ($i = 0; $i < 5; $i++) {
            $day = $startDate->copy()->addDays($i);

            $count = Attendance::whereDate('created_at', $day)->count();

            $attendanceData[] = [
                'day' => $day->translatedFormat('D'),
                'presencas' => $count,
            ];
        }

        $stats['attendanceAvg'] = round(collect($attendanceData)->avg('presencas'), 2);
        $stats['attendanceData'] = $attendanceData;

        // ✅ Atividades recentes (mock por enquanto)
        $recent = [
            [
                'icon' => 'user',
                'title' => 'Novo aluno matriculado',
                'description' => 'Ana Clara - Pré A',
                'time' => 'Há 2 horas',
            ],
            [
                'icon' => 'lesson',
                'title' => 'Chamada registrada',
                'description' => 'Turma Jardim B',
                'time' => 'Há 4 horas',
            ],
        ];

return Inertia::render('Admin/Dashboard', [
    'title' => 'Dashboard',
    'stats' => $stats,
    'recent' => $recent,
]);

    }
}
