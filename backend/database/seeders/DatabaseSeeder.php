<?php

namespace Database\Seeders;

use App\Models\Fabricante;
use App\Models\Morador;
use App\Models\User;
use App\Models\Vacina;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'teste@imunizaweb.com',
        ]);

        // Morador::factory(10)->create();

        // Fabricante::factory(5)->create();

        // Vacina::factory(5)->create();
    }
}
