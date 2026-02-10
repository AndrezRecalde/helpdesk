<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Illuminate\Support\Facades\Hash;
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
        'usu_ape_pat',
        'usu_ape_mat',
        'usu_nombres',
        'nombre_formateado',
        'email',
        'sexo',
        'lgin',
        'actvo',
        'cdgo_lrgo',
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
        'asi_id_reloj',

        'usu_fi_institucion',

        'telegram_chat_id',
        'notificar_telegram',
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
        'usu_f_f_contrato' => 'date',
        'usu_fi_institucion' => 'date',
        'notificar_telegram' => 'boolean',
    ];


    public function isGerenteTic(): bool
    {
        return $this->hasRole('TIC_GERENTE');
    }

    public function isTecnicoTic(): bool
    {
        return $this->hasRole('TIC_TECNICO');
    }

    //Permisos
    public function permisos()
    {
        return $this->hasMany(Permiso::class, 'id_usu_pide', 'cdgo_usrio');
    }

    //Periodo Vacacional - HasMany
    public function periodoVacacionales(): HasMany
    {
        return $this->hasMany(NomPeriodoVacacional::class, 'cdgo_usrio', 'cdgo_usrio');
    }

    //Vacaciones - HasMany
    public function vacaciones(): HasMany
    {
        return $this->hasMany(NomVacacion::class, 'cdgo_usrio', 'cdgo_usrio');
    }

    function equipos(): BelongsToMany
    {
        return $this->belongsToMany(InvEquipo::class, 'usuario_equipo', 'usuario_id', 'equipo_id')
            ->withPivot('direccion_id', 'concepto_id');;
    }

    function denuncias(): HasMany
    {
        return $this->hasMany(NomDenuncia::class, 'usuario_id', 'cdgo_usrio');
    }


    public function areasTic(): BelongsToMany
    {
        return $this->belongsToMany(
            AreaTic::class,
            'sop_tecnico_areas',
            'tecnico_id',
            'area_tic_id',
            'cdgo_usrio',
            'id_areas_tic'
        )
            ->withPivot(['principal', 'activo'])
            ->withTimestamps();
    }

    public function areasTicActivas(): BelongsToMany
    {
        return $this->areasTic()->wherePivot('activo', true);
    }

    /**
     * Obtener el área principal del técnico
     */
    public function areaTicPrincipal(): BelongsToMany
    {
        return $this->areasTic()
            ->wherePivot('principal', true)
            ->wherePivot('activo', true);
    }

    /**
     * Soportes asignados como técnico
     */
    public function soportesAsignados(): HasMany
    {
        return $this->hasMany(Soporte::class, 'id_usu_tecnico_asig', 'cdgo_usrio');
    }

    /**
     * Verificar si el técnico tiene Telegram configurado
     */
    public function tieneTelegramConfigurado(): bool
    {
        return !empty($this->telegram_chat_id) && $this->notificar_telegram;
    }

    public function scopeTecnicosTic($query)
    {
        return $query->whereHas('roles', function ($q) {
            $q->where('name', 'TIC_TECNICO');
        });
    }

    /**
     * Scope para técnicos con Telegram configurado
     */
    public function scopeConTelegram($query)
    {
        return $query->where('notificar_telegram', true)
            ->whereNotNull('telegram_chat_id');
    }

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
        if ($cdgo_direccion !== null) { // Verifica explícitamente si no es nulo
            return $query->where('us.cdgo_direccion', $cdgo_direccion);
        }
        return $query; // Si es null, no aplica ningún filtro
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
            return $query->where('us.lgin', 'like', '%' . $lgin . '%');
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

    function scopeByCodigoUsuario($query, $cdgo_usrio)
    {
        if ($cdgo_usrio) {
            return $query->where('usrios_sstma.cdgo_usrio', $cdgo_usrio);
        }
    }
}
