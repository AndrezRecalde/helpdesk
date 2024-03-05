import { AuthPage } from "./auth/AuthPage";


/* Usuario */
import { ProfilePage } from "./user/ProfilePage";

/*Gerente */
import { AdminUsersPage } from "./gerencia/AdminUsersPage";
import { AdminDireccionesPage } from "./gerencia/AdminDireccionesPage";

/* Solicitudes */
import { SolicitudPage } from "./solicitud/SolicitudPage";
import { SolicitudesActualesPage } from "./solicitud/SolicitudesActualesPage";
import { SolicitudesAnuladasPage } from "./solicitud/SolicitudesAnuladasPage";

/* Soportes */
import { SoportesPage } from "./soporte/SoportesPage";
import { BusquedaSoportePage } from "./soporte/BusquedaSoportePage";

/* Dashboard */
import { DashGerenciaPage } from "./dashboard/gerencia/DashGerenciaPage";


/* Error */
import { ErrorNotFound } from "./error/ErrorNotFound";
import { ErrorAccessDenied } from "./error/ErrorAccessDenied";

export {
    AuthPage,
    ProfilePage,

    AdminUsersPage,
    AdminDireccionesPage,

    SolicitudPage,
    SolicitudesActualesPage,
    SolicitudesAnuladasPage,


    SoportesPage,
    BusquedaSoportePage,

    DashGerenciaPage,

    ErrorNotFound,
    ErrorAccessDenied
}
