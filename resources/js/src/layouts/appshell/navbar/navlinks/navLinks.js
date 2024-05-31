import {
    IconCategory,
    IconDeviceImac,
    IconLicense,
    IconTransferIn,
    IconListCheck,
    IconChartPie,
} from "@tabler/icons-react";

export const Roles = {
    GERENTE: "GERENTE",
    TECNICO: "TECNICO",
    USUARIO: "USUARIO",
};

export const lGerente = [
    {
        label: "Dashboard",
        icon: IconChartPie,
        initiallyOpened: true,
        links: [{ label: "Inicio", link: "/gerencia/dashboard" }],
    },
    {
        label: "Administración",
        icon: IconCategory,
        initiallyOpened: true,
        links: [
            { label: "Gestionar Usuarios", link: "/gerencia/usuarios" },
            { label: "Gestionar Direcciones", link: "/gerencia/direcciones" },
            { label: "Gestionar Técnicos", link: "/gerencia/tecnicos" },
        ],
    },
    {
        label: "Solicitudes",
        icon: IconTransferIn,
        initiallyOpened: true,
        links: [
            {
                label: "Solicitudes actuales",
                link: "/gerencia/solicitudes-actuales",
            },
            {
                label: "Solicitudes Anuladas",
                link: "/gerencia/solicitudes-anuladas",
            },
        ],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        initiallyOpened: true,
        links: [
            { label: "Gestionar Soportes", link: "/gerencia/soportes" },
            { label: "Cerrar Soportes", link: "/gerencia/cerrar-soportes" },
            {
                label: "Indicadores de Soporte",
                link: "/gerencia/indicadores-soportes",
            },
            {
                label: "Reporte de Soportes",
                link: "/gerencia/reporte-soportes",
            },
        ],
    },
    {
        label: "Actividades",
        icon: IconListCheck,
        initiallyOpened: true,
        links: [
            { label: "Agregar actividad", link: "/gerencia/agregar-actividad" },
            { label: "Lista actividades", link: "/gerencia/lista-actividades" },
        ],
    },
    {
        label: "Permisos 4 horas",
        icon: IconLicense,
        initiallyOpened: true,
        links: [
            { label: "Solicitar Permisos", link: "/gerencia/permiso" },
            { label: "Ver Permisos General", link: "/gerencia/ver-permisos" },
        ],
    },
];

export const lTecnico = [
    /* {
        label: "Dashboard",
        icon: IconChartPieFilled,
        initiallyOpened: true,
        links: [{ label: "Inicio", link: "/" }],
    }, */
    {
        label: "Actividades",
        icon: IconListCheck,
        initiallyOpened: true,
        links: [
            { label: "Agregar actividad", link: "/tecnico/agregar-actividad" },
            { label: "Lista actividades", link: "/tecnico/lista-actividades" },
        ],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        initiallyOpened: true,
        links: [
            {
                label: "Soportes asignados",
                link: "/tecnico/solicitudes-actuales",
            },
            { label: "Gestionar Soportes", link: "/tecnico/soportes" },
            { label: "Reporte de Soportes", link: "/tecnico/reporte-soportes" },
        ],
    },
    {
        label: "Permisos 4 horas",
        icon: IconLicense,
        initiallyOpened: true,
        links: [
            { label: "Solicitar Permisos", link: "/tecnico/permiso" },
            { label: "Ver Permisos", link: "/tecnico/ver-permisos" },
        ],
    },
];

export const lUsuario = [
    {
        label: "Actividades",
        icon: IconListCheck,
        initiallyOpened: true,
        links: [
            { label: "Agregar actividad", link: "/gad/d/agregar-actividad" },
            { label: "Lista actividades", link: "/gad/d/lista-actividades" },
        ],
    },
    {
        label: "Soporte",
        icon: IconDeviceImac,
        initiallyOpened: true,
        links: [
            { label: "Solicitar soporte", link: "/gad/d/solicitud" },
            { label: "Mis soportes", link: "/gad/d/soportes/actuales" },
        ],
    },
    {
        label: "Permisos 4 horas",
        icon: IconLicense,
        initiallyOpened: true,
        links: [
            { label: "Solicitar Permisos", link: "/gad/d/permiso" },
            { label: "Ver Permisos", link: "/gad/d/ver-permisos" },
        ],
    },
];
