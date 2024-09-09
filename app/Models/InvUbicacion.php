<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvUbicacion extends Model
{
    use HasFactory;

    protected $table = 'inv_ubicaciones';

    protected $fillable = [
        'nombre_edificio',
        'nombre_ubicacion'
    ];

    function equipos(): HasMany
    {
        return $this->hasMany(InvEquipo::class, 'ubicacion_id');
    }
}
