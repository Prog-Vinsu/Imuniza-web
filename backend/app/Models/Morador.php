<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Morador extends Model
{
    /** @use HasFactory<\Database\Factories\MoradorFactory> */
    use HasFactory;

    protected $table = 'moradores';

    protected $primaryKey = 'cpf';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'nome',
        'cpf',
        'sus',
        'cep',
        'numero',
        'complemento',
        'dataNasc',
        'nomeMae',
        'sexo',
        'estadoCivil',
        'escolaridade',
        'etnia',
        'planoSaude',
        'vacinasMorador'
    ];

    protected $casts = [
        'vacinasMorador' => 'array',
    ];

    public function aplicacoes()
    {
        return $this->hasMany(Aplicacao::class, 'cpfMorador', 'cpf');
    }

    public function getVacinasMoradorAttribute()
    {
        return $this->aplicacoes->map(function ($aplicacao) {
            return [
                'idVacina' => $aplicacao->vacina->id,
                'vacinaNome' => $aplicacao->vacina->nome,
                'vacinaLote' => $aplicacao->vacinaLote,
                'doseAplicada' => $aplicacao->doseAplicada,
                'dataAplicacao' => $aplicacao->created_at,
            ];
        });
    }
}
