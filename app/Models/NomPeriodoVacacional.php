<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NomPeriodoVacacional extends Model
{
    use HasFactory;

    protected $table = 'nom_periodo_vacacionales';

    protected $fillable = [
        'cdgo_usrio',
        'regimen_laboral_id',
        'anio',
        'dias_total',
        'dias_tomados',
        'dias_disponibles',
        'observacion'
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cdgo_usrio');
    }

    public function asignaciones()
    {
        return $this->hasMany(NomAsignacionVacacionesPeriodo::class, 'nom_periodo_vacacional_id');
    }

    public function descuentos()
    {
        return $this->hasMany(NomVacacionesDescuento::class, 'nom_periodo_vacacional_id');
    }

    function scopeByUsuarioId(Builder $query, $cdgo_usrio)
    {
        if ($cdgo_usrio) {
            return $query->where('npv.cdgo_usrio', $cdgo_usrio);
        }
    }

    function scopeByAnio(Builder $query, $anio)
    {
        if ($anio) {
            return $query->where('npv.anio', $anio);
        }
    }
}
