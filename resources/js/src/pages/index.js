import { AuthPage } from "./auth/AuthPage";


/* Usuario */
import { ProfilePage } from "./user/ProfilePage";
import { ChangePwdPage } from "./user/ChangePwdPage";

/*Gerente */
import { AdminUsersPage } from "./gerencia/AdminUsersPage";
import { AdminDireccionesPage } from "./gerencia/AdminDireccionesPage";
import { AdminTecnicosPage } from "./gerencia/AdminTecnicosPage";

/* Solicitudes */
import { SolicitudPage } from "./solicitud/SolicitudPage";
import { SolicitudesActualesPage } from "./solicitud/SolicitudesActualesPage";
import { SolicitudesAnuladasPage } from "./solicitud/SolicitudesAnuladasPage";

/* Soportes */
import { SoportesPage } from "./soporte/SoportesPage";
import { BusquedaSoportePage } from "./soporte/BusquedaSoportePage";
import { IndicadorReportPage } from "./soporte/reporte/IndicadorReportPage";
import { ReporteSoportes } from "./soporte/reporte/ReporteSoportes";
/* Vista de Soportes de usuarios */
import { UserSoportesPage } from "./soporte/UserSoportesPage";

/* Dashboard */
import { DashGerenciaPage } from "./dashboard/gerencia/DashGerenciaPage";

/* Actividades */
import { ActividadPage } from "./actividad/ActividadPage";
import { ListActividadesPage } from "./actividad/ListActividadesPage";

/* Error */
import { ErrorNotFound } from "./error/ErrorNotFound";
import { ErrorAccessDenied } from "./error/ErrorAccessDenied";

export {
    AuthPage,
    ProfilePage,
    ChangePwdPage,

    AdminUsersPage,
    AdminDireccionesPage,
    AdminTecnicosPage,

    SolicitudPage,
    SolicitudesActualesPage,
    SolicitudesAnuladasPage,


    SoportesPage,
    BusquedaSoportePage,
    IndicadorReportPage,
    ReporteSoportes,
    UserSoportesPage,

    DashGerenciaPage,

    ActividadPage,
    ListActividadesPage,

    ErrorNotFound,
    ErrorAccessDenied
}
