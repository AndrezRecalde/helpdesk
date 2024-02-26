import { IconCategory, IconChartPieFilled, IconDeviceImac, IconTransferIn } from "@tabler/icons-react";


export const lGerente = [
    {
        label: "Dashboard",
        icon: IconChartPieFilled,
        links: [{ label: "Inicio", link: "/" }],
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
            { label: "Solicitudes actuales", link: "/g/gerencia/solicitudes-actuales" },
            { label: "Buscar Solicitudes", link: "/g/gerencia/busqueda-solicitudes" }, //Por rango de fechas o tecnico o por departamento
            { label: "Solicitudes Anuladas", link: "/g/gerencia/solicitudes-anuladas" }
        ],
    },
    {
        label: "Soportes",
        icon: IconDeviceImac,
        links: [
            { label: "Gestionar Soportes", link: "/gerencia/soportes" },
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
