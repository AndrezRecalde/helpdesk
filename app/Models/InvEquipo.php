<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvEquipo extends Model
{
    use HasFactory;

    protected $table = 'inv_equipos';

    protected $fillable = [
        //'nombre_equipo',
        'modelo',
        'numero_serie',
        'codigo_antiguo',
        'codigo_nuevo',
        'fecha_adquisicion',
        'fecha_amortizacion',
        'fecha_baja',
        'vida_util',
        'descripcion',
        'bien_adquirido',
        'bien_donado',
        'bien_usado',
        'stock',
        'ubicacion_id',
        'categoria_id',
        'estado_id',
        'marca_id',
    ];

    protected $casts = [
        'bien_adquirido' => 'boolean',
        'bien_donado' => 'boolean',
        'bien_usado' => 'boolean',
        'fecha_adquisicion' => 'date',
        'fecha_amortizacion' => 'date',
        'fecha_baja'        => 'date'
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

    function documentos(): HasMany
    {
        return $this->hasMany(InvDocumentoEquipo::class, 'equipo_id');
    }

    // Método para agregar stock
    public function agregarStock($cantidad)
    {
        $this->stock += $cantidad;
        $this->save();
    }

    // Método para reducir stock
    public function reducirStock($cantidad)
    {
        // Verificar si la cantidad solicitada es mayor al stock disponible
        if ($this->stock >= $cantidad) {
            $this->stock -= $cantidad;
            $this->save();
            return [
                'status' => 'success',
                'msg' => "Stock reducido con éxito. Cantidad actual: {$this->stock}"
            ];
        } else {
            // Lógica para manejar cuando no hay suficiente stock
            return [
                'status' => 'error',
                'msg' => "No hay suficiente stock. Disponible: {$this->stock}, Solicitado: {$cantidad}"
            ];
        }
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
