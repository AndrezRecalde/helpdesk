<x-mail::message>
# Nueva Solicitud
### Asistencia Técnica
### Número de soporte: {{ $soporte_asignado->numero_sop }}

Buen día, estimado ingeniero/a {{ $soporte_asignado->tecnico }}, se solicita de su ayuda con: <br>

El funcionario: {{ $soporte_asignado->solicitante }} <br>
Con correo: {{ $soporte_asignado->email }}<br>
del departamento: {{ $soporte_asignado->direccion }}

### Descripción del problema: <br>
{{ $soporte_asignado->incidente }}

<br><br>
Por favor para más información contactese con el funcionario solicitante.


### Por favor no responder a este mensaje


Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
