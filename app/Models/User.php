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
    public $timestamps = false;

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
        'email',
        'sexo',
        'lgin',
        'actvo',

        'usu_id_empresa',
        'cdgo_direccion',
        'crgo_id',
        'id_tipo_usuario',
        'usu_ult_tipo_contrato',
        'finaliza_contrato',
        'usu_f_f_contrato',

        'tecnico',
        'secretaria_tic',
        'super_user',
        'interno',
        'usu_estado',
        'usu_alias',
        'usu_ing',

        'usu_id_sub_empresa',
        'cdgo_dprtmnto',
        'paswrd',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'paswrd',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        //'paswrd' => 'string',
    ];

    static function create(array $attributes = []): object
    {
        $attributes['paswrd'] = md5("1234");

        $usuario = static::query()->create($attributes);

        return $usuario;
    }

    public function setPaswrdAttribute($paswrd)
    {
        return $this->attributes['paswrd'] = md5($paswrd) ? md5($paswrd) : $paswrd;
    }

    function scopeDireccion($query, $cdgo_direccion)
    {
        if ($cdgo_direccion !== null) {
            return $query->where('us.cdgo_direccion', $cdgo_direccion);
        }
    }

    function scopeNombres($query, $nmbre_usrio)
    {
        if ($nmbre_usrio) {
            return $query->where('us.nmbre_usrio', 'like', '%' . $nmbre_usrio . '%');
        }
    }

    function scopeUsuario($query, $lgin)
    {
        if ($lgin) {
            return $query->where('us.lgin', $lgin);
        }
    }

    function scopeCedula($query, $usu_ci)
    {
        if ($usu_ci) {
            return $query->where('us.usu_ci', $usu_ci);
        }
    }

    function scopeEmail($query, $email)
    {
        if ($email) {
            return $query->where('us.email', $email);
        }
    }

    function scopeTecnico($query, $cdgo_usrio)
    {
        if ($cdgo_usrio) {
            return $query->where('us.cdgo_usrio', $cdgo_usrio);
        }
    }
}
