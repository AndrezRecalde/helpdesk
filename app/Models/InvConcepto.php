<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvConcepto extends Model
{
    use HasFactory;

    protected $table = 'inv_conceptos';

    protected $fillable = [
        'nombre_concepto'
    ];

}
