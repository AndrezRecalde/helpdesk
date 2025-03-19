<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvBaja extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipo_id',
        'tecnico_id',
        'fecha_baja',
        'numero_memorando',
        'estado_id'
    ];

    protected $casts = [
        'fecha_baja'        => 'date'
    ];
}
