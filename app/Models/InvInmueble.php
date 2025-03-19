<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvInmueble extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_inmueble'
    ];
}
