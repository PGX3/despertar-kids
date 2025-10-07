<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

protected $fillable = [
    'name',
    'email',      // se ainda usa
    'class',      // turma
    'role',       // cargo
    'contact'     // telefone/whatsapp
];


}
