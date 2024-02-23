<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Soporte extends Model
{
    use HasFactory;

    protected $table = "sw_soportes";

    protected $fillable = [
        "tecnico_id",
        "area_id",
        "retrospectiva",
        "estado_id",
        "tipo_soporte_id",
        "solicitud_id"
    ];


    function solicitud() : BelongsTo {
        return $this->belongsTo(Solicitud::class);
    }
}
