<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\StudentDocumentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\SchoolReportController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\EventController;


use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\ScheduleController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');


Route::middleware(['auth', 'verified'])->group(function () {

    
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

   
    Route::resource('teachers', TeacherController::class);

  
    Route::resource('students', StudentController::class);

    
    Route::resource('student-documents', StudentDocumentController::class);

   
    Route::prefix('attendances')->name('attendances.')->group(function () {

  
        Route::get('/', [AttendanceController::class, 'index'])->name('index');

        
        Route::get('/history', [AttendanceController::class, 'history'])->name('history');

        
        Route::get('/{date}', [AttendanceController::class, 'show'])
            ->where('date', '\d{4}-\d{2}-\d{2}')
            ->name('show');

       
        Route::post('/', [AttendanceController::class, 'store'])->name('store');
    });


    Route::resource('school-reports', SchoolReportController::class);

    
    Route::resource('lessons', LessonController::class);

   
    Route::resource('events', EventController::class);


    Route::get('/schedules/create/{date?}', [ScheduleController::class, 'create'])
        ->name('schedules.create');

    
    Route::resource('schedules', ScheduleController::class);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
