import {
    IconBeach,
    IconBrandTelegram,
    IconBuilding,
    IconCategory,
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
    IconShieldCheck,
    IconTransferIn,
    IconUserHexagon,
    IconUsers,
} from "@tabler/icons-react";
import { Roles } from "../../../../helpers/dictionary";

/**
 * Cada ítem de menú tiene dos arrays de acceso (lógica OR entre ambos):
 *   - roles:       el usuario tiene AL MENOS UNO de estos roles.
 *   - permissions: el usuario tiene AL MENOS UNO de estos permisos.
 *
 * Si alguna de las dos condiciones se cumple, el ítem es visible.
 * El GERENTE ve todo mediante el array `roles: [Roles.GERENTE]`.
 * Los técnicos/TTHH acceden por sus permisos granulares.
 */

/* ─── Menu de TICs ─── */
export const NavMenuTics = {
    Soportes: [
        {
            icon: IconTransferIn,
            title: "Solicitudes Actuales",
            path: "solicitudes-actuales",
            link: "/helpdesk/solicitudes-actuales",
            roles: [Roles.GERENTE],
            permissions: ["tic.soportes.ver"], // TIC técnico
        },
        {
            icon: IconDeviceDesktopCog,
            title: "Gestionar Soportes",
            path: "soportes",
            link: "/helpdesk/soportes",
            roles: [Roles.GERENTE],
            permissions: ["tic.soportes.ver"], // TIC técnico
        },
        {
            icon: IconFileDescription,
            title: "Reporte de Soporte",
            path: "reporte-soportes",
            link: "/helpdesk/reporte-soportes",
            roles: [Roles.GERENTE],
            permissions: ["tic.soportes.reportes"], // TIC técnico
        },
        {
            icon: IconDeviceDesktopCheck,
            title: "Cerrar Soportes",
            path: "cerrar-soportes",
            link: "/helpdesk/gerencia/cerrar-soportes",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconCertificate,
            title: "Indicadores de Soporte",
            path: "indicadores-soportes",
            link: "/helpdesk/gerencia/indicadores-soportes",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconChartBar,
            title: "Dashboard",
            path: "dashboard",
            link: "/helpdesk/gerencia/dashboard",
            roles: [Roles.GERENTE],
            permissions: [],
        },
    ],

    Inventario: [
        {
            icon: IconListCheck,
            title: "Configuracion de Inventario",
            path: "configuracion-inventario/:tabValue/*",
            link: "/helpdesk/gerencia/configuracion-inventario/categorias",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconDeviceImac,
            title: "Equipos",
            path: "inventario/equipos",
            link: "/helpdesk/gerencia/inventario/equipos",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconCpu,
            title: "Consumibles",
            path: "inventario/consumibles",
            link: "/helpdesk/gerencia/inventario/consumibles",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconBrandTelegram,
            title: "Solicitud Consumibles",
            path: "inventario/solicitudes-consumibles",
            link: "/helpdesk/gerencia/inventario/solicitudes-consumibles",
            roles: [Roles.GERENTE],
            permissions: [],
        },
    ],
};

/* ─── Menu de Administración General TIC (solo GERENTE) ─── */
export const NavMenuAdminTics = {
    Administracion: [
        {
            icon: IconUsers,
            title: "Gestionar Usuarios",
            path: "usuarios",
            link: "/helpdesk/usuarios",
            roles: [Roles.GERENTE],
            permissions: ["tic.usuarios.gestionar"],
        },
        {
            icon: IconBuilding,
            title: "Gestionar Direcciones",
            path: "direcciones",
            link: "/helpdesk/gerencia/direcciones",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconUsers,
            title: "Gestionar Tecnicos",
            path: "tecnicos",
            link: "/helpdesk/gerencia/tecnicos",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconCategory,
            title: "Gestionar Áreas Informáticas",
            path: "areas",
            link: "/helpdesk/gerencia/areas-tic",
            roles: [Roles.GERENTE],
            permissions: [],
        },
        {
            icon: IconShieldCheck,
            title: "Gestionar Roles y Permisos",
            path: "roles-permisos",
            link: "/helpdesk/gerencia/roles-permisos",
            roles: [Roles.GERENTE],
            permissions: [],
        },
    ],
    Aplicacion: [
        {
            icon: IconSettings,
            title: "Configuracion de la App",
            path: "configuracion-app",
            link: "/helpdesk/gerencia/configuracion-app",
            roles: [Roles.GERENTE],
            permissions: [],
        },
    ],
};

/* ─── Menu de Permisos / Vacaciones Admin ─── */
export const NavMenuPermisosAdmin = {
    Permisos: [
        {
            icon: IconLicense,
            title: "Ver Permisos (A)",
            path: "ver-permisos",
            link: "/permisos/gerencia/ver-permisos",
            roles: [Roles.GERENTE],
            permissions: ["tthh.asistencia.gestionar"],
        },
        {
            icon: IconLicense,
            title: "Consolidado Permisos",
            path: "consolidado-permisos",
            link: "/permisos/gerencia/consolidado-permisos",
            roles: [Roles.GERENTE],
            permissions: ["tthh.asistencia.gestionar"],
        },
        {
            icon: IconCopyCheck,
            title: "Autorizar Permisos",
            path: "autorizar-permisos",
            link: "/permisos/gerencia/autorizar-permisos",
            roles: [Roles.GERENTE],
            permissions: ["tthh.asistencia.gestionar"],
        },
    ],
    Vacaciones: [
        {
            icon: IconBeach,
            title: "Crear solicitud",
            path: "vacaciones",
            link: "/intranet/vacaciones",
            // Gerente crea solicitudes + quien gestiona vacaciones
            roles: [Roles.GERENTE],
            permissions: ["tthh.vacaciones.gestionar"],
        },
        {
            icon: IconListSearch,
            title: "Solicitudes Vacaciones",
            path: "solicitudes-vacaciones",
            link: "/intranet/solicitudes-vacaciones",
            // Solo quien gestiona vacaciones (no Gerente directo en este ítem)
            roles: [],
            permissions: ["tthh.vacaciones.gestionar"],
        },
        {
            icon: IconListDetails,
            title: "Periodos Vacaciones",
            path: "periodos-vacaciones",
            link: "/intranet/periodos-vacaciones",
            roles: [],
            permissions: ["tthh.vacaciones.gestionar"],
        },
        {
            icon: IconOctagonMinus,
            title: "Descuentos Vacaciones",
            path: "descuentos-vacaciones",
            link: "/intranet/descuentos-vacaciones",
            roles: [],
            permissions: ["tthh.vacaciones.gestionar"],
        },
    ],
    Denuncias: [
        {
            icon: IconMessageReport,
            title: "Gestionar Denuncias",
            path: "gestionar-denuncias",
            link: "/denuncias/gerencia/gestionar-denuncias",
            roles: [],
            permissions: ["tthh.denuncias.gestionar"],
        },
    ],
};

/* ─── Menu Rápido de Usuarios (sin restricción de rol) ─── */
export const MenuRapido = [
    {
        icon: IconDeviceImacBolt,
        title: "Solicitar Soporte",
        path: "solicitud-soporte",
        link: "/intranet/solicitud-soporte",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconList,
        title: "Soportes Solicitados",
        path: "soportes",
        link: "/intranet/soportes",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconLicense,
        title: "Solicitar Permisos",
        path: "permiso",
        link: "/intranet/permiso",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconEyeCheck,
        title: "Ver Mis Permisos",
        path: "ver-permisos",
        link: "/intranet/ver-permisos",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconBeach,
        title: "Solicitar Vacaciones",
        path: "solicitud-vacaciones",
        link: "/intranet/vacaciones",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconList,
        title: "Solicitudes Vacaciones",
        path: "solicitudes-vacaciones",
        link: "/intranet/solicitudes-vacaciones",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconPencilPlus,
        title: "Agregar Actividad",
        path: "agregar-actividad",
        link: "/intranet/agregar-actividad",
        roles: [""],
        permissions: [],
    },
    {
        icon: IconListCheck,
        title: "Listar Actividades",
        path: "lista-actividades",
        link: "/intranet/lista-actividades",
        roles: [""],
        permissions: [],
    },
];

/* ─── Menu de Perfil de Usuario ─── */
export const menuProfile = [
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
    //{
    // label: "Reportar abuso",
    // path: "reportar-abuso",
    // link: "/intranet/reportar-abuso",
    // icon: IconMessageReport,
    // color: "#ac0505",
    //},
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
