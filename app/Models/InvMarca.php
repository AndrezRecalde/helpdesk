<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvMarca extends Model
{
    use HasFactory;

    protected $table = 'inv_marcas';

    protected $fillable = [
        'nombre_marca'
    ];

    function equipos(): HasMany
    {
        return $this->hasMany(InvEquipo::class, 'marca_id');
    }
}
