<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckInOut extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv';

    protected $table = 'CHECKINOUT';

    function scopeByUserId(Builder $query, $asi_id_reloj)
    {
        if ($asi_id_reloj) {
            return $query->where('ch.USERID', $asi_id_reloj);
        }
    }

    function scopeByFechas(Builder $query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('ch.CHECKTIME', [$fecha_inicio, $fecha_fin]);
        }
    }
}
