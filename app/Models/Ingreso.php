<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ingreso extends Model
{
    use HasFactory;

    protected $table = 'ingreso';
    protected $primaryKey = 'cnsctvo_rta';

    protected $fillable = [
        'cnsctvo_rta',
        'nmro_ofcio',
        'fcha_elbrcion',
        'fcha_rcpcion',
        'doc_de_externo',
        'rmtnte',
        'doc_de',
        'doc_para_externo',
        'dstntrio',
        'doc_para',
        'asnto',
        'indctvo_estdo',
        'fcha_estdo',
        'cdgo_usrio',
        'id_envio',
        'tipo_doc_id',
        'subtipo_doc_id',
        'ingreso_documental',
        'iddoc'
    ];

    protected $casts = [
        'fcha_elbrcion' =>  'datetime',
        'fcha_rcpcion'  =>  'datetime',
        'fcha_estdo'    =>  'datetime',
    ];

    function despachos(): HasMany
    {
        return $this->hasMany(Despacho::class, 'cnsctvo_rta', 'cnsctvo_rta');
    }

    function scopeByNumeroRuta(Builder $query, $numero_ruta)
    {
        if ($numero_ruta) {
            return $query->where('ing.cnsctvo_rta', $numero_ruta);
        }
    }

    function scopeByNumeroOficio(Builder $query, $numero_oficio)
    {
        if ($numero_oficio) {
            return $query->where('ing.nmro_ofcio', $numero_oficio);
        }
    }

    function scopeByFechaElaboracion(Builder $query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('ing.fcha_elbrcion', [$fecha_inicio, $fecha_fin]);
        }
    }

    function scopeByFechaRecepcion(Builder $query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('ing.fcha_rcpcion', [$fecha_inicio, $fecha_fin]);
        }
    }

    function scopeByClientes(Builder $query, $cliente)
    {
        if ($cliente) {
            return $query->where('clr', 'LIKE', "%{$cliente}%");
        }
    }

    function scopeByAsunto(Builder $query, $asunto)
    {
        if ($asunto) {
            return $query->where('ing.asnto', $asunto);
        }
    }
}
