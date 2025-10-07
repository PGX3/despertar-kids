<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'class',            // turma (Sementinhas, Juniores, MMs, Tropa)
        'age',
        'guardian_name',    // mãe/pai/responsável
        'guardian_contact',
        'date_of_birth',
        'address',
        'notes'
    ];

    // Constantes com os grupos fixos
    public const GROUPS = ['Sementinhas', 'Juniores', 'MMs', 'Tropa'];

    // -----------------------
    // RELACIONAMENTOS
    // -----------------------

    public function documents()
    {
        return $this->hasMany(StudentDocument::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function schoolReports()
    {
        return $this->hasMany(SchoolReport::class);
    }

    // -----------------------
    // SCOPES ÚTEIS
    // -----------------------

    // buscar alunos por turma
    public function scopeByClass($query, string $class)
    {
        return $query->where('class', $class);
    }
}
