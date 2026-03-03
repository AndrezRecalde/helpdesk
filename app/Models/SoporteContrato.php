<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoporteContrato extends Model
{
    use HasFactory;

    protected $table = 'sop_contratos';
    protected $primaryKey = 'id_contrato';

    protected $fillable = [
        'codigo_contrato',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function licencias()
    {
        return $this->hasMany(SoporteLicencia::class, 'id_contrato', 'id_contrato');
    }
}
