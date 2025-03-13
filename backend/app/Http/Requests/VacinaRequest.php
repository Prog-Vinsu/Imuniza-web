<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VacinaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $postRules = [];
        $putRules = [];

        $rules = [
            'nome' => ['string', 'min:3', 'max:255'],
            'cnpjFabricante' => ['string',   'size:14', 'exists:fabricantes,cnpj'],
            'tipo' => ['string', 'min:3', 'max:100'],
            'dosesNecessarias' => ['integer'],
            'intervaloDoses' => ['integer', 'nullable'],
            'indicacao' => ['array'],
            'indicacao.*' => ['string', 'min:3', 'max:80'],
        ];

        if($this->isMethod('post')) {
            $postRules = [
                'nome' => ['required'],
                'cnpjFabricante' => ['required'],
                'tipo' => ['required'],
                'dosesNecessarias' => ['required'],
                'indicacao' => ['required'],
            ];
        }

        if($this->isMethod('put')) {
            $postRules = [
                'nome' => ['sometimes'],
                'cnpjFabricante' => ['sometimes'],
                'tipo' => ['sometimes'],
                'dosesNecessarias' => ['sometimes'],
                'indicacao' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages() 
    {
        return [
            'nome.required' => 'O campo NOME é obrigatório.',
            'nome.string' => 'O campo NOME deve ser uma string.',
            'nome.min' => 'O campo NOME deve ter pelo menos :min caracteres.',
            'nome.max' => 'O campo NOME não pode ter mais de :max caracteres.',
    
            'cnpjFabricante.exists' => 'O CNPJ informado não corresponde a nenhum fabricante cadastrado.',
            'cnpjFabricante.required' => 'O campo CNPJ DO FABRICANTE é obrigatório.',
            'cnpjFabricante.string' => 'O campo CNPJ DO FABRICANTE deve ser uma string.',
            'cnpjFabricante.size' => 'O campo CNPJ DO FABRICANTE deve ter 14 dígitos.',
        
            'tipo.required' => 'O campo TIPO é obrigatório.',
            'tipo.string' => 'O campo TIPO deve ser uma string.',
            'tipo.min' => 'O campo TIPO deve ter pelo menos :min caracteres.',
            'tipo.max' => 'O campo TIPO não pode ter mais de :max caracteres.',
    
            'dosesNecessarias.required' => 'O campo DOSES NECESSÁRIAS é obrigatório.',
            'dosesNecessarias.integer' => 'O campo DOSES NECESSÁRIAS deve ser um número inteiro.',
    
            'intervaloDoses.integer' => 'O campo INTERVALO ENTRE DOSES deve ser um número inteiro.',
    
            'indicacao.required' => 'O campo INDICAÇÃO é obrigatório.',
            'indicacao.array' => 'O campo INDICAÇÃO deve ser um array.',
    
            'indicacao.*.string' => 'Cada item da indicação deve ser uma string.',
            'indicacao.*.min' => 'Cada item da indicação deve ter pelo menos :min caracteres.',
            'indicacao.*.max' => 'Cada item da indicação não pode ter mais de :max caracteres.',
        ];
    }
}
