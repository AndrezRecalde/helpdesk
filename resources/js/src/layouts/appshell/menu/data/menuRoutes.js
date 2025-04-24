import {
    IconBuilding,
    IconCertificate,
    IconChartBar,
    IconCopyCheck,
    IconCpu,
    IconDeviceDesktopCheck,
    IconDeviceDesktopCog,
    IconDeviceImac,
    IconDeviceImacBolt,
    IconEditCircle,
    IconEyeCheck,
    IconFileDescription,
    IconFingerprint,
    IconLicense,
    IconList,
    IconListCheck,
    IconLogout,
    IconPencilPlus,
    IconSettings,
    IconTransferIn,
    IconUserHexagon,
    IconUsers,
} from "@tabler/icons-react";
import { Roles } from "../../../../helpers/dictionary";

/* Menu de TICs */
export const NavMenuTics = {
    Soportes: [
        {
            icon: IconTransferIn,
            title: "Solicitudes Actuales",
            path: "solicitudes-actuales",
            link: "/helpdesk/solicitudes-actuales",
            roles: [Roles.TIC_GERENTE, Roles.TIC_TECNICO],
        },
        {
            icon: IconDeviceDesktopCog,
            title: "Gestionar Soportes",
            path: "soportes",
            link: "/helpdesk/soportes",
            roles: [Roles.TIC_GERENTE, Roles.TIC_TECNICO],
        },
        {
            icon: IconFileDescription,
            title: "Reporte de Soporte",
            path: "reporte-soportes",
            link: "/helpdesk/reporte-soportes",
            roles: [Roles.TIC_GERENTE, Roles.TIC_TECNICO],
        },
        {
            icon: IconDeviceDesktopCheck,
            title: "Cerrar Soportes",
            path: "cerrar-soportes",
            link: "/helpdesk/gerencia/cerrar-soportes",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconCertificate,
            title: "Indicadores de Soporte",
            path: "indicadores-soportes",
            link: "/helpdesk/gerencia/indicadores-soportes",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconChartBar,
            title: "Dashboard",
            path: "dashboard",
            link: "/helpdesk/gerencia/dashboard",
            roles: [Roles.TIC_GERENTE],
        },
    ],

    Inventario: [
        {
            icon: IconListCheck,
            title: "Configuracion de Inventario",
            path: "configuracion-inventario/:tabValue/*",
            link: "/helpdesk/gerencia/configuracion-inventario/categorias",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconDeviceImac,
            title: "Equipos",
            path: "inventario/equipos",
            link: "/helpdesk/gerencia/inventario/equipos",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconCpu,
            title: "Consumibles",
            path: "inventario/consumibles",
            link: "/helpdesk/gerencia/inventario/consumibles",
            roles: [Roles.TIC_GERENTE],
        },
    ],
};
/* Menu de Admin TICs */
export const NavMenuAdminTics = {
    Administracion: [
        {
            icon: IconUsers,
            title: "Gestionar Usuarios",
            path: "usuarios",
            link: "/helpdesk/gerencia/usuarios",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconBuilding,
            title: "Gestionar Direcciones",
            path: "direcciones",
            link: "/helpdesk/gerencia/direcciones",
            roles: [Roles.TIC_GERENTE],
        },
        {
            icon: IconUsers,
            title: "Gestionar Tecnicos",
            path: "tecnicos",
            link: "/helpdesk/gerencia/tecnicos",
            roles: [Roles.TIC_GERENTE],
        },
    ],
};
/* Menu de Permisos Admin */
export const NavMenuPermisosAdmin = {
    Permisos: [
        {
            icon: IconLicense,
            title: "Ver Permisos (A)",
            path: "ver-permisos",
            link: "/permisos/gerencia/ver-permisos",
            roles: [Roles.TIC_GERENTE, Roles.NOM_ASISTENCIA],
        },
        {
            icon: IconLicense,
            title: "Consolidado Permisos",
            path: "consolidado-permisos",
            link: "/permisos/gerencia/consolidado-permisos",
            roles: [Roles.TIC_GERENTE, Roles.NOM_ASISTENCIA],
        },
        {
            icon: IconCopyCheck,
            title: "Autorizar Permisos",
            path: "autorizar-permisos",
            link: "/permisos/gerencia/autorizar-permisos",
            roles: [Roles.TIC_GERENTE, Roles.NOM_ASISTENCIA],
        },
    ],
};
/* Menu Rápido de Usuarios */
export const MenuRapido = [
    {
        icon: IconDeviceImacBolt,
        title: "Solicitar Soporte",
        path: "solicitud-soporte",
        link: "/intranet/solicitud-soporte",
        roles: [""],
    },
    {
        icon: IconList,
        title: "Mis Soportes Solicitados",
        path: "soportes/:soporteValue",
        link: "/intranet/soportes/actuales",
        roles: [""],
    },
    {
        icon: IconLicense,
        title: "Solicitar Permisos",
        path: "permiso",
        link: "/intranet/permiso",
        roles: [""],
    },
    {
        icon: IconEyeCheck,
        title: "Ver Mis Permisos",
        path: "ver-permisos",
        link: "/intranet/ver-permisos",
        roles: [""],
    },
    /* {
        icon: IconBeach,
        title: "Solicitar Vacaciones",
        path: "solicitud-soporte",
        link: "/intranet/solicitud-soporte",
        roles: [""],
    },
    {
        icon: IconList,
        title: "Reporte Vacaciones",
        path: "soportes/:soporteValue",
        link: "/intranet/soportes/actuales",
        roles: [""],
    }, */
    {
        icon: IconEditCircle,
        title: "Agregar Actividad",
        path: "agregar-actividad",
        link: "/intranet/agregar-actividad",
        roles: [""],
    },
    {
        icon: IconListCheck,
        title: "Listar Actividades",
        path: "lista-actividades",
        link: "/intranet/lista-actividades",
        roles: [""],
    },
];

/* Menu de Perfil de Usuario */
export const menuProfile = [
    /* Menu Header */

    {
        label: "Ver Perfil",
        path: "profile",
        link: "/intranet/profile",
        icon: IconUserHexagon,
        color: "#5c7cfa",
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
        link: "/intranet/marcaciones-biometricos",
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

export const menuHome = [
    {
        title: "Ver mi perfil",
        icon: IconUserHexagon,
        color: "indigo",
        link: "/intranet/profile",
    },
    {
        title: "Marcaciones Biometricos",
        icon: IconFingerprint,
        color: "blue",
        link: "/intranet/marcaciones-biometricos",
    },
    /* {
        title: "Cambiar contrasena",
        icon: IconSettings,
        color: "gray",
        link: "/intranet/change-password",
    }, */
    {
        title: "Solicitar Soporte",
        icon: IconDeviceImacBolt,
        color: "teal",
        link: "/intranet/solicitud-soporte",
    },
    {
        title: "Mis Soportes Solicitados",
        icon: IconList,
        color: "teal",
        link: "/intranet/soportes/actuales",
    },
    {
        title: "Solicitar Permiso",
        icon: IconLicense,
        color: "blue",
        link: "/intranet/permiso",
    },
    {
        title: "Ver mis permisos",
        icon: IconEyeCheck,
        color: "blue",
        link: "/intranet/ver-permisos",
    },
    {
        title: "Agregar actividad",
        icon: IconPencilPlus,
        color: "violet",
        link: "/intranet/agregar-actividad",
    },
    {
        title: "Listar actividades",
        icon: IconListCheck,
        color: "violet",
        link: "/intranet/lista-actividades",
    },
    /* { title: "Cashback", icon: IconCashBanknote, color: "orange" }, */
];
