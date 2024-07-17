<x-mail::message>
# Nueva Solicitud
### Asistencia Técnica
### Número de soporte: {{ $soporte->numero_sop }}

Buen día, estimado ingeniero/a {{ $soporte->tecnico }}, se solicita de su ayuda con: <br>

El funcionario: {{ $soporte->solicitante }} <br>
Con correo: {{ $soporte->email }}<br>
del departamento: {{ $soporte->direccion }}

### Descripción del problema: <br>
{{ $soporte->incidente }}

<br><br>
Por favor para más información contactese con el funcionario solicitante.


### Por favor no responder a este mensaje


Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
