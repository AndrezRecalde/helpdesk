<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class InvEquipo extends Model
{
    use HasFactory;

    protected $table = 'inv_equipos';

    protected $fillable = [
        'nombre_equipo',
        'codigo_antiguo',
        'codigo_nuevo',
        'modelo',
        'numero_serie',
        'fecha_adquisicion',
        'fecha_amortizacion',
        'vida_util',
        'descripcion',
        'bien_adquirido',
        'bien_donado',
        'bien_usado',
        'ubicacion_id',
        'categoria_id',
        'estado_id',
        'marca_id'
    ];

    function usuarios(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'usuario_equipo', 'equipo_id', 'usuario_id')
                    ->withPivot('direccion_id', 'concepto_id');;
    }

    /* function departamentos(): BelongsToMany
    {
        return $this->belongsToMany(Departamento::class, 'departamento_equipo', 'equipo_id', 'cdgo_dprtmnto');
    } */

    function ubicacion(): BelongsTo
    {
        return $this->belongsTo(InvUbicacion::class, 'ubicacion_id');
    }

    function categoria(): BelongsTo
    {
        return $this->belongsTo(InvMarca::class, 'categoria_id');
    }

    function estados(): BelongsTo
    {
        return $this->belongsTo(InvEstado::class, 'estado_id');
    }

    function marca(): BelongsTo
    {
        return $this->belongsTo(InvMarca::class, 'marca_id');
    }

    function scopeCodigoAntiguo(Builder $query, $codigo_antiguo)
    {
        if ($codigo_antiguo) {
            return $query->where('inve.codigo_antiguo', $codigo_antiguo);
        }
    }

    function scopeCodigoNuevo(Builder $query, $codigo_nuevo)
    {
        if ($codigo_nuevo) {
            return $query->where('inve.codigo_nuevo', $codigo_nuevo);
        }
    }

    function scopeEstadoId(Builder $query, $estado_id)
    {
        if ($estado_id) {
            return $query->where('inve.estado_id', $estado_id);
        }
    }

    function scopeCategoriaId(Builder $query, $categoria_id)
    {
        if ($categoria_id) {
            return $query->where('inve.categoria_id', $categoria_id);
        }
    }

    function scopeBuscarPorCodigo(Builder $query, string $codigo)
    {
        if ($codigo) {
            return $query->where('codigo_antiguo', $codigo)
                ->orWhere('codigo_nuevo', $codigo);
        }
    }
}
