<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controllers padrão
use App\Http\Controllers\StudentDocumentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\SchoolReportController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\EventController;

// Controllers Admin
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\ScheduleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 🔹 Página inicial
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// 🔹 Área autenticada ADMIN
Route::middleware(['auth', 'verified'])->group(function () {

    // ✅ Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // ✅ Professores
    Route::resource('teachers', TeacherController::class);

    // ✅ Alunos
    Route::resource('students', StudentController::class);

    // ✅ Documentos dos alunos
    Route::resource('student-documents', StudentDocumentController::class);

    // ✅ Presenças
    Route::prefix('attendances')->name('attendances.')->group(function () {

        // Chamada do dia
        Route::get('/', [AttendanceController::class, 'index'])
            ->name('index');

        // Histórico das chamadas
        Route::get('/history', [AttendanceController::class, 'history'])
            ->name('history');

        // ✅ Ver uma chamada antiga
        Route::get('/{date}', [AttendanceController::class, 'show'])
            ->where('date', '\d{4}-\d{2}-\d{2}')
            ->name('show');

        // Salvar chamada
        Route::post('/', [AttendanceController::class, 'store'])
            ->name('store');
    });

    // ✅ Boletins
    Route::resource('school-reports', SchoolReportController::class);

    // ✅ Aulas
    Route::resource('lessons', LessonController::class);

    // ✅ Eventos
    Route::resource('events', EventController::class);

    // ✅ Horários / Cronograma
    Route::resource('schedules', ScheduleController::class);
});

// 🔹 Perfil do usuário
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
