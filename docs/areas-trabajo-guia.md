# Guía de Usuario: Sistema de Áreas de Trabajo

## Introducción

El sistema de áreas de trabajo permite organizar a los técnicos de TIC en áreas especializadas (Soporte Técnico, Aplicaciones, Infraestructura, etc.) para una mejor gestión y distribución de tickets de soporte.

---

## Conceptos Clave

### 🏢 Área TIC

Especialización o departamento dentro de TIC (Ej: Soporte Técnico, Desarrollo, Redes)

### 👨‍💻 Técnico

Usuario con rol de técnico que puede ser asignado a una o más áreas

### ⭐ Técnico Principal

Técnico responsable principal de un área (recibe prioridad en asignaciones)

### 🎫 Asignación Automática

El sistema asigna automáticamente tickets a técnicos según su área y carga de trabajo

---

## Gestión de Áreas TIC

### Crear Nueva Área

**Ruta:** Gerencia > Áreas TIC > Nueva Área

**Campos:**

- **Nombre:** Nombre del área (Ej: "Soporte Técnico")
- **Descripción:** Descripción breve del área
- **Estado:** Activo/Inactivo

**Ejemplo:**

```
Nombre: Soporte Técnico
Descripción: Atención de incidentes de hardware y software
Estado: Activo
```

### Editar Área

1. Ir a listado de áreas
2. Clic en botón "Editar"
3. Modificar campos necesarios
4. Guardar cambios

### Desactivar Área

**⚠️ Importante:** Al desactivar un área:

- No se podrán asignar nuevos tickets
- Los tickets existentes no se ven afectados
- Los técnicos mantienen su asignación

---

## Asignación de Técnicos a Áreas

### Asignar Técnico a un Área

**Ruta:** Gerencia > Técnicos > Asignar Área

**Pasos:**

1. Seleccionar técnico
2. Seleccionar área TIC
3. Marcar si es técnico principal (opcional)
4. Guardar asignación

**Reglas:**

- Un técnico puede estar en múltiples áreas
- Solo puede haber **un técnico principal** por área
- Al marcar un técnico como principal, se desmarca el anterior

### Ver Áreas de un Técnico

**Ruta:** Gerencia > Técnicos > [Nombre Técnico]

Muestra:

- Áreas asignadas
- Si es principal en alguna
- Fecha de asignación
- Estado de la asignación

### Remover Técnico de un Área

**Pasos:**

1. Ir a detalle del técnico
2. Buscar el área a remover
3. Clic en "Remover"
4. Confirmar acción

**Nota:** La remoción es lógica (se desactiva, no se elimina)

---

## Asignación de Tickets

### Asignación Manual

**Ruta:** Gerencia > Soportes > Asignar

**Pasos:**

1. Seleccionar ticket
2. Elegir área TIC
3. Seleccionar técnico del área
4. Confirmar asignación

**Resultado:**

- Ticket asignado al técnico
- Notificación por correo
- Notificación por Telegram (si está configurado)

### Asignación Automática

**Cómo Funciona:**

1. **Identificación de Área**
    - El ticket debe tener un área TIC asignada

2. **Selección de Técnico**
    - Prioriza al técnico principal del área
    - Si está sobrecargado (>10 tickets), busca alternativa
    - Selecciona técnico con menor carga de trabajo

3. **Notificación**
    - Envía correo electrónico
    - Envía notificación por Telegram

**Ventajas:**

- ✅ Distribución equitativa de carga
- ✅ Asignación inmediata
- ✅ Prioriza especialización

---

## Distribución de Carga

### Visualizar Carga de Trabajo

**Ruta:** Gerencia > Dashboard > Carga por Área

**Métricas:**

- Tickets activos por técnico
- Tickets totales por área
- Técnicos disponibles
- Capacidad del área

### Balanceo de Carga

El sistema automáticamente:

- Cuenta tickets activos de cada técnico
- Asigna nuevos tickets al menos cargado
- Respeta la especialización por área

**Estados considerados "activos":**

- Asignado (5)
- En proceso (6)

---

## Reportes y Estadísticas

### Reporte de Desempeño por Área

**Incluye:**

- Total de tickets por área
- Tiempo promedio de resolución
- Técnicos asignados
- Tasa de finalización

### Reporte de Carga por Técnico

**Incluye:**

- Tickets activos
- Tickets finalizados
- Áreas asignadas
- Desempeño general

---

## Mejores Prácticas

### ✅ Configuración Inicial

1. **Crear áreas lógicas**
    - Soporte Técnico
    - Desarrollo de Aplicaciones
    - Infraestructura y Redes
    - Seguridad Informática

2. **Asignar técnicos según especialidad**
    - Considerar experiencia
    - Distribuir equitativamente

3. **Designar técnicos principales**
    - Más experimentados
    - Mayor disponibilidad

### ✅ Gestión Continua

1. **Revisar carga periódicamente**
    - Semanal o quincenal
    - Reasignar si hay desbalance

2. **Actualizar asignaciones**
    - Cuando cambian responsabilidades
    - Cuando hay nuevos técnicos

3. **Monitorear métricas**
    - Tiempo de respuesta por área
    - Satisfacción del usuario

### ❌ Evitar

- No dejar áreas sin técnico principal
- No sobrecargar a un solo técnico
- No crear demasiadas áreas (mantener simple)
- No desactivar áreas con tickets activos

---

## Preguntas Frecuentes

### ¿Puedo cambiar el área de un ticket ya asignado?

Sí, desde el módulo de gestión de soportes puedes reasignar tanto el área como el técnico.

### ¿Qué pasa si desactivo un técnico?

Los tickets asignados se mantienen, pero no recibirá nuevas asignaciones automáticas.

### ¿Cómo sé si un área está sobrecargada?

Revisa el dashboard de carga. Si un área tiene >50 tickets activos, considera redistribuir.

### ¿Puedo tener múltiples técnicos principales?

No, solo uno por área. Esto asegura responsabilidad clara.

### ¿Qué pasa si no hay técnicos disponibles en un área?

La asignación automática fallará y deberás asignar manualmente o agregar técnicos al área.

---

## Soporte

Para más información o problemas técnicos, contacta al administrador del sistema.
