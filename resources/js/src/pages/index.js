import AuthPage from "./auth/AuthPage";


/* Usuario */
import ProfilePage from "./user/ProfilePage";
import ChangePwdPage from "./user/ChangePwdPage";

/*Gerente */
import AdminUsersPage from "./gerencia/AdminUsersPage";
import AdminDireccionesPage from "./gerencia/AdminDireccionesPage";
import AdminTecnicosPage from "./gerencia/AdminTecnicosPage";

/* Solicitudes */
import SolicitudPage from "./solicitud/SolicitudPage";
import SolicitudesActualesPage from "./solicitud/SolicitudesActualesPage";
//import { SolicitudesAnuladasPage } from "./solicitud/SolicitudesAnuladasPage";

/* Soportes */
import SoportesPage from "./soporte/SoportesPage";
//import { BusquedaSoportePage } from "./soporte/BusquedaSoportePage";
import IndicadorReportPage from "./soporte/reporte/IndicadorReportPage";
import ReporteSoportes from "./soporte/reporte/ReporteSoportes";
import SoporteCalificacionPage from "./soporte/SoporteCalificacionPage";
/* Vista de Soportes de usuarios */
import UserSoportesPage from "./soporte/UserSoportesPage";

/* Dashboard */
import DashGerenciaPage from "./dashboard/gerencia/DashGerenciaPage";

/* Actividades */
import ActividadPage from "./actividad/ActividadPage";
import ListActividadesPage from "./actividad/ListActividadesPage";

/* Permisos */
import PermisosPage from "./permisos/PermisosPage";
import ListPermisosPage from "./permisos/ListPermisosPage";
import ListPermisosAdminPage from "./permisos/ListPermisosAdminPage";

/* Vacaciones */
import SolicitudVacacionesPage  from "./vacaciones/SolicitudVacacionesPage";
import SolicitudesVacacionesPage from "./vacaciones/SolicitudesVacacionesPage";

/* Marcaciones */
import MarcacionPage from "./marcacion/MarcacionPage";

/* Inventario */
import ConfigInventarioPage from "./inventario/ConfigInventarioPage";

/* Inventario: Tipos de categoria */
import InvTipocategoriasPage from "./inventario/categorias/InvTipocategoriasPage";

/* Inventario: Categoria */
import InvCategoriasPage from "./inventario/categorias/InvCategoriasPage";

/* Inventario: Marca */
import InvMarcaPage from "./inventario/marca/InvMarcaPage";

/* Inventario: Estado */
import InvEstadoPage from "./inventario/estado/InvEstadoPage";

/* Inventario: Conceptos de Estados */
import InvConceptoPage from "./inventario/concepto/InvConceptoPage";

/* Inventario: Ubicacion */
import InvUbicacionPage from "./inventario/ubicacion/InvUbicacionPage";

/* Inventario: Equipos */
import InvEquiposPage from "./inventario/equipo/InvEquiposPage";


/* Error */
import ErrorNotFound from "./error/ErrorNotFound";
import ErrorAccessDenied from "./error/ErrorAccessDenied";

export {
    AuthPage,
    ProfilePage,
    ChangePwdPage,

    AdminUsersPage,
    AdminDireccionesPage,
    AdminTecnicosPage,

    SolicitudPage,
    SolicitudesActualesPage,
    //SolicitudesAnuladasPage,

    SolicitudVacacionesPage,
    SolicitudesVacacionesPage,

    SoportesPage,
    //BusquedaSoportePage,
    IndicadorReportPage,
    ReporteSoportes,
    SoporteCalificacionPage,
    UserSoportesPage,

    DashGerenciaPage,

    ActividadPage,
    ListActividadesPage,

    PermisosPage,
    ListPermisosPage,
    ListPermisosAdminPage,

    MarcacionPage,

    ConfigInventarioPage,

    InvTipocategoriasPage,
    InvCategoriasPage,

    InvMarcaPage,

    InvEstadoPage,

    InvConceptoPage,

    InvUbicacionPage,

    InvEquiposPage,

    ErrorNotFound,
    ErrorAccessDenied
}
