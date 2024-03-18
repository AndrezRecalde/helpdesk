<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\General\ActividadController;
use App\Http\Controllers\General\DiagnosticoController;
use App\Http\Controllers\General\DireccionController;
use App\Http\Controllers\General\EquipoController;
use App\Http\Controllers\General\EstadoSoporteController;
use App\Http\Controllers\General\SoporteController;
use App\Http\Controllers\General\UserController;
use App\Http\Controllers\Gerente\CargoController;
use App\Http\Controllers\Gerente\DashGerenteController;
use App\Http\Controllers\Gerente\DireccionAdminController;
use App\Http\Controllers\Gerente\EmpresaController;
use App\Http\Controllers\Gerente\SexoController;
use App\Http\Controllers\Gerente\SoporteAdminController;
use App\Http\Controllers\Gerente\TecnicoController;
use App\Http\Controllers\Gerente\TipoContratoController;
use App\Http\Controllers\Gerente\TipoSolicitudController;
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
    Route::put('/update/usuario/activo/{cdgo_usrio}', [UserAdminController::class, 'updateActivoUser']);
    Route::post('/verified/usuario', [UserAdminController::class, 'verifiedUser']);
    Route::put('/usuario/reset-password/{cdgo_usrio}', [UserAdminController::class, 'resetPasword']);




    /* TECNICOS */
    Route::post('/admin/tecnicos', [TecnicoController::class, 'getTecnicosAdmin']);
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
    Route::post('/soportes-anulados', [SoporteAdminController::class, 'getSoporteAnulados']);
    Route::post('/crear-solicitud', [SoporteAdminController::class, 'crearSolicitudAdmin']);
    Route::put('/actualizar-soporte/{id_sop}', [SoporteAdminController::class, 'updateSoporte']);
    Route::post('/indicador-soporte', [SoporteAdminController::class, 'getIndicadoresSoportes']);
    Route::post('/reporte-indicador', [SoporteAdminController::class, 'exportPDFIndicadores']);

    /*DASHBOARD */
    Route::get('/dashboard', [DashGerenteController::class, 'getDashboardGerencia']);


});

/* RUTAS: GERENTE O TECNICO */
Route::group(['prefix' => 'general', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/usuarios', [UserController::class, 'getUsuarios']);
    Route::post('/usuarios-extrict', [UserController::class, 'getUsuariosExtrict']);

    /* TECNICOS */
    Route::post('/tecnicos', [TecnicoController::class, 'getTecnicos']);


    /* DIRECCIONES */
    Route::get('/direcciones', [DireccionController::class, 'getDirecciones']);

    /* SOPORTES */
    Route::post('/soportes-actuales', [SoporteController::class, 'getSoportesActuales']);
    Route::post('/buscar-soportes', [SoporteController::class, 'searchSoportes']);
    Route::post('/crear-soporte', [SoporteController::class, 'createSoporte']);
    Route::put('/diagnosticar-soporte/{id_sop}', [SoporteController::class, 'diagnosticarSoporte']);
    Route::post('/reporte-soporte', [SoporteController::class, 'exportPDFCardSoporte']);
    Route::post('/reporte-actividades', [SoporteController::class, 'exportActividadesSoportes']);



    /* TIPOS DE SOLICITUDES DE SOPORTE */
    Route::get('/tipos-solicitudes', [TipoSolicitudController::class, 'getTiposSolicitudesSoporte']);

    /* TIPOS DE DIAGNOSTICOS */
    Route::get("/diagnosticos", [DiagnosticoController::class, 'getDiagnosticos']);

    /* ESTADOS DE SOPORTES */
    Route::get("/estados-soportes", [EstadoSoporteController::class, 'getEstadosSoportes']);


    /* EQUIPOS */
    Route::get("/equipos", [EquipoController::class, 'getEquiposInformaticos']);
});


/* RUTAS USUARIO */
Route::group(['prefix' => 'usuario', 'middleware' => ['auth:sanctum']], function () {
    /* SOLICIUTD DE SOPORTE */
    Route::post('/enviar-solicitud', [SoporteController::class, 'enviarSolicitud']);

    /* ACTIVIDADES */
    Route::post('/listar-actividades', [ActividadController::class, 'getActivForUserForDates']);
    Route::post('/create/actividad', [ActividadController::class, 'store']);
    Route::put('/update/actividad/{id}', [ActividadController::class, 'update']);
    Route::post('/export/pdf/actividades', [ActividadController::class, 'exportPDFActividadesForUser']);
});
