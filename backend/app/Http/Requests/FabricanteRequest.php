<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FabricanteRequest extends FormRequest
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
            'nome' => ['string'],
            //'cnpj' => ['string','regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/', 'size:14'],
            //'cep' => ['string', 'regex:/^\d{5}-\d{3}$/', 'size:9'],
            'numero' => ['integer'],
            'complemento' => ['string', 'nullable'],
        ];

        if($this->isMethod('post')){
            $postRules = [
                'nome' => ['required'],
                'cnpj' => ['required'],
                'cep' => ['required'],
            ];
        }

        if($this->isMethod('put')){
            $postRules = [
                'nome' => ['sometimes'],
                'cnpj' => ['sometimes'],
                'cep' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'nome.required' => 'O campo NOME é obrigatório.',
            'nome.min' => 'O campo NOME deve ter no mínimo 3 caracteres.',
            'nome.max' => 'O campo NOME deve ter no máximo 80 caracteres.',

            'cnpj.required' => 'O campo CNPJ é obrigatório.',
            'cnpj.regex' => 'O campo CNPJ deve estar no formato correto (00.000.000/0000-00 ou 14 dígitos).',
            'cnpj.size' => 'O campo CNPJ deve ter 14 dígitos.',

            'cep.required' => 'O campo CEP é obrigatório.',
            'cep.regex' => 'O campo CEP deve estar no formato 00000-000.',
            'cep.size' => 'O campo CEP deve ter 9 digitos.',

            'numero.required' => 'O campo número é obrigatório.',

            'complemento.min' => 'O campo complemento deve ter no mínimo 3 caracteres.',
            'complemento.max' => 'O campo complemento deve ter no máximo 150 caracteres.',
        ];
    }
}
