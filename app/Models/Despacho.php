<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despacho extends Model
{
    use HasFactory;

    protected $table = 'despacho';
    protected $primaryKey = 'cnsctvo_dspcho';

    protected $casts = [
        'fcha_dspcho' =>  'datetime',
        'fcha_rspsta'  =>  'datetime',
    ];
}
