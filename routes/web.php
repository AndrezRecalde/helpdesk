<?php

use App\Http\Controllers\General\TelegramWebhookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/**
 * WEBHOOK DE TELEGRAM
 *
 * Telegram llama a esta URL con cada mensaje/evento del bot.
 * No requiere autenticación de usuario (Telegram envía su propio token secreto).
 * Excluida de la verificación CSRF (ver VerifyCsrfToken.php).
 *
 * A registrar con:
 *   https://api.telegram.org/bot{TOKEN}/setWebhook
 *     ?url=https://tu-dominio.com/telegram/webhook
 *     &secret_token=TELEGRAM_WEBHOOK_SECRET
 */
Route::post('/telegram/webhook', [TelegramWebhookController::class, 'handle'])
    ->name('telegram.webhook');



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/{path?}', function () {
    return view('welcome');
})->where('path', '^(?!api).*?');
