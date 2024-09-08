<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoEquipo extends Model
{
    use HasFactory;
    protected $table = "sop_tipo_equipo";
    protected $primaryKey = "idsop_tipo_equipo";
    public $timestamps = false;

    function equipos(): HasMany
    {
        return $this->hasMany(Equipo::class, 'id_tipo_equipo', 'idsop_tipo_equipo');
    }
}

/*
SQLSTATE[42S22]: Column not found: 1054 Unknown column &#039;sop_equipo.idsop_tipo_equipo&#039;
 in &#039;where clause&#039; (Connection: mysql, SQL: select `sop_equipo_codigo`, `sop_equipo_serie`
  from `sop_equipo` where `sop_equipo`.`idsop_tipo_equipo` in (?)) in file */
