<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvPeriferico extends Model
{
    use HasFactory;

    protected $table = 'inv_perifericos';

    protected $fillable = [
        //'nombre_periferico',
        'nombre_periferico',
        'marca_id',
        'categoria_id',
        'numero_serie',
        'fecha_adquisicion',
        'fecha_baja',
        'es_adquirido',
        'es_donado',
        'es_usado',
        'estado_id',
        'equipo_id',
    ];

    protected $casts = [
        'fecha_adquisicion' => 'date',
        'fecha_baja'        => 'date'
    ];

    /* public static function create(array $attributes = [])
    {
        $attributes['estado_id'] = 1;

        $periferico = static::query()->create($attributes);

        return $periferico;
    } */

    public function equipo()
    {
        return $this->belongsTo(InvEquipo::class, 'equipo_id');
    }

    public function categoria()
    {
        return $this->belongsTo(InvCategoria::class, 'categoria_id');
    }

    function scopeByCodigoEquipo(Builder $query, $codigo_equipo)
    {
        if ($codigo_equipo) {
            return $query->where('inve.codigo_nuevo', $codigo_equipo)
                         ->orWhereNull('inve.codigo_nuevo');
        }

        return $query; // Devuelve la consulta original si no hay $codigo_equipo
    }

    function scopeByNumeroSerie(Builder $query, $numero_serie)
    {
        if ($numero_serie) {
            return $query->where('invper.numero_serie', $numero_serie);
        }
    }

    function scopeByMarcaId(Builder $query, $marca_id)
    {
        if ($marca_id) {
            return $query->where('invper.marca_id', $marca_id);
        }
    }

    function scopeByEstadoId(Builder $query, $estado_id)
    {
        if ($estado_id) {
            return $query->where('inveper.estado_id', $estado_id);
        }
    }
}
