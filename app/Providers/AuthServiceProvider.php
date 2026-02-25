<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        /**
         * Super-admin: El rol GERENTE bypasea TODOS los permission checks.
         * Retornar null (en lugar de false) permite que los demás usuarios
         * sean evaluados normalmente por sus propios permisos.
         *
         * @see https://spatie.be/docs/laravel-permission/v6/basic-usage/super-admin
         */
        Gate::before(function ($user, $ability) {
            return $user->hasRole('GERENTE') ? true : null;
        });
    }
}
