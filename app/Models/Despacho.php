<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despacho extends Model
{
    use HasFactory;

    protected $table = 'despacho';
    protected $primaryKey = 'cnsctvo_dspcho';

    protected $fillable = [
        'cnsctvo_rta',
        'nmro_item',
        'fcha_dspcho',
        'envdo_a',
        'cdgo_accion',
        'dscrpcion_accion',
        'fcha_rspsta',
        'ofcio_rspsta',
        'dscrpcion_rspsta',
        'cdgo_usrio',
        'rspnddo',
        'nmro_ofcio',
    ];

    protected $casts = [
        'fcha_dspcho' => 'datetime',
        'fcha_rspsta' => 'datetime',
    ];
}
