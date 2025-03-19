<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function consumibles()
    {
        return $this->belongsToMany(InvConsumible::class, 'departamento_consumible', 'departamento_id', 'consumible_id')
            ->withPivot('cantidad_solicitada')
            ->withTimestamps();
    }

    public function jefe(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_jefe', 'cdgo_usrio');
    }

    function equipos(): BelongsToMany
    {
        return $this->belongsToMany(InvEquipo::class, 'departamento_equipo', 'cdgo_dprtmnto', 'equipo_id');
    }

    function scopeEmpresa($query, $id_empresa)
    {
        if ($id_empresa) {
            return $query->where("d.id_empresa", $id_empresa);
        }
    }

    function scopeDireccion($query, $cdgo_dprtmnto)
    {
        if ($cdgo_dprtmnto !== null) {
            return $query->where("d.cdgo_dprtmnto", $cdgo_dprtmnto);
        }
    }
}
