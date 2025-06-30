<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NomVacacion extends Model
{
    use HasFactory;

    protected $table = 'nom_vacaciones';
    protected $fillable = [
        'fecha_solicitud',
        'codigo_vacacion',
        'cdgo_usrio',
        'fecha_inicio',
        'fecha_fin',
        'fecha_retorno',
        'dias_solicitados',
        'motivo_id',
        'jefe_id',
        'director_id',
        'estado_id',
        'usuario_creador',
        'usuario_tthh',
        'observaciones',
        'observaciones_anulado',
    ];

    protected $casts = [
        'fecha_inicio'    => 'date',
        'fecha_fin'       => 'date',
        'fecha_retorno'   => 'date',
        'fecha_solicitud' => 'date',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'cdgo_usrio');
    }

    public function asignaciones()
    {
        return $this->hasMany(NomAsignacionVacacionesPeriodo::class, 'nom_vacacion_id');
    }

    function scopeByUsuarioId(Builder $query, $cdgo_usrio)
    {
        if ($cdgo_usrio) {
            return $query->where('nv.cdgo_usrio', $cdgo_usrio);
        }
    }

    function scopeByCodigo(Builder $query, $codigo)
    {
        if ($codigo) {
            return $query->where('nv.codigo_vacacion', $codigo);
        }
    }

    function scopeByAnio(Builder $query, $anio)
    {
        if ($anio) {
            return $query->where('nv.fecha_solicitud', 'like', '%' . $anio . '%');
        }
    }

    function scopeByFechaEmisionBetween(Builder $query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio && $fecha_fin) {
            return $query->whereBetween('nv.fecha_solicitud', [$fecha_inicio, $fecha_fin]);
        }
    }
}
