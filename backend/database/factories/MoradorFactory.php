<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Morador>
 */
class MoradorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'cpf' => $this->faker->regexify('[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}'), 
            'sus' => $this->faker->regexify('[0-9]{15}'), 
            'endereco' => $this->faker->address(),
            'complemento' => $this->faker->optional()->sentence(3),
            'CEP' => $this->faker->regexify('[0-9]{5}-[0-9]{3}'), 
            'cidade' => $this->faker->city(),
            'siglaUF' => $this->faker->randomElement([
                'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
                'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
                'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
            ]), 
            'dataNasc' => $this->faker->date('Y-m-d', '2005-01-01'), 
            'nomeMae' => $this->faker->name('female'),
            'sexo' => $this->faker->randomElement(['Masculino', 'Feminino', 'Outro']),
            'estadoCivil' => $this->faker->randomElement(['Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Outro']),
            'escolaridade' => $this->faker->randomElement(['Fundamental', 'Medio', 'Superior', 'Outro']),
            'etnia' => $this->faker->randomElement(['Branca', 'Parda', 'Preta', 'Indígena', 'Amarela', 'Outro']),
            'planoSaude' => $this->faker->boolean(),
            'vacinasMorador' => json_encode($this->faker->randomElements([
                'Hepatite B', 'Tétano', 'Febre Amarela', 'COVID-19', 'Sarampo'
            ], $this->faker->numberBetween(1, 5))), 
        ];
    }
}
