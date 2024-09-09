<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
