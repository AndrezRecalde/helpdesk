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
        'modelo',
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

    function scopeByEquipoId(Builder $query, $equipo_id)
    {
        if ($equipo_id) {
            return $query->where('invper.equipo_id', $equipo_id);
        }
    }

    function scopeByNumeroSerie(Builder $query, $numero_serie)
    {
        if ($numero_serie) {
            return $query->where('invper.numero_serie', $numero_serie);
        }
    }

    function scopeByEstadoId(Builder $query, $estado_id)
    {
        if ($estado_id) {
            return $query->where('inveper.estado_id', $estado_id);
        }
    }
}
