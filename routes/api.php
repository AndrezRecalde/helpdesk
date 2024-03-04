<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\General\DireccionController;
use App\Http\Controllers\General\SoporteController;
use App\Http\Controllers\General\UserController;
use App\Http\Controllers\Gerente\CargoController;
use App\Http\Controllers\Gerente\DireccionAdminController;
use App\Http\Controllers\Gerente\EmpresaController;
use App\Http\Controllers\Gerente\SexoController;
use App\Http\Controllers\Gerente\SoporteAdminController;
use App\Http\Controllers\Gerente\TecnicoController;
use App\Http\Controllers\Gerente\TipoContratoController;
use App\Http\Controllers\Gerente\TipoUsuarioController;
use App\Http\Controllers\Gerente\UserAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/refresh', [AuthController::class, 'refresh'])->middleware('auth:sanctum');
Route::post('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

/* RUTAS: GERENTE */

Route::group(['prefix' => 'gerencia', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/admin/usuarios', [UserAdminController::class, 'getUsuariosAdmin']);
    Route::post('/store/usuario', [UserAdminController::class, 'store']);
    Route::put('/update/usuario/{cdgo_usrio}', [UserAdminController::class, 'update']);


    /* TECNICOS */
    Route::post('/admin/tecnicos', [TecnicoController::class, 'getTecnicosAdmin']);
    Route::post('/tecnicos', [TecnicoController::class, 'getTecnicos']);
    Route::put('/update/tecnico/{cdgo_usrio}', [TecnicoController::class, 'updateTecnico']);



    /* DEPARTAMENTOS Y DIRECCION */
    Route::post('/directores', [DireccionAdminController::class, 'getDirectores']);
    Route::post('/departamentos', [DireccionAdminController::class, 'getDepartamentos']);
    Route::put('/update/director/departamento/{cdgo_dprtmnto}', [DireccionAdminController::class, 'updateDirectores']);

    /*EMPRESAS */
    Route::get('/empresas', [EmpresaController::class, 'getEmpresas']);

    /* CARGOS */
    Route::get('/cargos', [CargoController::class, 'getCargos']);

    /* TIPO DE SEXO */
    Route::get('/sexo', [SexoController::class, 'getTipoSexo']);

    /* TIPOS USUARIOS */
    Route::get('/tipos-usuarios', [TipoUsuarioController::class, 'getTipoUsuarios']);

    /* TIPOS CONTRATO */
    Route::get('/tipos-contratos', [TipoContratoController::class, 'getTiposContratos']);

    /* SOPORTES */
    Route::put('/asignar-soporte/{id_sop}', [SoporteAdminController::class, 'asignarSoporte']);
    Route::put('/anular-soporte/{id_sop}', [SoporteAdminController::class, 'anularSoportes']);


});

/* RUTAS: GERENTE O TECNICO */
Route::group(['prefix' => 'general', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/usuarios', [UserController::class, 'getUsuarios']);

    /* DIRECCIONES */
    Route::get('/direcciones', [DireccionController::class, 'getDirecciones']);

    /* SOPORTES */
    Route::post('/soportes-actuales', [SoporteController::class, 'getSoportesActuales']);
});


/* RUTAS TECNICO */
