<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aplicacao extends Model
{
    /** @use HasFactory<\Database\Factories\AplicacaoFactory> */
    use HasFactory;

    protected $table = 'aplicacoes';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'idVacina',
        'vacinaLote',
        'cpfMorador',
        'doseAplicada',
    ];

    protected function setKeysForSaveQuery($query)
    {
        return $query->where('idVacina', $this->getAttribute('idVacina'))
                     ->where('vacinaLote', $this->getAttribute('vacinaLote'))
                     ->where('cpfMorador', $this->getAttribute('cpfMorador'))
                     ->where('doseAplicada', $this->getAttribute('doseAplicada'));
    }

    public function vacina()
    {
        return $this->belongsTo(Vacina::class, 'idVacina', 'id');
    }

    public function lote()
    {
        return $this->belongsTo(VacinaLote::class, 'vacinaLote', 'lote');
    }

    public function morador() 
    {
        return $this->belongsTo(Morador::class, 'cpfMorador', 'cpf');
    }
}
