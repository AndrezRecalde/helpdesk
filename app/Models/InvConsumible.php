<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class InvConsumible extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_consumible',
        'codigo',
        'categoria_id',
        'stock',
        'estado'
    ];

    public function departamentos(): BelongsToMany
    {
        return $this->belongsToMany(Departamento::class, 'departamento_consumible', 'consumible_id', 'departamento_id')
            ->withPivot('cantidad_solicitada')
            ->withTimestamps();
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(InvCategoria::class, 'categoria_id');
    }

    /**
     * Solicitudes que incluyen este consumible
     */
    public function solicitudes(): BelongsToMany
    {
        return $this->belongsToMany(SolicitudConsumible::class, 'departamento_consumible', 'consumible_id', 'solicitud_id')
            ->withPivot('cantidad_solicitada')
            ->withTimestamps();
    }

    public function agregarStock($cantidad): void
    {
        $this->stock += $cantidad;
        $this->actualizarEstadoActivo();
        $this->save();
    }

    public function reducirStock(int $cantidad): bool
    {
        // Verifica que la cantidad a reducir no deje el stock en negativo
        if ($this->stock >= $cantidad) {
            $this->stock -= $cantidad;
            $this->actualizarEstadoActivo();
            $this->save();
            return true;
        }

        return false; // Retorna false si no es posible reducir el stock
    }

    protected function actualizarEstadoActivo(): void
    {
        // Si el stock es 0, desactiva la categoría; de lo contrario, la activa
        $this->activo = $this->stock > 0;
    }

    function scopeByCategoriaId(Builder $query, $categoria_id)
    {
        if ($categoria_id) {
            return $query->where('invc.categoria_id', $categoria_id);
        }
    }
}
