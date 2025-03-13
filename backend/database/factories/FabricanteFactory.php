<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fabricante>
 */
class FabricanteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->company(),
            'cnpj' => $this->faker->regexify('\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}'),
            'cep' => $this->faker->postcode(),
            'numero' => $this->faker->buildingNumber(),
            'complemento' => $this->faker->optional()->sentence(3),
        ];
    }
}
