<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'schedule_date',
        'type',      // 'onibus', 'reforco', 'atividade', 'palavra'
        'activity',
    ];

    protected $casts = [
        'schedule_date' => 'date',
    ];

    // Relacionamento com usuário (caso precise)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacionamento N:N com professores
    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'schedule_teacher');
    }
}
