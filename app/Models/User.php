<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $table = "usrios_sstma";
    protected $primaryKey = 'cdgo_usrio';


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'usu_ci',
        'titulo',
        'nmbre_usrio',
        'nombre_formateado',
        'usu_id_empresa',
        'usu_id_sub_empresa',
        'crgo_id',
        'actvo',
        'lgin',
        'email',
        'cdgo_direccion',
        'cdgo_dprtmnto',
        'paswrd',
        'sexo',
        'tecnico',
        'secretaria_tic',
        'super_user',
        'interno',
        'finaliza_contrato',
        'usu_f_f_contrato',
        'usu_estado',
        'id_tipo_usuario',
        'usu_ult_tipo_contrato',
        'usu_alias',
        'usu_ing',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    static function create(array $attributes = []): object
    {
        $attributes['password'] = Hash::make(md5($attributes['dni']));

        $usuario = static::query()->create($attributes);

        return $usuario;
    }

    function scopeDireccion($query, $cdgo_direccion)
    {
        if ($cdgo_direccion) {
            return $query->where('us.cdgo_direccion', $cdgo_direccion);
        }
    }
}
