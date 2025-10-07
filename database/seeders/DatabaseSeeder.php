<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Cria 10 usuários fictícios se quiser
        // User::factory(10)->create();

        // Cria um usuário de teste
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Chama o seeder do admin
        $this->call(AdminUserSeeder::class);
    }
}
