<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VacinaLoteRequest extends FormRequest
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
            'idVacina' => ['exists:vacinas,id', 'uuid'],
            'lote' => ['string', 'max:20'],
            'validade' => ['date'],
        ];

        if($this->isMethod('post')) {
            $postRules = [
                'lote' => ['required'],
                'idVacina' => ['required'],
                'validade' => ['required'],
            ];
        }

        if($this->isMethod('put')) {
            $postRules = [
                'lote' => ['sometimes'],
                'idVacina' => ['sometimes'],
                'validade' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'lote.string' => 'O campo LOTE deve ser um texto.',
            'lote.max' => 'O campo LOTE deve ter no máximo 20 caracteres.',
            'lote.required' => 'O campo LOTE é obrigatório.',

            'validade.date' => 'O campo VALIDADE deve ser uma data válida.',
            'validade.required' => 'O campo VALIDADE é obrigatório.',

            'idVacina.uuid' => 'O campo ID DA VACINA deve ser um UUID válido.',
            'idVacina.required' => 'O campo ID DA VACINA é obrigatório.',
            'idVacina.exists' => 'O ID DA VACINA informado não corresponde a nenhuma vacina cadastrada.',
        ];
    }
}
