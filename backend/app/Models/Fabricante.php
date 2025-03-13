<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fabricante extends Model
{
    /** @use HasFactory<\Database\Factories\FabricanteFactory> */
    use HasFactory;

    protected $table = 'fabricantes';

    protected $primaryKey = 'cnpj';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'cnpj',
        'nome',
        'cep',
        'numero',
        'complemento'
    ];
    
    public function setCnpjAttribute($value)
    {
        $this->attributes['cnpj'] = preg_replace('/\D/', '', $value);
    }
}
