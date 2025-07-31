<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NomVacacionesDescuento extends Model
{
    use HasFactory;

    protected $table = 'nom_vacaciones_descuentos';

    protected $fillable = [
        'usuario_id',
        'nom_periodo_vacacional_id',
        'dias_descuento',
        'motivo',
        'usuario_tthh'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function periodoVacacional()
    {
        return $this->belongsTo(NomPeriodoVacacional::class, 'nom_periodo_vacacional_id');
    }

    public function scopeByUsuarioId(Builder $query, $usuarioId)
    {
        if ($usuarioId) {
            return $query->where('usuario_id', $usuarioId);
        }
    }

    function scopeByAnio(Builder $query, $anio)
    {
        if ($anio) {
            return $query->whereHas('periodoVacacional', function (Builder $q) use ($anio) {
                $q->where('anio', $anio);
            });
        }
    }
}
