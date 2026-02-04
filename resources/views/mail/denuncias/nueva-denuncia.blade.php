@component('mail::message')
# Nueva Denuncia Recibida

Se ha recibido una nueva denuncia en el sistema.

## Información de la Denuncia

**Número de Denuncia:** {{ $denuncia->numero_denuncia }}

**Tipo:** {{ $denuncia->tipo_denuncia }}

**Estado:** {{ $denuncia->estado }}

**Fecha de Recepción:** {{ $denuncia->created_at->format('d/m/Y H:i') }}

**Archivos Adjuntos:** {{ $denuncia->archivos->count() }}

---

## Descripción

{{ $denuncia->descripcion }}

---

@if($denuncia->mostrar_informacion)
## Información del Denunciante

@php
    $infoUsuario = $denuncia->getInfoUsuario();
@endphp

**Nombre:** {{ $infoUsuario['nombre'] }}

**Email:** {{ $infoUsuario['email'] }}

**Departamento:** {{ $infoUsuario['departamento'] }}
@else
## Información del Denunciante

**Denuncia Anónima** - El usuario ha optado por mantener su identidad oculta.
@endif

---

Por favor, revise esta denuncia en el sistema para tomar las acciones correspondientes.

Gracias,<br>
{{ config('app.name') }}
@endcomponent
