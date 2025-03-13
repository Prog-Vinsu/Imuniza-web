<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MoradorRequest extends FormRequest
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
            // 'cpf' => ['string', 'regex:/^\d{3}\.\d{3}\.\d{3}-\d{2}$/', 'size:14'],
            'sus' => ['string', 'nullable'],
            // 'cep' => ['string', 'regex:/^\d{5}-\d{3}$/', 'size: 9'],
            'numero' => ['string'],
            'complemento' => ['string'],
            'dataNasc' => ['date'],
            'nomeMae' => ['string'],
            // 'sexo' => ['string', 'max:2'],
            'estadoCivil' => ['string', 'min:3', 'max:20'],
            'escolaridade' => ['string', 'min:3', 'max:100'],
            'etnia' => ['string', 'min:3', 'max:50'],
            // 'planoSaude' => ['string', 'min:3', 'max:100'],
            'vacinasMorador' => ['array'],
            //'vacinasMorador.*' => ['string', 'min:3', 'max:80', 'uuid', 'exists:vacinas,id'],
        ];

        if($this->isMethod('post')){
            $postRules = [
                'nome' => ['required'],
                'cpf' => ['required'],
                'cep' => ['required'],
                'numero' => ['required'],
                'dataNasc' => ['required'],
                'nomeMae' => ['required'],
                'sexo' => ['required'],
                'estadoCivil' => ['required'],
                'escolaridade' => ['required'],
                'etnia' => ['required'],
                'planoSaude' => ['required'],
            ];
        }

        if($this->isMethod('put')){
            $postRules = [
                'nome' => ['sometimes'],
                'cpf' => ['sometimes'],
                'cep' => ['sometimes'],
                'numero' => ['sometimes'],
                'dataNasc' => ['sometimes'],
                'nomeMae' => ['sometimes'],
                'sexo' => ['sometimes'],
                'estadoCivil' => ['sometimes'],
                'escolaridade' => ['sometimes'],
                'etnia' => ['sometimes'],
                'planoSaude' => ['sometimes'],
            ];
        }

        return array_merge_recursive($rules, $postRules, $putRules);
    }

    public function messages()
    {
        return [
            'nome.required' => 'O campo NOME é obrigatório.',
            'nome.string' => 'O campo NOME deve ser um texto.',
            'nome.min' => 'O campo NOME deve conter no mínimo 3 caracteres.',
            'nome.max' => 'O campo NOME deve conter no máximo 255 caracteres.',

            'cpf.required' => 'O campo CPF é obrigatório.',
            'cpf.string' => 'O campo CPF deve ser um texto.',
            'cpf.regex' => 'O campo CPF deve estar no formato 000.000.000-00.',
            'cpf.size' => 'O campo CPF deve ter exatamente 11 dígitos.',

            'sus.string' => 'O campo Cartão do SUS deve ser um texto.',
            'sus.size' => 'O campo Cartão do SUS deve ter exatamente 15 dígitos.',

            'numero.required' => 'O campo NÚMERO é obrigatório.',
            'numero.string' => 'O campo NÚMERO deve ser um texto.',

            'cep.required' => 'O campo CEP é obrigatório.',
            'cep.string' => 'O campo CEP deve ser um texto.',
            'cep.regex' => 'O campo CEP deve estar no formato 00000-000.',
            'cep.size' => 'O campo CEP deve ter exatamente 8 dígitos.',

            'dataNasc.required' => 'O campo DATA DE NASCIMENTO é obrigatório.',
            'dataNasc.date' => 'O campo DATA DE NASCIMENTO deve ser uma data válida.',
            'dataNasc.before' => 'O campo DATA DE NASCIMENTO deve ser anterior à data atual.',

            'nomeMae.required' => 'O campo NOME DA MÃE é obrigatório.',
            'nomeMae.string' => 'O campo NOME DA MÃE deve ser um texto.',
            'nomeMae.min' => 'O campo NOME DA MÃE deve conter no mínimo 3 caracteres.',
            'nomeMae.max' => 'O campo NOME DA MÃE deve conter no máximo 255 caracteres.',

            'sexo.required' => 'O campo SEXO é obrigatório.',
            'sexo.string' => 'O campo SEXO deve ser um texto.',
            'sexo.max' => 'O campo SEXO deve conter no máximo 2 caracteres.',

            'estadoCivil.required' => 'O campo ESTADO CIVIL é obrigatório.',
            'estadoCivil.string' => 'O campo ESTADO CIVIL deve ser um texto.',
            'estadoCivil.min' => 'O campo ESTADO CIVIL deve conter no mínimo 3 caracteres.',
            'estadoCivil.max' => 'O campo ESTADO CIVIL deve conter no máximo 20 caracteres.',

            'escolaridade.required' => 'O campo ESCOLARIDADE é obrigatório.',
            'escolaridade.string' => 'O campo ESCOLARIDADE deve ser um texto.',
            'escolaridade.min' => 'O campo ESCOLARIDADE deve conter no mínimo 3 caracteres.',
            'escolaridade.max' => 'O campo ESCOLARIDADE deve conter no máximo 100 caracteres.',

            'etnia.required' => 'O campo ETNIA é obrigatório.',
            'etnia.string' => 'O campo ETNIA deve ser um texto.',
            'etnia.min' => 'O campo ETNIA deve conter no mínimo 3 caracteres.',
            'etnia.max' => 'O campo ETNIA deve conter no máximo 50 caracteres.',

            'planoSaude.required' => 'O campo PLANO DE SAÚDE é obrigatório.',
            'planoSaude.string' => 'O campo PLANO DE SAÚDE deve ser um texto.',
            'planoSaude.min' => 'O campo PLANO DE SAÚDE deve conter no mínimo 3 caracteres.',
            'planoSaude.max' => 'O campo PLANO DE SAÚDE deve conter no máximo 100 caracteres.',

            'vacinasMorador.array' => 'O campo VACINAS deve ser um array.',
            'vacinasMorador.*.string' => 'Cada vacina deve ser um texto válido.',
            'vacinasMorador.*.min' => 'Cada vacina deve conter no mínimo 3 caracteres.',
            'vacinasMorador.*.max' => 'Cada vacina deve conter no máximo 80 caracteres.',
            'vacinasMorador.*.uuid' => 'O ID DA VACINA deve ser um UUID válido.',
            'vacinasMorador.*.exists' => 'O ID DA VACINA informado não corresponde a nenhuma vacina cadastrada.',

            'complemento.string' => 'O campo COMPLEMENTO deve ser um texto.',
            'complemento.min' => 'O campo COMPLEMENTO deve conter no mínimo 3 caracteres.',
            'complemento.max' => 'O campo COMPLEMENTO deve conter no máximo 255 caracteres.',
        ];
    }
}
