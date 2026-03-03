<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoporteLicenciaEquipo extends Model
{
    use HasFactory;

    protected $table = 'sop_licencias_equipos';

    protected $fillable = [
        'id_soporte',
        'id_equipo',
        'id_licencia',
        'fecha_instalacion'
    ];

    protected $casts = [
        'fecha_instalacion' => 'date',
    ];

    public function soporte()
    {
        return $this->belongsTo(Soporte::class, 'id_soporte', 'id_sop');
    }

    public function equipo()
    {
        return $this->belongsTo(InvEquipo::class, 'id_equipo', 'id');
    }

    public function licencia()
    {
        return $this->belongsTo(SoporteLicencia::class, 'id_licencia', 'id_licencia');
    }
}
