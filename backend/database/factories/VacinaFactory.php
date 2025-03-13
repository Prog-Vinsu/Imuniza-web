<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vacina>
 */
class VacinaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->unique()->word, 
            'nomeFabricante' => $this->faker->company, 
            'tipo' => $this->faker->randomElement(['Viral', 'Bacteriana', 'Subunitária', 'RNA']), 
            'dosesNecessarias' => $this->faker->numberBetween(1, 3), 
            'intervaloDoses' => $this->faker->optional()->numberBetween(14, 365),
            'indicacao' => $this->faker->randomElements( 
                ['Crianças', 'Idosos', 'Gestantes', 'Adultos', 'Profissionais de Saúde'],
                $this->faker->numberBetween(1, 5) 
            ),
        ];
    }
}
