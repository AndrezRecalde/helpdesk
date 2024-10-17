<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvPeriferico extends Model
{
    use HasFactory;

    protected $table = 'inv_perifericos';

    protected $fillable = [
        'nombre_periferico',
        'marca_id',
        'modelo',
        'numero_serie',
        'fecha_adquisicion',
        'es_adquirido',
        'es_donado',
        'es_usado',
        'equipo_id',
    ];

    public function equipo()
    {
        return $this->belongsTo(InvEquipo::class, 'equipo_id');
    }
}
