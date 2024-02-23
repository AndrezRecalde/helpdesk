<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Solicitud extends Model
{
    use HasFactory;

    protected $table = "sw_solicitudes";

    protected $fillable = [
        "solicitud",
        "num_solicitud",
        "fecha_solicitud",
        "usuario_id",
        "departamento_id",
        "leido",
    ];

    function usuarios(): HasMany
    {
        return $this->hasMany(User::class);
    }

    function departamentos(): HasMany
    {
        return $this->hasMany(Departamento::class);
    }

    function soporte(): HasOne
    {
        return $this->hasOne(Soporte::class, "sw_soportes");
    }

    public static function create(array $attributes = [])
    {
        $attributes['fecha_solicitud'] = Carbon::now()->format('Y-m-d');

        $solicitud = static::query()->create($attributes);

        return $solicitud;
    }

    public function scopeAllowed($query)
    {
        if (auth()->user()->hasRole('GERENTE'))
        {
            return $query;
        }
        else
        {
        return $query->where('usuario_id', auth()->id());
        }
    }

    function scopeFecha($query, $fecha)
    {
        if ($fecha) {
            return $query->where("ss.fecha_solicitud", $fecha);
        }
    }
}
