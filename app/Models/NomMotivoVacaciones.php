<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NomMotivoVacaciones extends Model
{
    use HasFactory;

    protected $table = 'nom_motivos_vacaciones';

    protected $fillable = [
        'motivo_vacaciones',
        'activo'
    ];
}
