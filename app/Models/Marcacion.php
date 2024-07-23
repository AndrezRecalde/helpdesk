<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marcacion extends Model
{
    use HasFactory;

    protected $table = 'asi_marcaciones';

    protected $primaryKey = "idasi_marcaciones";

    protected $casts = [
        "fecha" => "datetime",
    ];

    function scopeByFechas(Builder $query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('am.fecha', [$fecha_inicio, $fecha_fin]);
        }
    }

    function scopeByCedula(Builder $query, $asi_id_reloj)
    {
        if ($asi_id_reloj) {
            return $query->where('am.ac_no', $asi_id_reloj);
        }
    }
}
