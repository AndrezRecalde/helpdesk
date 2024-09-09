<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvCategoria extends Model
{
    use HasFactory;

    protected $table = 'inv_categorias';

    protected $fillable = [
        'nombre_categoria',
        'tipocategoria_id',
        'activo'
    ];

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

    function scopeActivo(Builder $query, $activo)
    {
        if ($activo) {
            return $query->where('invc.activo', $activo);
        }
    }
}
