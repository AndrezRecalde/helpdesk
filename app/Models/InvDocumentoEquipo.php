<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvDocumentoEquipo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_documento',
        'documento',
        'equipo_id'
    ];

    function equipos(): BelongsTo
    {
        return $this->belongsTo(InvEquipo::class, 'equipo_id');
    }
}
