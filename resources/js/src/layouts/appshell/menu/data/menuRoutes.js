import {
    IconBeach,
    IconBuilding,
    IconCertificate,
    IconChartBar,
    IconCopyCheck,
    IconCpu,
    IconDeviceDesktopCheck,
    IconDeviceDesktopCog,
    IconDeviceImac,
    IconDeviceImacBolt,
    IconEyeCheck,
    IconFileDescription,
    IconFingerprint,
    IconLicense,
    IconList,
    IconListCheck,
    IconListDetails,
    IconListSearch,
    IconLogout,
    IconMessageReport,
    IconOctagonMinus,
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
    Aplicacion: [
        {
            icon: IconSettings,
            title: "Configuracion de la App",
            path: "configuracion-app",
            link: "/helpdesk/gerencia/configuracion-app",
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
    Vacaciones: [
        {
            icon: IconBeach,
            title: "Crear solicitud",
            path: "vacaciones",
            link: "/intranet/vacaciones",
            roles: [Roles.TIC_GERENTE, Roles.NOM_VACACIONES],
        },
        {
            icon: IconListSearch,
            title: "Solicitudes Vacaciones",
            path: "solicitudes-vacaciones",
            link: "/intranet/solicitudes-vacaciones",
            roles: [Roles.NOM_VACACIONES],
        },
        {
            icon: IconListDetails,
            title: "Periodos Vacaciones",
            path: "periodos-vacaciones",
            link: "/intranet/periodos-vacaciones",
            roles: [Roles.NOM_VACACIONES],
        },
        {
            icon: IconOctagonMinus,
            title: "Descuentos Vacaciones",
            path: "descuentos-vacaciones",
            link: "/intranet/descuentos-vacaciones",
            roles: [Roles.NOM_VACACIONES],
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
        title: "Soportes Solicitados",
        path: "soportes",
        link: "/intranet/soportes",
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
    {
        icon: IconBeach,
        title: "Solicitar Vacaciones",
        path: "solicitud-soporte",
        link: "/intranet/solicitud-soporte",
        roles: [""],
    },
    {
        icon: IconList,
        title: "Solicitudes Vacaciones",
        path: "soportes",
        link: "/intranet/soportes",
        roles: [""],
    },
    {
        icon: IconPencilPlus,
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
        label: "Reportar abuso",
        path: "reportar-abuso",
        link: "/intranet/reportar-abuso",
        icon: IconMessageReport,
        color: "#ac0505",
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
        description: "Accede a la información de tu perfil.",
        icon: IconUserHexagon,
        color: "teal",
        link: "/intranet/profile",
    },
    {
        title: "Solicitar Soporte",
        description: "Solicita asistencia técnica para tus equipos.",
        icon: IconDeviceImacBolt,
        color: "teal",
        link: "/intranet/solicitud-soporte",
    },
    {
        title: "Soportes Solicitados",
        description: "Revisa tus solicitudes de soporte técnico.",
        icon: IconDeviceDesktopCheck,
        color: "teal",
        link: "/intranet/soportes",
    },

    {
        title: "Agregar actividad",
        description: "Añade una nueva actividad a tu lista.",
        icon: IconPencilPlus,
        color: "teal",
        link: "/intranet/agregar-actividad",
    },
    {
        title: "Listar actividades",
        description: "Consulta todas tus actividades registradas.",
        icon: IconListCheck,
        color: "teal",
        link: "/intranet/lista-actividades",
    },
    /* { title: "Cashback", icon: IconCashBanknote, color: "orange" }, */
];

export const menuHomeContratados = [
    {
        title: "Mis Marcaciones",
        description: "Consulta tus marcaciones biométricas.",
        icon: IconFingerprint,
        color: "teal",
        link: "/intranet/marcaciones-biometricos",
    },
    {
        title: "Solicitar Permiso",
        description: "Envía una solicitud de permiso 4 horas.",
        icon: IconLicense,
        color: "teal",
        link: "/intranet/permiso",
    },
    {
        title: "Mis permisos",
        description: "Consulta tus permisos 4 horas solicitados.",
        icon: IconEyeCheck,
        color: "teal",
        link: "/intranet/ver-permisos",
    },
    {
        title: "Solicitar Vacaciones",
        description: "Envía una solicitud de vacaciones.",
        icon: IconBeach,
        color: "teal",
        link: "/intranet/vacaciones",
    },
    {
        title: "Solicitudes Vacaciones",
        description: "Consulta el reporte de vacaciones.",
        icon: IconList,
        color: "teal",
        link: "/intranet/solicitudes-vacaciones",
    },
];
