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
use App\Http\Controllers\Admin\ScheduleController;
 // <--- IMPORTANTE

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard padrão
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //professores
    Route::resource('teachers', \App\Http\Controllers\Admin\TeacherController::class);

    // CRUD de alunos (usa StudentController do Admin)
    Route::resource('students', StudentController::class);

    // Outras tabelas/resources
    Route::resource('student-documents', StudentDocumentController::class);
    Route::resource('attendances', AttendanceController::class);
    Route::resource('school-reports', SchoolReportController::class);
    Route::resource('lessons', LessonController::class);
    Route::resource('events', EventController::class);
    Route::resource('schedules', ScheduleController::class);
});

// Perfil do usuário autenticado
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
