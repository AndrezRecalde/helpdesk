<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingreso extends Model
{
    use HasFactory;

    protected $table = 'ingreso';
    protected $primaryKey = 'cnsctvo_rta';

    protected $casts = [
        'fcha_elbrcion' =>  'datetime',
        'fcha_rcpcion'  =>  'datetime',
        'fcha_estdo'    =>  'datetime',
    ];
}
