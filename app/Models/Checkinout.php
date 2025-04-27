<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkinout extends Model
{
    use HasFactory;

    protected $connection = 'sqlsrv'; // Indica que use SQL Server
    protected $table = 'CHECKINOUT'; // Nombre exacto de la tabla

    // Si no tienes campos 'created_at' y 'updated_at' en esa tabla:
    public $timestamps = false;

    // Opcionalmente, puedes especificar la primary key si no es 'id'
    protected $primaryKey = 'ID'; // Cámbialo si es necesario

    protected $fillable = [
        'USERID',
        'CHECKTIME',
        'CHECKTYPE',
        'VERIFYCODE',
        'SENSORID',
        'Memoinfo',
        'WorkCode',
        'sn',
        'UserExtFmt',
        'VERIFYAPPROVE',
        'GEOLT',
        'GEOLG',
        'MARCTYPE',
        'EDITADA',
    ];

    protected $casts = [
        'CHECKTIME' => 'datetime',
    ];
}
