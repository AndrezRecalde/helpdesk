<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\General\ActividadController;
use App\Http\Controllers\General\DiagnosticoController;
use App\Http\Controllers\General\DireccionController;
use App\Http\Controllers\General\EquipoController;
use App\Http\Controllers\General\EstadoSoporteController;
use App\Http\Controllers\General\MarcacionController;
use App\Http\Controllers\General\PisoController;
use App\Http\Controllers\General\SoporteController;
use App\Http\Controllers\General\STipoEquipoController;
use App\Http\Controllers\General\UserController;
use App\Http\Controllers\Gerente\CargoController;
use App\Http\Controllers\Gerente\DashGerenteController;
use App\Http\Controllers\Gerente\DireccionAdminController;
use App\Http\Controllers\Gerente\EmpresaController;
use App\Http\Controllers\Gerente\Inventario\InvCategoriaController;
use App\Http\Controllers\Gerente\Inventario\InvEquipoController;
use App\Http\Controllers\Gerente\Inventario\InvEstadoController;
use App\Http\Controllers\Gerente\Inventario\InvMarcaController;
use App\Http\Controllers\Gerente\Inventario\InvTipoCategoriaController;
use App\Http\Controllers\Gerente\Inventario\InvUbicacionController;
use App\Http\Controllers\Gerente\PermisosAdminController;
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
Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('/change-password/{cdgo_usrio}', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');


/* RUTAS: GERENTE */

Route::group(['prefix' => 'gerencia', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/admin/usuarios', [UserAdminController::class, 'getUsuariosAdmin']);
    Route::post('/store/usuario', [UserAdminController::class, 'store']);
    Route::put('/update/usuario/{cdgo_usrio}', [UserAdminController::class, 'update']);
    Route::put('/update/usuario/activo/{cdgo_usrio}', [UserAdminController::class, 'updateActivoUser']);
    Route::post('/verified/usuario', [UserAdminController::class, 'verifiedUser']);
    Route::put('/usuario/reset-password/{cdgo_usrio}', [UserAdminController::class, 'resetPasword']);
    Route::post('/admin/show-user', [UserAdminController::class, 'findUser']);


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
    Route::post('/reporte-indicador-pdf', [SoporteAdminController::class, 'exportPDFIndicadores']); //TODO
    Route::get('/soportes-sin-calificar', [SoporteAdminController::class, 'getSoportesSinCalificacion']);
    Route::post('/calificacion', [SoporteAdminController::class, 'setCalificacionSoportes']);


    /*DASHBOARD */
    Route::get('/dashboard', [DashGerenteController::class, 'getDashboardGerencia']);
    Route::get('/desempeno-tecnicos-anual', [DashGerenteController::class, 'getDesempenoForTecnicosAnual']);


    /* INVENTARIO */
    /* TIPOS CATEGORIAS */
    Route::get('/inventario/tipos-categorias', [InvTipoCategoriaController::class, 'getTiposCategorias']);
    Route::post('/inventario/tipo-categoria/store', [InvTipoCategoriaController::class, 'store']);
    Route::put('/inventario/tipo-categoria/update/{id}', [InvTipoCategoriaController::class, 'update']);
    Route::delete('/inventario/tipo-categoria/destroy/{id}', [InvTipoCategoriaController::class, 'destroy']);

    /* CATEGORIAS */
    Route::post('/inventario/categorias', [InvCategoriaController::class, 'getCategorias']);
    Route::post('/inventario/categoria/store', [InvCategoriaController::class, 'store']);
    Route::put('/inventario/categoria/update/{id}', [InvCategoriaController::class, 'update']);
    Route::delete('/inventario/categoria/destroy/{id}', [InvCategoriaController::class, 'update']);

    /* ESTADOS */
    Route::get('/inventario/estados', [InvEstadoController::class, 'getEstadosInv']);
    Route::post('/inventario/estado/store', [InvEstadoController::class, 'store']);
    Route::put('/inventario/estado/update/{id}', [InvEstadoController::class, 'update']);
    Route::delete('/inventario/estado/destroy/{id}', [InvEstadoController::class, 'destroy']);

    /* MARCAS  */
    Route::get('/inventario/marcas', [InvMarcaController::class, 'getMarcasInv']);
    Route::post('/inventario/marca/store', [InvMarcaController::class, 'store']);
    Route::put('/inventario/marca/update/{id}', [InvMarcaController::class, 'update']);
    Route::delete('/inventario/marca/destroy/{id}', [InvMarcaController::class, 'destroy']);

    /* UBICACIONES */
    Route::get('/inventario/ubicaciones', [InvUbicacionController::class, 'getUbicacionesInv']);
    Route::post('/inventario/ubicacion/store', [InvUbicacionController::class, 'store']);
    Route::put('/inventario/ubicacion/update/{id}', [InvUbicacionController::class, 'update']);
    Route::delete('/inventario/ubicacion/destroy/{id}', [InvUbicacionController::class, 'destroy']);

    /* EQUIPOS */
    Route::post('/inventario/equipos', [InvEquipoController::class, 'getEquiposInv']);
    Route::post('/inventario/equipo/store', [InvEquipoController::class, 'store']);
    Route::put('/inventario/equipo/update/{id}', [InvEquipoController::class, 'update']);
    Route::delete('/inventario/equipo/destroy/{id}', [InvEquipoController::class, 'destroy']);
    Route::put('/inventario/asignar/{id}', [InvEquipoController::class, 'assignResponsable']);
    Route::delete('/equipo/{equipo_id}/usuario/{user_id}', [InvEquipoController::class, 'removeUserFromEquipo']);



});

/* RUTAS: GERENTE O TECNICO */
Route::group(['prefix' => 'general', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/usuarios', [UserController::class, 'getUsuarios']);
    Route::post('/usuarios-extrict', [UserController::class, 'getUsuariosExtrict']);

    /* TECNICOS */
    Route::post('/tecnicos', [TecnicoController::class, 'getTecnicos']);
    Route::post("/info-soportes", [TecnicoController::class, 'getInfoTecnicosSoportes']);

    /* DIRECCIONES */
    Route::get('/direcciones', [DireccionController::class, 'getDirecciones']);

    /* SOPORTES */
    Route::post('/soportes-actuales', [SoporteController::class, 'getSoportesActuales']);
    Route::post('/buscar-soportes', [SoporteController::class, 'searchSoportes']);
    Route::post('/crear-soporte', [SoporteController::class, 'createSoporte']);
    Route::put('/diagnosticar-soporte/{id_sop}', [SoporteController::class, 'diagnosticarSoporte']);
    Route::post('/reporte-actividades', [SoporteController::class, 'getActividadesSoportes']);
    Route::post('/reporte-soporte-pdf', [SoporteController::class, 'exportPDFCardSoporte']);
    Route::post('/reporte-actividades-pdf', [SoporteController::class, 'exportActividadesSoportes']);


    /* TIPOS DE SOLICITUDES DE SOPORTE */
    Route::get('/tipos-solicitudes', [TipoSolicitudController::class, 'getTiposSolicitudesSoporte']);

    /* TIPOS DE DIAGNOSTICOS */
    Route::get("/diagnosticos", [DiagnosticoController::class, 'getDiagnosticos']);

    /* ESTADOS DE SOPORTES */
    Route::get("/estados-soportes", [EstadoSoporteController::class, 'getEstadosSoportes']);


    /* EQUIPOS */
    Route::get("/equipos", [EquipoController::class, 'getEquiposInformaticos']);

    /* PERMISOS */
    Route::post('/permiso-pdf', [PermisosAdminController::class, 'exportPDFPermiso']);
    Route::post('/crear-permiso', [PermisosAdminController::class, 'store']);
    Route::post('/permisos', [PermisosAdminController::class, 'getPermisosAdmin']);
    Route::put('/anular-permiso/{idper_permisos}', [PermisosAdminController::class, 'anularPermisos']);
    Route::post('/export-permiso-pdf', [PermisosAdminController::class, 'exportCardPDFPermiso']);
});


/* RUTAS USUARIO */
Route::group(['prefix' => 'usuario', 'middleware' => ['auth:sanctum']], function () {
    /* SOLICIUTD DE SOPORTE */
    Route::post('/enviar-solicitud', [SoporteController::class, 'enviarSolicitud']);

    /* INFO DE LOS SOPORTES PERFIL */
    Route::post("/info-soportes", [UserController::class, 'getInfoUsersSoportes']);

    /* ACTIVIDADES */
    Route::post('/listar-actividades', [ActividadController::class, 'getActivForUserForDates']);
    Route::post('/create/actividad', [ActividadController::class, 'store']);
    Route::put('/update/actividad/{id}', [ActividadController::class, 'update']);
    Route::post('/export/pdf/actividades', [ActividadController::class, 'exportPDFActividadesForUser']);

    /* SOPORTES */
    Route::post('/soportes-actuales', [SoporteController::class, 'getSoportesActualesForUser']);
    Route::post('/soportes-anuales', [SoporteController::class, 'getSoportesAnualesForUser']);
    Route::post('/soportes-atendidos', [SoporteController::class, 'getSoportesAtendidosForUsuario']);
    Route::put('/cierre-soporte/{id_sop}', [SoporteController::class, 'cierreSoporteForUsuario']);


    /* MARCACIONES */
    Route::post('/marcaciones', [MarcacionController::class, 'getMarcaciones']);
});
