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
        "id_equipo"
    ];

    protected $casts = [
        "fecha_ini" => "datetime"
    ];

    function scopeTecnico($query, $id_usu_tecnico_asig)
    {
        if ($id_usu_tecnico_asig) {
            return $query->where("ss.id_usu_tecnico_asig", $id_usu_tecnico_asig);
        }
    }
}
