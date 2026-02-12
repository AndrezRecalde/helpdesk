<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudConsumible extends Model
{
    use HasFactory;

    protected $table = 'solicitudes_consumibles';

    protected $fillable = [
        'numero_solicitud',
        'departamento_id',
        'usuario_autoriza',
        'usuario_solicita',
        'observaciones',
        'director_area',
        'director_tic',
        'fecha_solicitud'
    ];

    /**
     * Relación con Departamento
     */
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'departamento_id', 'cdgo_dprtmnto');
    }

    /**
     * Usuario que autoriza la solicitud
     */
    public function usuarioAutoriza()
    {
        return $this->belongsTo(User::class, 'usuario_autoriza', 'cdgo_usrio');
    }

    /**
     * Usuario que solicita los consumibles
     */
    public function usuarioSolicita()
    {
        return $this->belongsTo(User::class, 'usuario_solicita', 'cdgo_usrio');
    }

    /**
     * Consumibles incluidos en esta solicitud
     */
    public function consumibles()
    {
        return $this->belongsToMany(InvConsumible::class, 'departamento_consumible', 'solicitud_id', 'consumible_id')
            ->withPivot('cantidad_solicitada')
            ->withTimestamps();
    }

    /**
     * Generar número de solicitud único
     */
    public static function generarNumeroSolicitud(): string
    {
        $year = date('Y');
        $lastSolicitud = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();

        $consecutivo = $lastSolicitud ? (int) substr($lastSolicitud->numero_solicitud, -4) + 1 : 1;

        return sprintf('SOL-%s-%04d', $year, $consecutivo);
    }
}
