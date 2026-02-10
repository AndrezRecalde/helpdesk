<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AreaTic extends Model
{
    use HasFactory;

    protected $table = 'sop_areas_tic';
    protected $primaryKey = 'id_areas_tic';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    /**
     * Relación muchos a muchos con User (técnicos)
     * Un área puede tener muchos técnicos
     */
    public function tecnicos(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'sop_tecnico_areas',
            'area_tic_id',
            'tecnico_id',
            'id_areas_tic',
            'cdgo_usrio'
        )
            ->withPivot(['principal', 'activo'])
            ->withTimestamps();
    }

    /**
     * Obtener solo técnicos activos en esta área
     */
    public function tecnicosActivos(): BelongsToMany
    {
        return $this->tecnicos()->wherePivot('activo', true);
    }

    /**
     * Obtener el técnico principal de esta área
     */
    public function tecnicoPrincipal(): BelongsToMany
    {
        return $this->tecnicos()
            ->wherePivot('principal', true)
            ->wherePivot('activo', true);
    }

    /**
     * Relación con soportes
     */
    public function soportes(): HasMany
    {
        return $this->hasMany(Soporte::class, 'id_area_tic', 'id_areas_tic');
    }

    /**
     * Scope para obtener solo áreas activas
     */
    public function scopeActivo($query, $activo = true)
    {
        return $query->where('activo', $activo);
    }
}
