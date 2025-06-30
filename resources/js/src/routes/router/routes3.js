import { lazy } from "react";
import {
    IconCategory,
    IconChartPie,
    IconDeviceImacStar,
    IconDevicesShare,
    IconFingerprint,
    IconLicense,
    IconListCheck,
    IconLogout,
    IconSettings,
    IconUserHexagon,
} from "@tabler/icons-react";

const AuthPage = lazy(() => import(/* webpackChunkName: "AuthPage" */ '../../pages/auth/AuthPage'));

const DashGerenciaPage = lazy(() => import(/* webpackChunkName: "DashGerenciaPage" */ '../../pages/dashboard/gerencia/DashGerenciaPage'));
const AdminUsersPage = lazy(() => import(/* webpackChunkName: "AdminUsersPage" */ '../../pages/gerencia/AdminUsersPage'));
const AdminDireccionesPage = lazy(() => import(/* webpackChunkName: "AdminDireccionesPage" */ '../../pages/gerencia/AdminDireccionesPage'));
const AdminTecnicosPage = lazy(() => import(/* webpackChunkName: "AdminTecnicosPage" */ '../../pages/gerencia/AdminTecnicosPage'));
const SolicitudesActualesPage = lazy(() => import(/* webpackChunkName: "SolicitudesActualesPage" */ '../../pages/solicitud/SolicitudesActualesPage'));
const SoportesPage = lazy(() => import(/* webpackChunkName: "SoportesPage" */ '../../pages/soporte/SoportesPage'));
const SoporteCalificacionPage = lazy(() => import(/* webpackChunkName: "SoporteCalificacionPage" */ '../../pages/soporte/SoporteCalificacionPage'));
const IndicadorReportPage = lazy(() => import(/* webpackChunkName: "IndicadorReportPage" */ '../../pages/soporte/reporte/IndicadorReportPage'));
const ReporteSoportes = lazy(() => import(/* webpackChunkName: "ReporteSoportes" */ '../../pages/soporte/reporte/ReporteSoportes'));
const ConfigInventarioPage = lazy(() => import(/* webpackChunkName: "ConfigInventarioPage" */ '../../pages/inventario/ConfigInventarioPage'));
const InvEquiposPage = lazy(() => import(/* webpackChunkName: "InvEquiposPage" */ '../../pages/inventario/equipo/InvEquiposPage'));
const InvConsumiblePage = lazy(() => import(/* webpackChunkName: "InvConsumiblePage" */ '../../pages/inventario/consumible/InvConsumiblePage'));
const ActividadPage = lazy(() => import(/* webpackChunkName: "ActividadPage" */ '../../pages/actividad/ActividadPage'));
const ListActividadesPage = lazy(() => import(/* webpackChunkName: "ListActividadesPage" */ '../../pages/actividad/ListActividadesPage'));
const PermisosPage = lazy(() => import(/* webpackChunkName: "PermisosPage" */ '../../pages/permisos/PermisosPage'));
const ListPermisosAdminPage = lazy(() => import(/* webpackChunkName: "ListPermisosAdminPage" */ '../../pages/permisos/ListPermisosAdminPage'));
const ConsolidadoPermisosPage = lazy(() => import(/* webpackChunkName: "ListPermisosAdminPage" */ '../../pages/permisos/ConsolidadoPermisosPage'));

const ListPermisosPage = lazy(() => import(/* webpackChunkName: "ListPermisosPage" */ '../../pages/permisos/ListPermisosPage'));
const SolicitudPage = lazy(() => import(/* webpackChunkName: "SolicitudPage" */ '../../pages/solicitud/SolicitudPage'));
const UserSoportesPage = lazy(() => import(/* webpackChunkName: "UserSoportesPage" */ '../../pages/soporte/UserSoportesPage'));

const ProfilePage = lazy(() => import(/* webpackChunkName: "ProfilePage" */ '../../pages/user/ProfilePage'));
const ChangePwdPage = lazy(() => import(/* webpackChunkName: "ChangePwdPage" */ '../../pages/user/ChangePwdPage'));
const MarcacionPage = lazy(() => import(/* webpackChunkName: "MarcacionPage" */ '../../pages/marcacion/MarcacionPage'));


const ErrorNotFound = lazy(() => import(/* webpackChunkName: "ErrorNotFound" */ '../../pages/error/ErrorNotFound'));
//const ErrorAccessDenied = lazy(() => import(/* webpackChunkName: "ErrorNotFound" */ '../../pages/error/ErrorAccessDenied'));


const generateRoutes = (basePath, components, roles) =>
    components.map(({ path, Component }) => ({
        path: `${path}`,
        link: `${basePath}${path}`,
        Component,
        roles,
    }));

export const authRoutes =
    {
        path: "auth/login/*",
        link: "auth/login",
        Component: AuthPage,
    }

const gerenciaRoutes = generateRoutes(
    "gerencia",
    [
        { path: "dashboard", Component: DashGerenciaPage },
        { path: "usuarios", Component: AdminUsersPage },
        { path: "direcciones", Component: AdminDireccionesPage },
        { path: "tecnicos", Component: AdminTecnicosPage },
        { path: "solicitudes-actuales", Component: SolicitudesActualesPage },
        { path: "soportes", Component: SoportesPage },
        { path: "cerrar-soportes", Component: SoporteCalificacionPage },
        { path: "indicadores-soportes", Component: IndicadorReportPage },
        { path: "reporte-soportes", Component: ReporteSoportes },
        {
            path: "configuracion-inventario/:tabValue/*",
            Component: ConfigInventarioPage,
        },
        { path: "inventario/equipos", Component: InvEquiposPage },
        { path: "inventario/consumibles", Component: InvConsumiblePage },
        { path: "agregar-actividad", Component: ActividadPage },
        { path: "lista-actividades", Component: ListActividadesPage },
        { path: "permiso", Component: PermisosPage },
        { path: "ver-permisos", Component: ListPermisosAdminPage },
        { path: "consolidado-permisos", Component: ConsolidadoPermisosPage },
    ],
    ["GERENTE"]
);

const tecnicoRoutes = generateRoutes(
    "tecnico",
    [
        { path: "solicitudes-actuales", Component: SolicitudesActualesPage },
        { path: "soportes", Component: SoportesPage },
        { path: "reporte-soportes", Component: ReporteSoportes },
        { path: "agregar-actividad", Component: ActividadPage },
        { path: "lista-actividades", Component: ListActividadesPage },
        { path: "permiso", Component: PermisosPage },
        { path: "general/ver-permisos", Component: ListPermisosPage },
    ],
    ["TECNICO"]
);

const usuarioRoutes = generateRoutes(
    "staff",
    [
        { path: "solicitud", Component: SolicitudPage },
        { path: "soportes", Component: UserSoportesPage },
        { path: "agregar-actividad", Component: ActividadPage },
        { path: "lista-actividades", Component: ListActividadesPage },
        { path: "permiso", Component: PermisosPage },
        { path: "general/ver-permisos", Component: ListPermisosPage },
    ],
    ["USUARIO"]
);

const peerRoutes = generateRoutes(
    "staff/d",
    [
        { path: "profile", Component: ProfilePage },
        { path: "change-password", Component: ChangePwdPage },
        { path: "ver-marcaciones", Component: MarcacionPage },
    ],
    [""]
);

export const routes = {
    //auth: authRoutes,
    gerencia: gerenciaRoutes,
    tecnico: tecnicoRoutes,
    usuario: usuarioRoutes,
    //peer: peerRoutes,
};

export const peerLinks = {
    peer: peerRoutes
}

export const errorRoutes = [
    {
        path: "*",
        Component: ErrorNotFound,
    },
];




export const navRoutes = [
    /* GERENCIA DE SOPORTE TECNICO */
    {
        label: "Dashboard",
        icon: IconChartPie,
        initiallyOpened: true,
        roles: ["GERENTE"],
        links: [
            {
                label: "Inicio",
                path: "dashboard",
                link: "/dashboard",
                //Component: DashGerenciaPage,
                roles: ["GERENTE"],
            },
        ],
    },
    {
        label: "Administración",
        icon: IconCategory,
        initiallyOpened: true,
        roles: ["GERENTE"],
        links: [
            {
                label: "Gestionar Usuarios",
                path: "usuarios",
                link: "/usuarios",
                //Component: AdminUsersPage,
                roles: ["GERENTE"],
            },
            {
                label: "Gestionar Direcciones",
                path: "direcciones",
                link: "/direcciones",
                //Component: AdminDireccionesPage,
                roles: ["GERENTE"],
            },
            {
                label: "Gestionar Técnicos",
                path: "tecnicos",
                link: "/tecnicos",
                //Component: AdminTecnicosPage,
                roles: ["GERENTE"],
            },
        ],
    },
    {
        label: "Soportes",
        icon: IconDeviceImacStar,
        initiallyOpened: true,
        roles: ["GERENTE", "TECNICO"],
        links: [
            {
                label: "Solicitudes actuales", //GERENTE, TECNICO
                path: "solicitudes-actuales",
                link: "/solicitudes-actuales",
                //Component: SolicitudesActualesPage,
                roles: ["GERENTE", "TECNICO"],
            },
            {
                label: "Gestionar Soportes", //GERENTE, TECNICO
                path: "soportes",
                link: "/soportes",
                //Component: SoportesPage,
                roles: ["GERENTE", "TECNICO"],
            },
            {
                label: "Cerrar Soportes",
                path: "cerrar-soportes",
                link: "/cerrar-soportes",
                //Component: SoporteCalificacionPage,
                roles: ["GERENTE"],
            },
            {
                label: "Indicadores de Soporte",
                path: "indicadores-soportes",
                link: "/indicadores-soportes",
                //Component: IndicadorReportPage,
                roles: ["GERENTE"],
            },
            {
                label: "Reporte de Soportes", //GERENTE, TECNICO
                path: "reporte-soportes",
                link: "/reporte-soportes",
                //Component: ReporteSoportes,
                roles: ["GERENTE", "TECNICO"],
            },
        ],
    },
    {
        label: "Inventario",
        icon: IconDevicesShare,
        initiallyOpened: true,
        roles: ["GERENTE"],
        links: [
            {
                label: "Config. Inventario",
                path: "configuracion-inventario/:tabValue/*",
                link: "/configuracion-inventario/categorias",
                //Component: ConfigInventarioPage,
                roles: ["GERENTE"],
            },
            {
                label: "Inv. Equipos",
                path: "inventario/equipos",
                link: "/inventario/equipos",
                //Component: InvEquiposPage,
                roles: ["GERENTE"],
            },
            {
                label: "Inv. Componentes",
                path: "inventario/componentes",
                link: "/inventario/componentes",
                roles: ["GERENTE"],
            },
            {
                label: "Inv. Consumibles",
                path: "inventario/consumibles",
                link: "/inventario/consumibles",
                roles: ["GERENTE"],
            },
        ],
    },
    /* GERENCIA, TECNICOS Y USUARIOS */
    {
        label: "Actividades",
        icon: IconListCheck,
        initiallyOpened: true,
        roles: ["GERENTE", "TECNICO", "USUARIO"],
        links: [
            {
                label: "Agregar actividad",
                path: "agregar-actividad",
                link: "/agregar-actividad",
                //Component: ActividadPage,
                roles: ["GERENTE", "TECNICO", "USUARIO"],
            },
            {
                label: "Lista actividades",
                path: "lista-actividades",
                link: "/lista-actividades",
                //Component: ListActividadesPage,
                roles: ["GERENTE", "TECNICO", "USUARIO"],
            },
        ],
    },
    {
        label: "Permisos 4 horas",
        icon: IconLicense,
        initiallyOpened: true,
        roles: ["GERENTE", "TECNICO", "USUARIO"],
        links: [
            {
                label: "Solicitar Permisos", //GERENTE, TECNICO, USUARIO
                path: "permiso",
                link: "/permiso",
                //Component: PermisosPage,
                roles: ["GERENTE", "TECNICO", "USUARIO"],
            },
            {
                label: "Ver Permisos", //GERENTE
                path: "ver-permisos",
                link: "/ver-permisos",
                //Component: ListPermisosAdminPage,
                roles: ["GERENTE"],
            },
            {
                label: "Ver Permisos General", //GERENTE, TECNICO, USUARIO
                path: "ver-permisos",
                link: "/general/ver-permisos",
                //Component: ListPermisosPage,
                roles: ["TECNICO", "USUARIO"],
            },
            {
                label: "Consolidado Permisos", //GERENTE, TECNICO, USUARIO
                path: "consolidado-permisos",
                link: "/consolidado-permisos",
                //Component: ListPermisosPage,
                roles: ["GERENTE",],
            },
        ],
    },

    /* USUARIOS */
    {
        label: "Solicitar Soporte",
        icon: IconDeviceImacStar,
        initiallyOpened: true,
        roles: ["USUARIO"],
        links: [
            {
                label: "Solicitar soporte",
                path: "solicitud",
                link: "/solicitud",
                roles: ["USUARIO"],
                //Component: SolicitudPage,
            },
            {
                label: "Mis soportes",
                path: "soportes",
                link: "/soportes/actuales",
                roles: ["USUARIO"],
                //Component: UserSoportesPage,
            },
        ],
    },
];

export const menuRoutes = [
    /* Menu Header */

    {
        label: "Ver Perfil",
        path: "profile",
        link: "/staff/d/profile",
        icon: IconUserHexagon,
        color: "#12b561",
    },
    {
        label: "Cambiar contraseña",
        path: "change-password",
        link: "/staff/d/change-password",
        icon: IconSettings,
        color: "#6d7c85",
    },
    {
        label: "Ver marcaciones",
        path: "ver-marcaciones",
        link: "/staff/d/ver-marcaciones",
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
