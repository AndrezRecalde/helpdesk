import {
    IconFingerprint,
    IconLogout,
    IconSettings,
    IconUserHexagon,
} from "@tabler/icons-react";
import { lazy } from "react";
import { Roles } from "../../helpers/dictionary";

const AuthPage = lazy(() =>
    import(/* webpackChunkName: "AuthPage" */ "../../pages/auth/AuthPage")
);

const HomePage = lazy(() =>
    import(/* webpackChunkName: "HomePage" */ "../../pages/home/HomePage")
);


const DashGerenciaPage = lazy(() =>
    import(
        /* webpackChunkName: "DashGerenciaPage" */ "../../pages/dashboard/gerencia/DashGerenciaPage"
    )
);
const AdminUsersPage = lazy(() =>
    import(
        /* webpackChunkName: "AdminUsersPage" */ "../../pages/gerencia/AdminUsersPage"
    )
);
const AdminDireccionesPage = lazy(() =>
    import(
        /* webpackChunkName: "AdminDireccionesPage" */ "../../pages/gerencia/AdminDireccionesPage"
    )
);
const AdminTecnicosPage = lazy(() =>
    import(
        /* webpackChunkName: "AdminTecnicosPage" */ "../../pages/gerencia/AdminTecnicosPage"
    )
);
const SolicitudesActualesPage = lazy(() =>
    import(
        /* webpackChunkName: "SolicitudesActualesPage" */ "../../pages/solicitud/SolicitudesActualesPage"
    )
);
const SoportesPage = lazy(() =>
    import(
        /* webpackChunkName: "SoportesPage" */ "../../pages/soporte/SoportesPage"
    )
);
const SoporteCalificacionPage = lazy(() =>
    import(
        /* webpackChunkName: "SoporteCalificacionPage" */ "../../pages/soporte/SoporteCalificacionPage"
    )
);
const IndicadorReportPage = lazy(() =>
    import(
        /* webpackChunkName: "IndicadorReportPage" */ "../../pages/soporte/reporte/IndicadorReportPage"
    )
);
const ReporteSoportes = lazy(() =>
    import(
        /* webpackChunkName: "ReporteSoportes" */ "../../pages/soporte/reporte/ReporteSoportes"
    )
);
const ConfigInventarioPage = lazy(() =>
    import(
        /* webpackChunkName: "ConfigInventarioPage" */ "../../pages/inventario/ConfigInventarioPage"
    )
);
const InvEquiposPage = lazy(() =>
    import(
        /* webpackChunkName: "InvEquiposPage" */ "../../pages/inventario/equipo/InvEquiposPage"
    )
);
const InvConsumiblePage = lazy(() =>
    import(
        /* webpackChunkName: "InvConsumiblePage" */ "../../pages/inventario/consumible/InvConsumiblePage"
    )
);

const ListPermisosAdminPage = lazy(() =>
    import(
        /* webpackChunkName: "ListPermisosAdminPage" */ "../../pages/permisos/ListPermisosAdminPage"
    )
);
const ConsolidadoPermisosPage = lazy(() =>
    import(
        /* webpackChunkName: "ConsolidadoPermisosPage" */ "../../pages/permisos/ConsolidadoPermisosPage"
    )
);

const SolicitudPage = lazy(() =>
    import(
        /* webpackChunkName: "SolicitudPage" */ "../../pages/solicitud/SolicitudPage"
    )
);
const UserSoportesPage = lazy(() =>
    import(
        /* webpackChunkName: "UserSoportesPage" */ "../../pages/soporte/UserSoportesPage"
    )
);

const ProfilePage = lazy(() =>
    import(/* webpackChunkName: "ProfilePage" */ "../../pages/user/ProfilePage")
);
const ChangePwdPage = lazy(() =>
    import(
        /* webpackChunkName: "ChangePwdPage" */ "../../pages/user/ChangePwdPage"
    )
);
const MarcacionPage = lazy(() =>
    import(
        /* webpackChunkName: "MarcacionPage" */ "../../pages/marcacion/MarcacionPage"
    )
);
const ActividadPage = lazy(() =>
    import(
        /* webpackChunkName: "ActividadPage" */ "../../pages/actividad/ActividadPage"
    )
);
const ListActividadesPage = lazy(() =>
    import(
        /* webpackChunkName: "ListActividadesPage" */ "../../pages/actividad/ListActividadesPage"
    )
);
const PermisosPage = lazy(() =>
    import(
        /* webpackChunkName: "PermisosPage" */ "../../pages/permisos/PermisosPage"
    )
);
const ListPermisosPage = lazy(() =>
    import(
        /* webpackChunkName: "ListPermisosPage" */ "../../pages/permisos/ListPermisosPage"
    )
);

const AutorizarPermisosPage = lazy(() =>
    import(
        /* webpackChunkName: "AutorizarPermisosPage" */ "../../pages/permisos/AutorizarPermisosPage"
    )
);

const ErrorNotFound = lazy(() =>
    import(
        /* webpackChunkName: "ErrorNotFound" */ "../../pages/error/ErrorNotFound"
    )
);
//const ErrorAccessDenied = lazy(() => import(/* webpackChunkName: "ErrorNotFound" */ '../../pages/error/ErrorAccessDenied'));

const generateRoutes = (basePath, components, roles) =>
    components.map(({ path, Component }) => ({
        path: `${path}`,
        link: `${basePath}${path}`,
        Component,
        roles,
    }));

export const authRoutes = {
    path: "auth/login/*",
    link: "auth/login",
    Component: AuthPage,
};

const helpdeskGerenciaRoutes = generateRoutes(
    "helpdesk/gerencia",
    [
        { path: "cerrar-soportes", Component: SoporteCalificacionPage },
        { path: "indicadores-soportes", Component: IndicadorReportPage },
        { path: "dashboard", Component: DashGerenciaPage },
        { path: "usuarios", Component: AdminUsersPage },
        { path: "direcciones", Component: AdminDireccionesPage },
        { path: "tecnicos", Component: AdminTecnicosPage },
        {
            path: "configuracion-inventario/:tabValue/*",
            Component: ConfigInventarioPage,
        },
        { path: "inventario/equipos", Component: InvEquiposPage },
        { path: "inventario/consumibles", Component: InvConsumiblePage },
    ],
    [Roles.TIC_GERENTE]
);

const helpdeskTecnicoRoutes = generateRoutes(
    "helpdesk",
    [
        { path: "solicitudes-actuales", Component: SolicitudesActualesPage },
        { path: "soportes", Component: SoportesPage },
        { path: "reporte-soportes", Component: ReporteSoportes },
    ],
    [Roles.TIC_GERENTE, Roles.TIC_TECNICO]
);

const permisosAdminRoutes = generateRoutes(
    "permisos/gerencia",
    [
        { path: "ver-permisos", Component: ListPermisosAdminPage },
        { path: "consolidado-permisos", Component: ConsolidadoPermisosPage },
        { path: "autorizar-permisos", Component: AutorizarPermisosPage },
    ],
    [Roles.TIC_GERENTE, Roles.NOM_ASISTENCIA]
);

const peerRoutes = generateRoutes(
    "intranet",
    [
        { path: "home", Component: HomePage },
        { path: "profile", Component: ProfilePage },
        { path: "change-password", Component: ChangePwdPage },
        { path: "ver-marcaciones", Component: MarcacionPage },

        { path: "permiso", Component: PermisosPage },
        { path: "ver-permisos", Component: ListPermisosPage },

        { path: "agregar-actividad", Component: ActividadPage },
        { path: "lista-actividades", Component: ListActividadesPage },

        { path: "solicitud-soporte", Component: SolicitudPage },
        { path: "soportes/:soporteValue", Component: UserSoportesPage },
    ],
    [""]
);

export const routes = {
    HELPDESK_GERENCIA: helpdeskGerenciaRoutes,
    HELPDESK_TECNICO: helpdeskTecnicoRoutes,

    NOM_PERMISOS: permisosAdminRoutes,
};

export const peerLinks = {
    peer: peerRoutes,
};

export const errorRoutes = [
    {
        path: "*",
        Component: ErrorNotFound,
    },
];

/* Menu de Perfil de Usuario */
export const menuRoutes = [
    /* Menu Header */

    {
        label: "Ver Perfil",
        path: "profile",
        link: "/intranet/profile",
        icon: IconUserHexagon,
        color: "#12b561",
    },
    {
        label: "Cambiar contraseña",
        path: "change-password",
        link: "/intranet/change-password",
        icon: IconSettings,
        color: "#6d7c85",
    },
    {
        label: "Ver marcaciones",
        path: "ver-marcaciones",
        link: "/intranet/ver-marcaciones",
        icon: IconFingerprint,
        color: "#067ebf",
    },
    {
        label: "Cerrar sesión",
        path: "cerrar-sesion",
        link: "",
        icon: IconLogout,
        color: "#cc003d",
    },
];
