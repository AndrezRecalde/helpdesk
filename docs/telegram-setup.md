# Configuración de Notificaciones por Telegram

## Guía Completa para Configurar el Bot de Telegram

### 📋 Requisitos Previos

- Cuenta de Telegram activa
- Acceso al sistema HelpDesk

---

## Paso 1: Crear el Bot de Telegram

### 1.1 Abrir BotFather

1. Abre Telegram en tu dispositivo
2. Busca **@BotFather** en el buscador
3. Inicia una conversación con BotFather

### 1.2 Crear Nuevo Bot

1. Envía el comando: `/newbot`
2. BotFather te pedirá un nombre para tu bot
    - Ejemplo: `HelpDesk Notificaciones`
3. Luego te pedirá un username (debe terminar en 'bot')
    - Ejemplo: `helpdesk_notif_bot`

### 1.3 Obtener el Token

- BotFather te enviará un mensaje con el **Token del Bot**
- Ejemplo: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
- **⚠️ IMPORTANTE:** Guarda este token de forma segura

---

## Paso 2: Configurar el Token en el Sistema

### 2.1 En el Servidor

Edita el archivo `.env` del proyecto Laravel:

```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
```

### 2.2 Verificar Configuración

El token también está configurado en `config/services.php`:

```php
'telegram' => [
    'bot_token' => env('TELEGRAM_BOT_TOKEN'),
],
```

### 2.3 Limpiar Caché

Ejecuta en el servidor:

```bash
php artisan config:clear
php artisan config:cache
```

---

## Paso 3: Obtener tu Chat ID Personal

### Método 1: Usando @userinfobot

1. Busca **@userinfobot** en Telegram
2. Inicia una conversación
3. El bot te enviará tu **Chat ID**
4. Copia el número (ejemplo: `123456789`)

### Método 2: Usando tu Bot

1. Inicia una conversación con tu bot creado
2. Envía cualquier mensaje (ejemplo: `/start`)
3. Visita esta URL en tu navegador (reemplaza `TU_TOKEN`):
    ```
    https://api.telegram.org/botTU_TOKEN/getUpdates
    ```
4. Busca el campo `"chat":{"id":123456789}`
5. Ese número es tu **Chat ID**

---

## Paso 4: Configurar Notificaciones en el Sistema

### 4.1 Acceder al Panel de Configuración

1. Inicia sesión en el sistema HelpDesk
2. Ve a tu perfil de usuario
3. Busca la sección "Configuración de Telegram"

### 4.2 Ingresar Chat ID

1. Pega tu **Chat ID** en el campo correspondiente
2. Activa la opción "Recibir notificaciones"
3. Haz clic en "Guardar configuración"

### 4.3 Verificar Configuración

- El sistema enviará un mensaje de prueba a tu Telegram
- Si recibes el mensaje, ¡la configuración es exitosa! ✅

---

## Paso 5: Tipos de Notificaciones

### Notificaciones Automáticas que Recibirás:

#### 🔔 Nuevo Soporte Asignado

Recibirás una notificación cuando se te asigne un nuevo ticket:

```
🔔 NUEVO SOPORTE ASIGNADO

📋 Ticket: #1234
👤 Solicitante: Juan Pérez
🏢 Dirección: Dirección de TIC
🔧 Área: Soporte Técnico
📝 Incidente:
No funciona el internet en mi oficina

📅 Fecha: 05/02/2026 12:00

⚡ Por favor, atiende este ticket a la brevedad posible.
```

#### 🔄 Soporte Reasignado

Si un ticket es reasignado a ti:

```
🔄 SOPORTE REASIGNADO

📋 Ticket: #1234
👤 Solicitante: Juan Pérez
...
⚠️ Este soporte ha sido reasignado a ti.
```

---

## Solución de Problemas

### ❌ No recibo notificaciones

**Verificar:**

1. ✅ El token del bot está correctamente configurado en `.env`
2. ✅ Tu Chat ID es correcto
3. ✅ La opción "Recibir notificaciones" está activada
4. ✅ Iniciaste una conversación con el bot (envía `/start`)

### ❌ Error al guardar configuración

**Posibles causas:**

- Chat ID incorrecto (debe ser solo números)
- No has iniciado conversación con el bot
- El bot está bloqueado

### ❌ El bot no responde

**Solución:**

1. Verifica que el token sea válido
2. Asegúrate de haber iniciado conversación con el bot
3. Revisa los logs del servidor: `storage/logs/laravel.log`

---

## Desactivar Notificaciones

### Temporalmente

1. Ve a tu perfil
2. Desactiva "Recibir notificaciones"
3. Guarda cambios

### Permanentemente

1. Elimina tu Chat ID del sistema
2. Bloquea el bot en Telegram (opcional)

---

## Comandos Útiles del Bot

- `/start` - Iniciar conversación con el bot
- `/help` - Obtener ayuda (si está configurado)

---

## Seguridad y Privacidad

### ⚠️ Recomendaciones:

- **NO compartas** el token del bot
- Mantén tu Chat ID privado
- Solo personal autorizado debe tener acceso al archivo `.env`
- Revisa periódicamente los usuarios con notificaciones activas

### 🔒 Datos Almacenados:

El sistema solo almacena:

- Tu Chat ID de Telegram
- Estado de notificaciones (activo/inactivo)

**NO se almacenan:**

- Mensajes de Telegram
- Información personal adicional
- Historial de conversaciones

---

## Soporte Técnico

Si tienes problemas con la configuración:

1. Contacta al administrador del sistema
2. Revisa los logs en `storage/logs/laravel.log`
3. Verifica la documentación oficial de Telegram: https://core.telegram.org/bots

---

## Referencias

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/botfather)
- [Obtener Chat ID](https://t.me/userinfobot)
