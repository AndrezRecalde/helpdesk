<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    use HasFactory;

    protected $table = "per_permisos";
    protected $primaryKey = "idper_permisos";

    public $timestamps = false;

    protected $casts = [
        "per_fecha_salida" => "datetime",
        "per_fecha_llegada"  => 'datetime'
    ];

    protected $fillable = [
        'id_usu_pide',
        'id_direccion_pide',
        'id_tipo_motivo',
        'per_fecha_salida',
        'per_fecha_llegada',
        'id_jefe_inmediato',
        'per_observaciones',
        'id_estado'
    ];

    public static function create(array $attributes = [])
    {
        $attributes['id_estado'] = 1;

        $permiso = static::query()->create($attributes);

        return $permiso;
    }

    public function scopeDireccion($query, $id_direccion_pide)
    {
        return $query->when($id_direccion_pide !== null, function ($q) use ($id_direccion_pide) {
            return $q->where('id_direccion_pide', $id_direccion_pide);
        });
    }

    /**
     * Scope para filtrar por usuario
     */
    public function scopeUsuario($query, $id_usu_pide)
    {
        return $query->when($id_usu_pide, function ($q) use ($id_usu_pide) {
            return $q->where('id_usu_pide', $id_usu_pide);
        });
    }

    /**
     * Scope para filtrar por código/ID
     */
    public function scopeCodigo($query, $idper_permisos)
    {
        return $query->when($idper_permisos, function ($q) use ($idper_permisos) {
            return $q->where('idper_permisos', $idper_permisos);
        });
    }

    /**
     * Scope para filtrar por estado
     */
    public function scopeEstado($query, $id_estado)
    {
        return $query->when($id_estado, function ($q) use ($id_estado) {
            return $q->where('id_estado', $id_estado);
        });
    }

    /**
     * Scope para filtrar por rango de fechas
     */
    public function scopeBetweenFechas($query, $fecha_inicio, $fecha_fin)
    {
        return $query->when($fecha_inicio && $fecha_fin, function ($q) use ($fecha_inicio, $fecha_fin) {
            return $q->whereBetween('per_fecha_salida', [
                Carbon::parse($fecha_inicio)->startOfDay(),
                Carbon::parse($fecha_fin)->endOfDay(),
            ]);
        });
    }

    /**
     * Scope para filtrar por año (OPTIMIZADO)
     */
    public function scopeAnio($query, $anio)
    {
        return $query->when($anio, function ($q) use ($anio) {
            return $q->whereYear('per_fecha_salida', $anio);
        });
    }
}
