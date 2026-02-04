<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class NomDenunciaArchivo extends Model
{
    use HasFactory;

    protected $table = 'nom_denuncia_archivos';

    protected $fillable = [
        'denuncia_id',
        'nombre_original',
        'nombre_almacenado',
        'ruta_archivo',
        'tipo_mime',
        'tamano',
    ];

    // Relación con la denuncia
    public function denuncia(): BelongsTo
    {
        return $this->belongsTo(NomDenuncia::class, 'denuncia_id');
    }

    // Obtener la ruta completa del archivo
    public function getFullPath(): string
    {
        return storage_path('app/' . $this->ruta_archivo);
    }

    // Verificar si el archivo existe
    public function exists(): bool
    {
        return Storage::exists($this->ruta_archivo);
    }

    // Eliminar el archivo físico
    public function deleteFile(): bool
    {
        if ($this->exists()) {
            return Storage::delete($this->ruta_archivo);
        }
        return false;
    }

    // Obtener el tamaño formateado
    public function getTamanoFormateadoAttribute(): string
    {
        $bytes = $this->tamano;
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        }
        return $bytes . ' bytes';
    }

    // Obtener la extensión del archivo
    public function getExtensionAttribute(): string
    {
        return pathinfo($this->nombre_original, PATHINFO_EXTENSION);
    }

    // Override delete para eliminar también el archivo físico
    public function delete()
    {
        $this->deleteFile();
        return parent::delete();
    }
}
