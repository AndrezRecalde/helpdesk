<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SrvActImagen extends Model
{
    use HasFactory;

    protected $table = 'srv_act_imagenes';

    protected $fillable = [
        'actividad_id',
        'ruta_imagen',
    ];

    public function actividad()
    {
        return $this->belongsTo(Actividad::class, 'actividad_id', 'id');
    }
}
