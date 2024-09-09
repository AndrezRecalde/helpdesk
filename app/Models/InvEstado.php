<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvEstado extends Model
{
    use HasFactory;

    protected $table = 'inv_estados';

    protected $fillable = [
        'nombre_estado',
        'color'
    ];

    function equipos(): HasMany
    {
        return $this->hasMany(InvEquipo::class, 'equipo_id');
    }
}
