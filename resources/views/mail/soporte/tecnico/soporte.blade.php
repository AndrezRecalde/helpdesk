<x-mail::message>
# Nueva Solicitud
### Asistencia Técnica
### Número de soporte: {{ $asignacion['numero_sop'] }}

Buen día, estimado ingeniero/a {{ $asignacion['tecnico'] }}, se solicita de su ayuda con: <br>

El funcionario: {{ $asignacion['solicitante'] }} <br>
Con correo: {{ $asignacion['email'] }}<br>
del departamento: {{ $asignacion['direccion'] }}

### Descripción del problema: <br>
{{ $asignacion['incidente'] }}

<br><br>
Por favor para más información contactese con el funcionario solicitante.


### Por favor no responder a este mensaje


Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
