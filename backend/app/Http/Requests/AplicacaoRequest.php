<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AplicacaoRequest extends FormRequest
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
            'idVacina' => ['uuid', 'exists:vacinas,id'],
            'vacinaLote' => ['string', 'min:3', 'max:36'],
            'cpfMorador' => ['string', 'regex:/^\d{3}\.\d{3}\.\d{3}-\d{2}$/', 'size:14'], 
            'doseAplicada' => ['integer'],
        ];

        if ($this->isMethod('post')) {
            $postRules = [
                'idVacina' => ['required'], 
                'vacinaLote' => ['required'],
                'cpfMorador' => ['required'],
                'doseAplicada' => ['required'],
            ];
        }

        if ($this->isMethod('put')) {
            $putRules = [
                'idVacina' => ['sometimes'], 
                'vacinaLote' => ['sometimes'],
                'cpfMorador' => ['sometimes'],
                'doseAplicada' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'idVacina.required' => 'O ID da vacina é obrigatório.',
            'idVacina.uuid' => 'O ID da vacina deve ser um UUID válido.',
            'idVacina.exists' => 'A vacina informada não existe.',

            'vacinaLote.required' => 'O lote da vacina é obrigatório.',
            'vacinaLote.string' => 'O lote da vacina deve ser um texto.',
            'vacinaLote.min' => 'O lote da vacina deve ter no mínimo :min caracteres.',
            'vacinaLote.max' => 'O lote da vacina deve ter no máximo :max caracteres.',

            'cpfMorador.required' => 'O CPF do morador é obrigatório.',
            'cpfMorador.string' => 'O CPF do morador deve ser um texto.',
            'cpfMorador.regex' => 'O CPF do morador deve estar no formato XXX.XXX.XXX-XX.',
            'cpfMorador.size' => 'O CPF do morador deve conter exatamente 14 caracteres.',

            'doseAplicada.required' => 'A dose aplicada é obrigatória.',
            'doseAplicada.integer' => 'A dose aplicada deve ser um número inteiro.',
        ];
    }
}
