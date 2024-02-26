<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Gerente\CargoController;
use App\Http\Controllers\Gerente\DepartamentoController;
use App\Http\Controllers\Gerente\EmpresaController;
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

Route::group(['prefix' => 'gerencia', 'middleware' => ['auth:sanctum']], function () {

    /* USUARIOS */
    Route::post('/usuarios', [UserAdminController::class, 'getUsuariosAdmin']);
    Route::post('/tecnicos', [UserAdminController::class, 'getTecnicos']);
    Route::post('/store/usuario', [UserAdminController::class, 'store']);
    Route::put('/update/usuario/{cdgo_usrio}', [UserAdminController::class, 'update']);
    Route::put('/update/tecnico/{cdgo_usrio}', [UserAdminController::class, 'updateTecnico']);


    /* DEPARTAMENTOS Y DIRECCION */
    Route::post('/direcciones', [DepartamentoController::class, 'getDirecciones']);
    Route::post('/departamentos', [DepartamentoController::class, 'getDepartamentos']);
    Route::put('/update/director/departamento/{id}', [DepartamentoController::class, 'updateDirectores']);

    /*EMPRESAS */
    Route::get('/empresas', [EmpresaController::class, 'getEmpresas']);

    /*Cargos */
    Route::get('/cargos', [CargoController::class, 'getCargos']);
});
