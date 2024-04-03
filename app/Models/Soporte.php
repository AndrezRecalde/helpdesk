<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Soporte extends Model
{
    use HasFactory;

    protected $table = "sop_soporte";
    protected $primaryKey = "id_sop";

    public $timestamps = false;

    protected $fillable = [
        "anio",
        "numero_sop",
        "id_tipo_solicitud",
        "numero_escrito",
        "id_direccion",
        "id_usu_recibe",
        "id_usu_tecnico",
        "fecha_ini",
        "fecha_fin",
        "id_tipo_soporte",
        "incidente",
        "id_calificacion",
        "id_area_tic",
        "id_estado",
        "id_usuario_crea",
        "id_usu_tecnico_asig",
        "cod_barra",
        "obs_anulado",
        "fecha_fi",
        "fecha_asig",
        "id_equipo",
        "solucion"
    ];

    protected $casts = [
        "fecha_ini" => "datetime",
        "fecha_fin"  => 'datetime'
    ];

    public static function create(array $attributes = [])
    {
        $attributes['id_usuario_crea'] = auth()->id();

        $soporte = static::query()->create($attributes);

        return $soporte;
    }

    function scopeTecnico($query, $id_usu_tecnico_asig)
    {
        if ($id_usu_tecnico_asig) {
            return $query->where("ss.id_usu_tecnico_asig", $id_usu_tecnico_asig);
        }
    }

    function scopeFechas($query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('ss.fecha_ini', [$fecha_inicio, $fecha_fin]);
        }
    }

    function scopeDireccion($query, $id_direccion)
    {
        if ($id_direccion) {
            return $query->where("ss.id_direccion", $id_direccion);
        }
    }

    function scopeNumero($query, $numero)
    {
        if ($numero) {
            return $query->where("ss.numero_sop", $numero);
        }
    }

    function scopeUsuario($query, $id_usu_recibe)
    {
        if ($id_usu_recibe) {
            return $query->where('ss.id_usu_recibe', $id_usu_recibe);
        }
    }
}
