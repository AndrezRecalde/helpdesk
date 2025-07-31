<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NomAsignacionVacacionesPeriodo extends Model
{
    use HasFactory;

    protected $table = 'nom_asignacion_vacaciones_periodos';
    protected $fillable = [
        'nom_vacacion_id',
        'nom_periodo_vacacional_id',
        'dias_usados',
        'observacion'
    ];

    public function vacacion()
    {
        return $this->belongsTo(NomVacacion::class, 'nom_vacacion_id');
    }

    public function periodo()
    {
        return $this->belongsTo(NomPeriodoVacacional::class, 'nom_periodo_vacacional_id');
    }
}
