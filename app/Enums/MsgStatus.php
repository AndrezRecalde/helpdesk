<?php

namespace App\Enums;

enum MsgStatus:string {
    case Created = 'Creado con éxito';
    case Updated = 'Actualizado con éxito';
    case Deleted = 'Eliminado con éxito';
    case NotFound = '404 - No Encontrado';

    case Success = 'success';
    case Error = 'error';

    /* Authentication */
    case IncorrectCredentials = 'Credenciales incorrectas o usuario no activo';
    case UserNotActive = 'Usuario no activo';
    case TokenBearer = 'Bearer';
    case Logout = 'Logged out';
    case PasswordChange = 'Contraseña actualizada con éxito';
    case UserNotFound = 'Usuario no encontrado';


    /* Actividades */
    case ActivityRegistred = 'Su actividad se ha registrado';
    case ActivitiesNotFound = 'No existen actividades registradas';
    case ActivityUpdated = 'Su actividad ha sido actualizada';

    /* Soportes */
    case SoporteClosed = 'Soporte cerrado(s) con éxito';
    case SoporteNotFound = 'Soporte(s) no encontrado';
    case SoporteSendSuccess = 'Solicitud enviada con éxito';
    case SoporteDiagnosed = 'Soporte Diagnosticado';
    case ActivitiesSoportedNotFound = 'No hay actividades de soporte en ese rango de fechas';
    case SoporteCreatedSuccess = 'Solicitud creada con éxito';
    case SoportesAnuladosNotFound = 'No existen soportes anulados en ese rango de fechas';
    case SoporteAnulado = 'Soporte anulado';
    case SoporteAsignado = 'Soporte Asignado';

    /* Direcciones */
    case DireccionNotFound = 'Dirección no encontrada';

    /* Tecnicos */
    case TecnicoNotFound = 'Técnico no encontrado';

    /* Usuarios */
    case UsersFilterNotFound = 'No existen usuarios con esos filtros de búsqueda';

    /* Inventario */
    case ComponentesSuccess = 'Componentes asignados correctamente al equipo';
    case AssignEquipoSuccess = 'Equipo agregado con éxito';
}
