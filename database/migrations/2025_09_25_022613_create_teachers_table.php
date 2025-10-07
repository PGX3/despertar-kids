<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   // database/migrations/xxxx_xx_xx_create_teachers_table.php
public function up(): void
{
    Schema::create('teachers', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('class')->nullable(); // Turma
        $table->enum('role', ['Professor','Auxiliar'])->default('Professor'); // Cargo
        $table->string('contact')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('teachers');
}
};
