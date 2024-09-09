<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvTipocategoria extends Model
{
    use HasFactory;

    protected $table = 'inv_tipocategorias';

    protected $fillable = [
        'nombre_tipocategoria'
    ];

    function categorias(): HasMany
    {
        return $this->hasMany(InvCategoria::class, 'tipocategoria_id');
    }
}
