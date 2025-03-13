<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacina extends Model
{
    /** @use HasFactory<\Database\Factories\VacinaFactory> */
    use HasFactory, HasUuids;

    protected $table = 'vacinas';

    protected $fillable = [
        'nome',
        'cnpjFabricante',
        'tipo',
        'dosesNecessarias',
        'intervaloDoses',
        'indicacao'
    ];

    protected $casts = [
        'indicacao' => 'array',
    ];

    public function fabricante()
    {
        return $this->belongsTo(Fabricante::class, 'cnpjFabricante', 'cnpj');
    }
}
