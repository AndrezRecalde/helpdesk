<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $table = "dprtmntos";
    protected $primaryKey = "cdgo_dprtmnto";

    public $timestamps = false;

    protected $fillable = [
        "id_jefe",
        "id_encargado"
    ];

    function scopeEmpresa($query, $id_empresa)
    {
        if ($id_empresa) {
            return $query->where("d.id_empresa", $id_empresa);
        }
    }

    function scopeDireccion($query, $cdgo_dprtmnto)
    {
        if ($cdgo_dprtmnto != null) {
            return $query->where("d.cdgo_dprtmnto", $cdgo_dprtmnto);
        }
    }
}
