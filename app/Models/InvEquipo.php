<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class InvEquipo extends Model
{
    use HasFactory;

    protected $table = 'inv_equipos';

    protected $fillable = [
        'modelo',
        'numero_serie',
        'codigo_antiguo',
        'codigo_nuevo',
        'fecha_adquisicion',
        'fecha_baja',
        'vida_util',
        'descripcion',
        'bien_adquirido',
        'bien_donado',
        'bien_usado',
        'ubicacion_id',
        'categoria_id',
        'estado_id',
        'marca_id',
        'user_id', //Se agrega usuario custodio
        'direccion_id'
    ];

    protected $casts = [
        'bien_adquirido' => 'boolean',
        'bien_donado' => 'boolean',
        'bien_usado' => 'boolean',
        'fecha_adquisicion' => 'date',
        //'fecha_amortizacion' => 'date',
        'fecha_baja'        => 'date'
    ];

    function usuarios(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'usuario_equipo', 'equipo_id', 'usuario_id')
            ->withPivot('id', 'direccion_id', 'concepto_id', 'observacion')
            ->join('dprtmntos', 'usuario_equipo.direccion_id', '=', 'dprtmntos.cdgo_dprtmnto')
            ->join('inv_conceptos', 'usuario_equipo.concepto_id', '=', 'inv_conceptos.id')
            ->select(
                'usuario_equipo.id',
                'usrios_sstma.cdgo_usrio as user_id',
                'usrios_sstma.nmbre_usrio as responsable',
                'dprtmntos.cdgo_dprtmnto as direccion_id',
                'dprtmntos.nmbre_dprtmnto as direccion',
                'inv_conceptos.id as concepto_id',
                'inv_conceptos.nombre_concepto as concepto_nombre',
                'usuario_equipo.observacion'
            )->orderBy('usuario_equipo.id', 'DESC');
    }

    /* function departamentos(): BelongsToMany
    {
        return $this->belongsToMany(Departamento::class, 'departamento_equipo', 'equipo_id', 'cdgo_dprtmnto');
    } */

    /* public function perifericos(): HasMany
    {
        return $this->hasMany(InvPeriferico::class, 'equipo_id');
    } */

    function ubicacion(): BelongsTo
    {
        return $this->belongsTo(InvUbicacion::class, 'ubicacion_id');
    }

    function categoria(): BelongsTo
    {
        return $this->belongsTo(InvMarca::class, 'categoria_id');
    }

    function estado(): BelongsTo
    {
        return $this->belongsTo(InvEstado::class, 'estado_id');
    }

    function marca(): BelongsTo
    {
        return $this->belongsTo(InvMarca::class, 'marca_id');
    }

    function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'cdgo_usrio');
    }

    function direccion(): BelongsTo
    {
        return $this->belongsTo(Departamento::class, 'direccion_id', 'cdgo_dprtmnto');
    }

    function documentos(): HasMany
    {
        return $this->hasMany(InvDocumentoEquipo::class, 'equipo_id');
    }

    /* function scopeCodigoAntiguo(Builder $query, $codigo_antiguo)
    {
        if ($codigo_antiguo) {
            return $query->where('inve.codigo_antiguo', $codigo_antiguo);
        }
    }

    function scopeCodigoNuevo(Builder $query, $codigo_nuevo)
    {
        if ($codigo_nuevo) {
            return $query->where('inve.codigo_nuevo', $codigo_nuevo);
        }
    } */

    function scopeByEstadoId(Builder $query, $estado_id)
    {
        if ($estado_id) {
            return $query->where('inve.estado_id', $estado_id);
        }
    }

    function scopeByCategoriaId(Builder $query, $categoria_id)
    {
        if ($categoria_id) {
            return $query->where('inve.categoria_id', $categoria_id);
        }
    }

    function scopeBuscarPorCodigo(Builder $query, $codigo)
    {
        if ($codigo) {
            return $query->where('inve.codigo_antiguo', 'LIKE', "%{$codigo}%")
                ->orWhere('inve.codigo_nuevo', 'LIKE', "%{$codigo}%");
        }
    }

    function scopeByNumeroSerie(Builder $query, $numero_serie)
    {
        if ($numero_serie) {
            return $query->where('inve.numero_serie', 'LIKE', "%{$numero_serie}%");
        }
    }

    function scopeByUsuarioId(Builder $query, $user_id)
    {
        if ($user_id) {
            return $query->where('inve.user_id', $user_id);
        }
    }

    public function scopeByUserId(Builder $query, $userId)
    {
        if ($userId) {
            return $query->where('user_id', $userId);
        }
    }

    function scopeByDireccion(Builder $query, $direccion_id)
    {
        if ($direccion_id) {
            return $query->where('direccion_id', $direccion_id);
        }
    }

    function scopeByDireccionId(Builder $query, $direccion_id)
    {
        if ($direccion_id) {
            return $query->where('inve.direccion_id', $direccion_id);
        }
    }

    //TODO: POR EL MOMENTO NO SE UTILIZA - CONSULTA PARA MOSTRAR LOS EQUIPOS A LAS PERSONAS QUE EL CUSTODIO PRESTA A OTROS USUARIOS
    /* public function scopeByHistorialUsuarioId(Builder $query, $usuario_id)
    {
        if ($usuario_id) {
            return $query->whereExists(function ($subquery) use ($usuario_id) {
                $subquery->select(DB::raw(1))
                    ->from('usuario_equipo as ue')
                    ->join('usrios_sstma as u', 'u.cdgo_usrio', '=', 'ue.usuario_id') // Relación con usuarios
                    ->whereColumn('ue.equipo_id', 'inve.id') // Usar el alias "inve"
                    ->where('ue.usuario_id', $usuario_id); // Filtrar por direccion_id
            });
        }
    } */

    //TODO: POR EL MOMENTO NO SE UTILIZA - CONSULTA PARA MOSTRAR LOS EQUIPOS EN EL DEPARTAMENTO DEL USUARIO QUE LOS TIENE PRESTADO
    /* public function scopeByDireccionId(Builder $query, $direccion_id)
    {
        if ($direccion_id) {
            return $query->whereExists(function ($subquery) use ($direccion_id) {
                $subquery->select(DB::raw(1))
                    ->from('usuario_equipo as ue')
                    ->join('dprtmntos as d', 'd.cdgo_dprtmnto', '=', 'ue.direccion_id') // Relación con usuarios
                    ->whereColumn('ue.equipo_id', 'inve.id') // Usar el alias "inve"
                    ->where('ue.direccion_id', $direccion_id); // Filtrar por direccion_id
            });
        }
    } */

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($equipo) {
            $equipo->usuarios()->detach();
        });
    }
}
