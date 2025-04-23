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

    function scopeDireccion($query, $id_direccion_pide)
    {
        if ($id_direccion_pide !== null) {
            return $query->where('pp.id_direccion_pide', $id_direccion_pide);
        }
    }

    function scopeUsuario($query, $id_usu_pide)
    {
        if ($id_usu_pide) {
            return $query->where('pp.id_usu_pide', $id_usu_pide);
        }
    }

    function scopeCodigo($query, $idper_permisos)
    {
        if ($idper_permisos) {
            return $query->where('pp.idper_permisos', $idper_permisos);
        }
    }

    function scopeEstado($query, $id_estado)
    {
        if ($id_estado) {
            return $query->where('pp.id_estado', $id_estado);
        }
    }

    function scopeBetweenFechas($query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio && $fecha_fin) {
            return $query->whereBetween('pp.per_fecha_salida', [
                Carbon::parse($fecha_inicio)->startOfDay(),
                Carbon::parse($fecha_fin)->endOfDay(),
            ]);
        }
    }
}
