<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Equipo extends Model
{
    use HasFactory;

    protected $table = "sop_equipo";
    protected $primaryKey = "idsop_equipo";
    public $timestamps = false;

    protected $fillable = [
        'idsop_equipo',
        'id_tipo_equipo',
        'id_subtipo_equipo',
        'sop_equipo_codigo',
        'sop_equipo_serie',
        'sop_equipo_u_s',
        'id_usuario_responsable',
        'id_usuario_utiliza',
        'tipo_equipo',
        'usuario',
        'marca',
        'modelo',
        'fecha_compra',
        'sección',
        'subsección',
        'vida_util',
        'id_estado',
        'sop_equ_usu_da_baja',
        'sop_euq_fecha_da_baja',
        'sop_equipo_fi',
        'sop_equipo_um',
        'sop_equipo_codigo_ant',
    ];

    function tipos(): BelongsTo
    {
        return $this->belongsTo(TipoEquipo::class, 'id_tipo_equipo', 'idsop_equipo');
    }
}
