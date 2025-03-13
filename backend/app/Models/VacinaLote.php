<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VacinaLote extends Model
{
    use HasFactory;
    
    protected $table = 'vacina_lotes';

    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [
        'idVacina',
        'lote',
        'validade',
    ];

    protected $casts = [
        'idVacina' => 'string', 
    ];

    public function vacina()
    {
        return $this->belongsTo(Vacina::class, 'idVacina', 'id');
    }

    protected function setKeysForSaveQuery($query)
    {
        return $query->where('idVacina', $this->getAttribute('idVacina'))
                     ->where('lote', $this->getAttribute('lote'));
    }

    public function delete()
    {
        $query = static::query()
            ->where('idVacina', $this->getAttribute('idVacina'))
            ->where('lote', $this->getAttribute('lote'));

        $deleted = $query->delete();

        if ($deleted) {
            $this->exists = false;
        }

        return $deleted;
    }
}