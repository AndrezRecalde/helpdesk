<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvCategoria extends Model
{
    use HasFactory;

    protected $table = 'inv_categorias';

    protected $fillable = [
        'nombre_categoria',
        'tipocategoria_id',
        //'stock',
        'activo'
    ];

    // Método para agregar o aumentar stock
    /* public function agregarStock($cantidad): void
    {
        $this->stock += $cantidad;
        //$this->actualizarEstadoActivo();
        $this->save();
    } */

    // Método para reducir stock
    /* public function reducirStock(int $cantidad): bool
    {
        // Verifica que la cantidad a reducir no deje el stock en negativo
        if ($this->stock >= $cantidad) {
            $this->stock -= $cantidad;
            //$this->actualizarEstadoActivo();
            $this->save();
            return true;
        }

        return false; // Retorna false si no es posible reducir el stock
    } */

    /* protected function actualizarEstadoActivo(): void
    {
        // Si el stock es 0, desactiva la categoría; de lo contrario, la activa
        $this->activo = $this->stock > 0;
    } */

    function equipos(): HasMany
    {
        return $this->hasMany(InvEquipo::class, 'categoria_id');
    }

    function tipocategoria(): BelongsTo
    {
        return $this->belongsTo(InvTipoCategoria::class, 'tipocategoria_id');
    }

    function scopeByTipocategoriaId(Builder $query, $tipocategoria_id)
    {
        if ($tipocategoria_id) {
            return $query->where('invc.tipocategoria_id', $tipocategoria_id);
        }
    }

    function scopeByTiposCategorias(Builder $query, $tiposCategorias)
    {
        if ($tiposCategorias) {
            return $query->whereIn('invt.id', $tiposCategorias);
        }
    }

    function scopeActivo(Builder $query, $activo)
    {
        if ($activo) {
            return $query->where('invc.activo', $activo);
        }
    }
}
