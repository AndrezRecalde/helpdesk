<x-mail::message>
# Requerimiento de soporte técnico
### Su Número de soporte es: {{ $soporte_asignado['numero_sop'] }}

Estimado/a {{ $soporte_asignado['solicitante'] }},<br>
Nos dirigimos a usted para informarle que hemos recibido su solicitud con respecto a <br>
{{ $soporte_asignado['incidente'] }} <br><br>

El técnico {{ $soporte_asignado['tecnico'] }} del área de Tecnologías de la Información y Comunicación (TIC)
se pondrá en contacto con usted lo más pronto posible para brindarle la asistencia necesaria y resolver su consulta.<br>

Le agradecemos por su paciencia y comprensión.

<br><br>

### Por favor no responder a este mensaje

Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
