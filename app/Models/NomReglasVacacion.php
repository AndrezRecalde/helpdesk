<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NomReglasVacacion extends Model
{
    use HasFactory;

    protected $table = 'nom_reglas_vacaciones';

    protected $fillable = [
        'regimen_laboral_id',
        'desde_periodo',
        'hasta_periodo',
        'dias_otorgados',
        'incremento_por_periodo',
        'maximo_dias',
    ];
}
