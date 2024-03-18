import { IconCategory, IconChartPieFilled, IconDeviceImac, IconPencilPlus, IconTransferIn } from "@tabler/icons-react";

export const Roles = {
    GERENTE: 'GERENTE',
    TECNICO: 'TECNICO',
    USUARIO: 'USUARIO'
  }

export const lGerente = [
    {
        label: "Dashboard",
        icon: IconChartPieFilled,
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
            { label: "Gestionar Técnicos", link: "/gerencia/tecnicos" }

        ],
    },
    {
        label: "Solicitudes",
        icon: IconTransferIn,
        initiallyOpened: true,
        links: [
            { label: "Solicitudes actuales", link: "/gerencia/solicitudes-actuales" },
            { label: "Solicitudes Anuladas", link: "/gerencia/solicitudes-anuladas" }
        ],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        initiallyOpened: true,
        links: [
            { label: "Gestionar Soportes", link: "/gerencia/soportes" },
            { label: "Indicadores de Soporte", link: "/gerencia/indicadores-soportes" },
            { label: "Reporte de Soportes", link: "/gerencia/reporte-soportes" },
        ],
    },
];


export const lTecnico = [
    {
        label: "Dashboard",
        icon: IconChartPieFilled,
        initiallyOpened: true,
        links: [{ label: "Inicio", link: "/" }],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        initiallyOpened: true,
        links: [
            { label: "Soportes asignados", link: "/tecnico/solicitudes-actuales" },
            { label: "Gestionar Soportes", link: "/tecnico/soportes" },
            { label: "Reporte de Soportes", link: "/tecnico/reporte-soportes" },
        ],
    },
];

export const lUsuario = [
    {
        label: "Actividades",
        icon: IconPencilPlus,
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
            { label: "Mis soportes", link: "/gad/d/lista-soportes" },
        ],
    },
]
