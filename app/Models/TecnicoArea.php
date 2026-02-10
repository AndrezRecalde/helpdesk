<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TecnicoArea extends Model
{
    use HasFactory;

    protected $table = 'sop_tecnico_areas';

    protected $fillable = [
        'tecnico_id',
        'area_tic_id',
        'principal',
        'activo'
    ];

    protected $casts = [
        'principal' => 'boolean',
        'activo' => 'boolean',
    ];

    /**
     * Relación con User (técnico)
     */
    public function tecnico(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tecnico_id', 'cdgo_usrio');
    }

    /**
     * Relación con AreaTic
     */
    public function areaTic(): BelongsTo
    {
        return $this->belongsTo(AreaTic::class, 'area_tic_id', 'id_areas_tic');
    }

    /**
     * Scope para obtener solo relaciones activas
     */
    public function scopeActivo($query, $activo = true)
    {
        return $query->where('activo', $activo);
    }

    /**
     * Scope para obtener áreas principales
     */
    public function scopePrincipal($query, $principal = true)
    {
        return $query->where('principal', $principal);
    }
}
