<?php

use Laravel\Sanctum\Sanctum;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\General\ActividadController;
use App\Http\Controllers\General\DenunciaController;
use App\Http\Controllers\General\DiagnosticoController;
use App\Http\Controllers\General\DireccionController;
use App\Http\Controllers\General\EquipoController;
use App\Http\Controllers\General\EstadoSoporteController;
use App\Http\Controllers\General\MarcacionController;
use App\Http\Controllers\General\Ruta\RutaController;
//use App\Http\Controllers\General\PisoController;
use App\Http\Controllers\General\SoporteController;
//use App\Http\Controllers\General\STipoEquipoController;
use App\Http\Controllers\General\UserController;
use App\Http\Controllers\General\TelegramController;
use App\Http\Controllers\Gerente\AppController;
use App\Http\Controllers\Gerente\AreaTicController;
use App\Http\Controllers\Gerente\CargoController;
use App\Http\Controllers\Gerente\DashGerenteController;
use App\Http\Controllers\Gerente\DenunciaAdminController;
use App\Http\Controllers\Gerente\DireccionAdminController;
use App\Http\Controllers\Gerente\EmpresaController;
use App\Http\Controllers\Gerente\Inventario\InvBajaController;
use App\Http\Controllers\Gerente\Inventario\InvCategoriaController;
use App\Http\Controllers\Gerente\Inventario\InvConceptoController;
use App\Http\Controllers\Gerente\Inventario\InvConsumibleController;
use App\Http\Controllers\Gerente\Inventario\InvDocumentoController;
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
use App\Http\Controllers\Gerente\TTHH\NomPeriodoVacacionesController;
use App\Http\Controllers\Gerente\TTHH\NomVacacionesController;
use App\Http\Controllers\Gerente\TTHH\NomVacacionesDescuentoController;
use App\Http\Controllers\Gerente\UserAdminController;
//use App\Models\InvDocumentoEquipo;
//use Illuminate\Http\Request;
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

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

/* IMAGENES PREDEFINIDAS DEL SISTEMA */
Route::get('/app/imagenes', [AppController::class, 'getImagenesApp']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:sanctum');
Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('/change-password/{cdgo_usrio}', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');

Route::post('/consulta-tramite', [RutaController::class, 'getConsultaTramite']);

/* USUARIOS */
Route::post('/usuarios', [UserController::class, 'getUsuarios'])->middleware('auth:sanctum');

/* RUTAS: GERENTE */

Route::group(['prefix' => 'gerencia', 'middleware' => ['auth:sanctum', 'role:TIC_GERENTE']], function () {

    /* APLICACION */
    Route::put('/app/imagenes/update/{id}', [AppController::class, 'update']);

    /* USUARIOS */
    Route::post('/admin/usuarios', [UserAdminController::class, 'getUsuariosAdmin']);
    Route::post('/store/usuario', [UserAdminController::class, 'store']);
    Route::put('/update/usuario/{cdgo_usrio}', [UserAdminController::class, 'update']);
    Route::put('/update/usuario/activo/{cdgo_usrio}', [UserAdminController::class, 'updateActivoUser']);
    Route::post('/verified/usuario', [UserAdminController::class, 'verifiedUser']);
    Route::put('/usuario/reset-password/{cdgo_usrio}', [UserAdminController::class, 'resetPasword']);
    Route::post('/admin/show-user', [UserAdminController::class, 'findUser']);
    Route::put('/update/codigo-biometrico/{cdgo_usrio}', [UserAdminController::class, 'setCodigoBiometrico']);

    /* ÁREAS TIC */
    Route::get('/areas-tic', [AreaTicController::class, 'getAreasTic']);
    Route::get('/areas-tic/all', [AreaTicController::class, 'getAllAreasTic']);
    Route::get('/areas-tic/{id}', [AreaTicController::class, 'show']);
    Route::post('/areas-tic/store', [AreaTicController::class, 'store']);
    Route::put('/areas-tic/update/{id}', [AreaTicController::class, 'update']);
    Route::delete('/areas-tic/destroy/{id}', [AreaTicController::class, 'destroy']);

    /* TECNICOS */
    Route::post('/admin/tecnicos', [TecnicoController::class, 'getTecnicosAdmin']);
    Route::put('/update/tecnico/{cdgo_usrio}', [TecnicoController::class, 'updateTecnico']);

    Route::get('/tecnicos-con-areas', [TecnicoController::class, 'getTecnicosConAreas']);
    Route::get('/tecnico/{tecnico_id}/areas', [TecnicoController::class, 'getAreasTecnico']);
    Route::get('/area/{area_id}/tecnicos', [TecnicoController::class, 'getTecnicosArea']);
    Route::post('/tecnico-area/asignar', [TecnicoController::class, 'asignarArea']);
    Route::put('/tecnico-area/update/{id}', [TecnicoController::class, 'updateAsignacion']);
    Route::delete('/tecnico-area/remover/{id}', [TecnicoController::class, 'removerArea']);

    /* NOTIFICACIONES TELEGRAM (ADMIN) */
    Route::post('/telegram/notificar-soporte/{soporte_id}', [TelegramController::class, 'notificarSoporteAsignado']);

    /* DEPARTAMENTOS Y DIRECCION */
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
    Route::post('/soporte', [SoporteAdminController::class, 'getSoporteForNumero']);
    Route::put('/asignar-soporte/{id_sop}', [SoporteAdminController::class, 'asignarSoporte']);
    Route::post('/soportes-anulados', [SoporteAdminController::class, 'getSoporteAnulados']);
    Route::post('/crear-solicitud', [SoporteAdminController::class, 'crearSolicitudAdmin']);
    Route::put('/actualizar-soporte/{id_sop}', [SoporteAdminController::class, 'updateSoporte']);
    Route::post('/indicador-soporte', [SoporteAdminController::class, 'getIndicadoresSoportes']);
    Route::post('/reporte-indicador-pdf', [SoporteAdminController::class, 'exportPDFIndicadores']); //TODO
    Route::get('/soportes-sin-calificar', [SoporteAdminController::class, 'getSoportesSinCalificacion']);
    Route::post('/calificacion', [SoporteAdminController::class, 'setCalificacionSoportes']);
    Route::get('/consulta-soportes', [SoporteController::class, 'buscarSoporteLite']);
    //Route::post('/soporte-acta', [SoporteAdminController::class, 'exportActaBajaEquipo']);


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
    //Route::put('/inventario/categoria/incrementar/{id}', [InvCategoriaController::class, 'incrementarStock']);
    Route::delete('/inventario/categoria/destroy/{id}', [InvCategoriaController::class, 'update']);

    /* ESTADOS */
    Route::get('/inventario/estados', [InvEstadoController::class, 'getEstadosInv']);
    Route::post('/inventario/estado/store', [InvEstadoController::class, 'store']);
    Route::put('/inventario/estado/update/{id}', [InvEstadoController::class, 'update']);
    Route::delete('/inventario/estado/destroy/{id}', [InvEstadoController::class, 'destroy']);

    /* CONCEPTOS DE PRESTAMOS */
    Route::get('/inventario/conceptos', [InvConceptoController::class, 'getInvConceptos']);
    Route::post('/inventario/concepto/store', [InvConceptoController::class, 'store']);
    Route::put('/inventario/concepto/update/{id}', [InvConceptoController::class, 'update']);
    Route::delete('/inventario/concepto/destroy/{id}', [InvConceptoController::class, 'destroy']);

    /* DOCUMENTOS DE EQUIPOS */
    Route::post('/inventario/documento', [InvDocumentoController::class, 'getDocumentosForEquipos']);
    Route::post('/inventario/documento/store', [InvDocumentoController::class, 'store']);
    Route::put('/inventario/documento/update/{id}', [InvDocumentoController::class, 'update']);
    Route::delete('/inventario/documento/destroy/{id}', [InvDocumentoController::class, 'destroy']);


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
    Route::get('/inventario/equipo/{id}', [InvEquipoController::class, 'show']);
    Route::post('/inventario/equipo/store', [InvEquipoController::class, 'store']);
    Route::put('/inventario/equipo/update/{id}', [InvEquipoController::class, 'update']);
    Route::delete('/inventario/equipo/destroy/{id}', [InvEquipoController::class, 'destroy']);
    Route::put('/inventario/asignar/{id}', [InvEquipoController::class, 'assignResponsable']);
    Route::delete('/inventario/equipo/{equipo_id}/{id}', [InvEquipoController::class, 'removeUserFromEquipo']);
    Route::post('/equipo/{id}/documento/guardar', [InvEquipoController::class, 'guardarDocumento']);
    Route::delete('/equipo/documento/{id}/eliminar', [InvEquipoController::class, 'eliminarDocumento']);
    Route::get('/equipo/descargar-documento/{id}', [InvEquipoController::class, 'descargarDocumento']);
    Route::post('/inventario/equipo/remover-custodio/{id}', [InvEquipoController::class, 'removeCustodio']);
    Route::put('/inventario/equipo/{id}/custodio', [InvEquipoController::class, 'asignarCustodio']);
    Route::post('/inventario/export/equipos', [InvEquipoController::class, 'exportPDFEquipos']);
    Route::post('/inventario/buscar/equipo', [InvEquipoController::class, 'buscarEquipoxUsuario']);
    Route::post('/export-equipos-xls', [InvEquipoController::class, 'exportInvEquiposExcel']);

    /* EQUIPOS DAR DE BAJA */
    Route::post('/inventario/equipo/baja', [InvBajaController::class, 'darDeBajaEquipos']);


    /* CONSUMIBLES */
    Route::post('/inventario/consumibles', [InvConsumibleController::class, 'getInvConsumibles']);
    Route::post('/inventario/store/consumible', [InvConsumibleController::class, 'store']);
    Route::put('/inventario/update/consumible/{id}', [InvConsumibleController::class, 'update']);
    Route::delete('/inventario/consumible/destroy/{id}', [InvConsumibleController::class, 'destroy']);
    Route::put('/inventario/consumible/incrementar/{id}', [InvConsumibleController::class, 'incrementarStock']);
    Route::post('/inventario/solicitar-consumible', [InvConsumibleController::class, 'solicitarConsumible']);
    Route::post('/inventario/historial-consumible', [InvConsumibleController::class, 'historialConsumible']);

});

/* RUTAS: GERENTE O TECNICO */
Route::group(['prefix' => 'general', 'middleware' => ['auth:sanctum', 'role:TIC_GERENTE|TIC_TECNICO']], function () {



    /* TECNICOS */
    Route::post('/tecnicos', [TecnicoController::class, 'getTecnicos']);
    Route::post("/info-soportes", [TecnicoController::class, 'getInfoTecnicosSoportes']);

    /* DIRECCIONES */

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

    /* EQUIPOS NUEVA TABLA */
    Route::get('/inventario/tipos-equipos', [InvEquipoController::class, 'getEquipos']);

    /* ÁREAS DE TIC (CONSULTA) */
    Route::get('/areas-tic', [AreaTicController::class, 'getAreasTic']);
});


/* RUTAS USUARIO */
Route::group(['prefix' => 'usuario', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/usuarios-extrict', [UserController::class, 'getUsuariosExtrict']);

    /* SOLICIUTD DE SOPORTE */
    Route::post('/enviar-solicitud', [SoporteController::class, 'enviarSolicitud']);

    /* INFO DE LOS SOPORTES PERFIL */
    Route::post("/info-soportes", [UserController::class, 'getInfoSoporteForUser']);

    /* INFO DE LOS CUMPLEANIOS DE LOS FUNCIONARIOS */
    Route::get("/birthdays", [UserController::class, 'getBirthdayUsers']);


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
    Route::put('/anular-soporte/{id_sop}', [SoporteAdminController::class, 'anularSoportes']);


    /* MARCACIONES */
    Route::post('/marcaciones', [MarcacionController::class, 'getMarcaciones']);
    Route::post('/marcaciones-biometricos', [MarcacionController::class, 'getMarcacionesBiometrico']);
    Route::post('/marcaciones-justificativo-pdf', [MarcacionController::class, 'exportJustificativo']);
    Route::post('/store/marcacion', [MarcacionController::class, 'addMarcacion']);


    /* DIRECCIONES */
    Route::get('/direcciones', [DireccionController::class, 'getDirecciones']);

    /* DIRECTORES */
    Route::post('/directores', [DireccionAdminController::class, 'getDirectores']);

    /* PERMISOS */
    Route::post('/permisos', [PermisosAdminController::class, 'getPermisosAdmin']);

    Route::post('/crear-permiso', [PermisosAdminController::class, 'store']);
    Route::post('/export-permiso-pdf', [PermisosAdminController::class, 'exportCardPDFPermiso']);
    Route::post('/permiso-pdf', [PermisosAdminController::class, 'exportPDFPermiso']);
    Route::put('/anular-permiso/{idper_permisos}', [PermisosAdminController::class, 'anularPermisos']);
    Route::get('/{usuario_id}/info-permisos', [PermisosAdminController::class, 'getInfoPermisosForUser']);


    /* VACACIONES */
    Route::post('/solicitar-vacaciones', [NomVacacionesController::class, 'solicitarVacaciones']);
    Route::post('/solicitudes-vacaciones', [NomVacacionesController::class, 'getSolicitudesVacaciones']);
    Route::post('/export-vacaciones-pdf', [NomVacacionesController::class, 'exportFichaVacaciones']);
    Route::put('/solicitar-anulacion-vacaciones/{id}', [NomVacacionesController::class, 'solicitarAnulacion']);



    /* VACACIONES - MOTIVOS */
    Route::get('/motivos-vacaciones', [NomVacacionesController::class, 'getMotivosVacaciones']);

    /* PERIODOS - VACACIONES */
    //Route::post('/consultar-periodos', [NomPeriodoVacacionesController::class, 'consultarDiasEnPeriodos']);
    Route::post('/periodos-vacacionales', [UserAdminController::class, 'getConsultarPeriodos']);
    Route::post('/vacaciones/dias-disponibles/{cdgo_usrio}', [NomPeriodoVacacionesController::class, 'obtenerDiasDisponiblesPorUsuario']);

    /* TELEGRAM - CONFIGURACIÓN PERSONAL */
    Route::post('/telegram/configurar', [TelegramController::class, 'configurarTelegram']);
    Route::get('/telegram/configuracion', [TelegramController::class, 'getConfiguracion']);
    Route::put('/telegram/desactivar', [TelegramController::class, 'desactivarNotificaciones']);

    /* RUTAS */
    Route::post('/fichas-ingresos/buscar', [RutaController::class, 'buscarFichasIngresos']);

    /* DENUNCIAS */
    Route::post('/denuncias/verificar-cedula', [DenunciaController::class, 'verificarCedula']);
    Route::post('/denuncias/crear', [DenunciaController::class, 'store']);
    Route::get('/denuncias/mis-denuncias', [DenunciaController::class, 'getMisDenuncias']);
    Route::get('/denuncias/{numero_denuncia}', [DenunciaController::class, 'show']);
});



/* RUTAS NOM_ASISTENCIA */
Route::group(['prefix' => 'tthh/asistencia', 'middleware' => ['auth:sanctum', 'role:TIC_GERENTE|NOM_ASISTENCIA|NOM_VACACIONES']], function () {

    /* USUARIOS - FECHA INGRESO */
    Route::put('/update/fecha-ingreso/{cdgo_usrio}', [UserAdminController::class, 'updateFechaIngreso']);

    /* PERMISOS */
    // Route::post('/buscar-permiso', [PermisosAdminController::class, 'searchPermiso']);
    Route::put('/actualizar-permiso/{idper_permisos}', [PermisosAdminController::class, 'updateEstadoPermiso']);

    Route::post('/consolidado-permisos', [PermisosAdminController::class, 'getConsolidadoPermisos']);
    Route::post('/export/consolidado-permisos', [PermisosAdminController::class, 'getExportConsolidadoPermisos']);


    /* ESTADOS DE PERMISOS: APROBADO, ANULADO */
    Route::get('/estados-permisos', [PermisosAdminController::class, 'getAprobadoAnulado']);

    /* GESTIONAR - VACACIONES */
    Route::put('/gestionar-vacaciones/{id}', [NomVacacionesController::class, 'gestionarVacaciones']);

    /* PERIODOS VACACIONES */
    Route::post('/consulta-periodos', [NomPeriodoVacacionesController::class, 'getConsultarPeriodos']);
    Route::post('/store/periodo', [NomPeriodoVacacionesController::class, 'store']);
    Route::post('/calcular-dias', [NomPeriodoVacacionesController::class, 'calcularDias']);
    Route::put('/update/periodo/{id}', [NomPeriodoVacacionesController::class, 'updatePeriodo']);
    Route::delete('/delete/periodo/{id}', [NomPeriodoVacacionesController::class, 'destroy']);

    /* DESCUENTOS VACACIONES */
    Route::post('/descuentos', [NomVacacionesDescuentoController::class, 'getNomVacacionesDescuentos']);
    Route::post('/store/descuento', [NomVacacionesDescuentoController::class, 'store']);
    Route::put('/update/descuento/{id}', [NomVacacionesDescuentoController::class, 'update']);
    Route::delete('/delete/descuento/{id}', [NomVacacionesDescuentoController::class, 'destroy']);
});



Route::group(['prefix' => 'tthh/gerencia', 'middleware' => ['auth:sanctum', 'role:NOM_DENUNCIAS']], function () {

    /* DENUNCIAS - ADMIN */
    Route::post('/denuncias', [DenunciaAdminController::class, 'index']);
    Route::get('/denuncias/estadisticas', [DenunciaAdminController::class, 'estadisticas']);
    Route::get('/denuncias/{id}', [DenunciaAdminController::class, 'show']);
    Route::put('/denuncias/{id}/responder', [DenunciaAdminController::class, 'responder']);
    Route::put('/denuncias/{id}/estado', [DenunciaAdminController::class, 'updateEstado']);
    Route::get('/denuncias/archivo/{archivo_id}/descargar', [DenunciaAdminController::class, 'descargarArchivo']);
});




