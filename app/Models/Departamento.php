<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $table = "dprtmntos";
    protected $primaryKey = "cdgo_dprtmnto";


    function scopeEmpresa($query, $id_empresa)
    {
        if ($id_empresa) {
            return $query->where("d.id_empresa", $id_empresa);
        }
    }
}
