import { IconCategory, IconChartPieFilled, IconDeviceImac, IconTransferIn } from "@tabler/icons-react";

export const Roles = {
    GERENTE: 'GERENTE',
    TECNICO: 'TECNICO',
    USUARIO: 'USUARIO'
  }

export const lGerente = [
    {
        label: "Dashboard",
        icon: IconChartPieFilled,
        links: [{ label: "Inicio", link: "/gerencia/dashboard" }],
    },
    {
        label: "Administración",
        icon: IconCategory,
        links: [
            { label: "Gestionar Usuarios", link: "/gerencia/usuarios" },
            { label: "Gestionar Direcciones", link: "/gerencia/direcciones" }
        ],
    },
    {
        label: "Solicitudes",
        icon: IconTransferIn,
        links: [
            { label: "Solicitudes actuales", link: "/gerencia/solicitudes-actuales" },
            { label: "Solicitudes Anuladas", link: "/gerencia/solicitudes-anuladas" }
        ],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        links: [
            { label: "Gestionar Soportes", link: "/gerencia/soportes" },
            //{ label: "Buscar Soportes", link: "/gerencia/busqueda-soportes" }, //Por rango de fechas o tecnico o por departamento
        ],
    },
];


export const lTecnico = [
    {
        label: "Dashboard",
        icon: IconChartPieFilled,
        links: [{ label: "Inicio", link: "/" }],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        links: [
            { label: "Soportes asignados", link: "/tecnico/soportes" },
            { label: "Administrar soportes", link: "/tecnico/administrar-soportes" }, //Busqueda por departamento o fechas
        ],
    },
];

export const lUsuario = [
    {
        label: "Dashboard",
        icon: IconChartPieFilled,
        links: [{ label: "Inicio", link: "/" }],
    },
]
