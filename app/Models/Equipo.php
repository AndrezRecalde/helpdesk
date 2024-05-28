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

    function tipos(): BelongsTo
    {
        return $this->belongsTo(TipoEquipo::class, 'id_tipo_equipo', 'idsop_equipo');
    }
}
