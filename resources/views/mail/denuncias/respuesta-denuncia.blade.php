@component('mail::message')
# Respuesta a su Denuncia

Hemos procesado su denuncia y tenemos una respuesta para usted.

## Información de la Denuncia

**Número de Denuncia:** {{ $denuncia->numero_denuncia }}

**Tipo:** {{ $denuncia->tipo_denuncia }}

**Estado:** {{ $denuncia->estado }}

**Fecha de Denuncia:** {{ $denuncia->created_at->format('d/m/Y H:i') }}

**Fecha de Respuesta:** {{ $denuncia->fecha_respuesta->format('d/m/Y H:i') }}

---

## Su Denuncia

{{ $denuncia->descripcion }}

---

## Nuestra Respuesta

{{ $denuncia->respuesta }}

---

@if($denuncia->estado === 'RESUELTO')
Su denuncia ha sido **resuelta**. Si tiene alguna pregunta adicional, no dude en contactarnos.
@elseif($denuncia->estado === 'RECHAZADO')
Su denuncia ha sido **rechazada**. La respuesta anterior explica los motivos.
@elseif($denuncia->estado === 'EN_PROCESO')
Su denuncia está **en proceso**. Le mantendremos informado sobre cualquier actualización.
@endif

Gracias por su confianza,<br>
{{ config('app.name') }}
@endcomponent
