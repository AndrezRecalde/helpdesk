<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoporteLicencia extends Model
{
    use HasFactory;

    protected $table = 'sop_licencias';
    protected $primaryKey = 'id_licencia';

    protected $fillable = [
        'id_contrato',
        'nombre',
        'fecha_vencimiento'
    ];

    protected $casts = [
        'fecha_vencimiento' => 'date',
    ];

    public function contrato()
    {
        return $this->belongsTo(SoporteContrato::class, 'id_contrato', 'id_contrato');
    }
}
