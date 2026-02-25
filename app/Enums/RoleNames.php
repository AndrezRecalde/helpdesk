<?php

namespace App\Enums;

enum RoleNames: string
{
    // Super-admin: bypasea todos los permission checks vía Gate::before
    case GERENTE = 'GERENTE';

    // Roles funcionales
    case TIC = 'TIC';
    case TTHH = 'TTHH';

    // Roles anteriores — conservados como referencia durante la migración
    // Se eliminarán al completar el Paso 4 (actualizar api.php)
    // case TIC_GERENTE = 'TIC_GERENTE';
    // case TIC_TECNICO = 'TIC_TECNICO';
    // case NOM_ASISTENCIA = 'NOM_ASISTENCIA';
    // case NOM_VACACIONES = 'NOM_VACACIONES';
    // case NOM_DENUNCIAS  = 'NOM_DENUNCIAS';
}
