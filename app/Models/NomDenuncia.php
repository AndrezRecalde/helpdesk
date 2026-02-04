<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Crypt;

class NomDenuncia extends Model
{
    use HasFactory;
    protected $table = 'nom_denuncias';

    protected $fillable = [
        'numero_denuncia',
        'usuario_id_encrypted',
        'mostrar_informacion',
        'tipo_denuncia',
        'descripcion',
        'estado',
        'respuesta',
        'fecha_respuesta',
        'respondido_por',
    ];

    protected $casts = [
        'mostrar_informacion' => 'boolean',
        'fecha_respuesta' => 'datetime',
    ];

    // Relación con el usuario que creó la denuncia
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usuario_id_encrypted', 'cdgo_usrio');
    }

    // Relación con el usuario que respondió la denuncia
    public function respondidoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'respondido_por', 'cdgo_usrio');
    }

    // Relación con archivos adjuntos
    public function archivos(): HasMany
    {
        return $this->hasMany(NomDenunciaArchivo::class, 'denuncia_id');
    }

    // Accessor para obtener el usuario_id desencriptado
    public function getUsuarioIdAttribute()
    {
        try {
            return Crypt::decryptString($this->usuario_id_encrypted);
        } catch (\Exception $e) {
            return null;
        }
    }

    // Mutator para encriptar el usuario_id
    public function setUsuarioIdAttribute($value)
    {
        $this->attributes['usuario_id_encrypted'] = Crypt::encryptString($value);
    }

    // Scope para consultar denuncias por usuario_id
    // NOTA: Este scope no funciona correctamente debido a que cada encriptación genera un valor diferente
    // Se debe usar el filtrado manual en el controlador
    public function scopeByUsuarioId(Builder $query, int $usuario_id)
    {
        return $query->where('usuario_id_encrypted', Crypt::encryptString($usuario_id));
    }

    // Scope para filtrar por estado
    public function scopeByEstado(Builder $query, string $estado)
    {
        if ($estado) {
            return $query->where('estado', $estado);
        }
        return $query;
    }

    // Scope para filtrar por tipo de denuncia
    public function scopeByTipo(Builder $query, string $tipo)
    {
        if ($tipo) {
            return $query->where('tipo_denuncia', $tipo);
        }
        return $query;
    }

    // Scope para filtrar por rango de fechas
    public function scopeByFechas(Builder $query, $fecha_desde, $fecha_hasta)
    {
        if ($fecha_desde) {
            $query->whereDate('created_at', '>=', $fecha_desde);
        }
        if ($fecha_hasta) {
            $query->whereDate('created_at', '<=', $fecha_hasta);
        }
        return $query;
    }

    // Helper para verificar si debe mostrar información del usuario
    public function debeOcultarUsuario(): bool
    {
        return !$this->mostrar_informacion;
    }

    // Helper para obtener información del usuario (respetando privacidad)
    public function getInfoUsuario()
    {
        if ($this->debeOcultarUsuario()) {
            return [
                'nombre' => 'Anónimo',
                'email' => 'Oculto',
                'departamento' => 'Oculto',
            ];
        }

        $usuario = User::find($this->usuario_id);
        if (!$usuario) {
            return [
                'nombre' => 'Usuario no encontrado',
                'email' => 'N/A',
                'departamento' => 'N/A',
            ];
        }

        return [
            'nombre' => $usuario->nmbre_usrio,
            'email' => $usuario->email,
            'departamento' => $usuario->departamento->nmbre_dprtmnto ?? 'N/A',
        ];
    }
}

