import { useCallback, useMemo } from "react";
import { Badge, useMantineColorScheme } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    DetailSolicitudesActualesTable,
    MenuSolicitudTable,
    MenuTable_T,
    TableContent,
} from "../../../components";
import {
    //useDireccionStore,
    useSoporteStore,
    //useTecnicoStore,
    useUiSoporte,
    //useUsersStore,
} from "../../../hooks";
import dayjs from "dayjs";
/* import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime); // Extiende Day.js con el plugin
dayjs.locale("es"); // Configura el idioma a español */
//import { useNavigate } from "react-router-dom";

export const SoportesTable = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { colorScheme } = useMantineColorScheme();
    const { isLoading, soportes, startExportSoporte, setActivateSoporte } =
        useSoporteStore();
    const {
        modalActionAsignarSoporte,
        modalActionAnularSoporte,
        modalActionCreateSoporte,
        modalActionDiagnosticar,
    } = useUiSoporte();
    /*     const { direcciones } = useDireccionStore();
    const { tecnicos } = useTecnicoStore();
    const { users } = useUsersStore(); */
    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop",
                Cell: ({ cell }) => (
                    <div>
                        <Badge color={cell.row.original.color} variant="dot">
                            {cell.row.original.numero_sop}
                        </Badge>
                    </div>
                ),
                header: "No. Soporte",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"),
                header: "Fecha - Hora",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    (row?.direccion || "SIN DIRECCION")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Departamento del solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    (row?.usuario_recibe || "SIN SOLICITANTE")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    (row?.tecnico_asignado || "NO ASIGNADO")
                        .toString()
                        .toUpperCase(), //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "estado", //access nested data with dot notation
                header: "Estado",
                Cell: ({ cell }) => (
                    <Badge
                        variant="dot"
                        radius="md"
                        color={cell.row.original.color}
                    >
                        {cell.row.original.estado}
                    </Badge>
                ),
                size: 80,
            },
        ],
        [soportes]
    );

    const handleDiagnosticar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionDiagnosticar(1);
        /* console.log(selected)
        startSearchSoporteForId(selected);
        navigate(`/gerencia/diagnostico/${selected.id_sop}`); */
    }, []);

    const handleEditar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionCreateSoporte(1);
    }, []);

    const handleAsignar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionAsignarSoporte(1);
    }, []);

    const handleAnular = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionAnularSoporte(1);
    }, []);

    const handleExportSoporte = useCallback((id_sop) => {
        startExportSoporte(id_sop);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Acciones", //change header text
                size: 80, //make actions column wider
            },
        },
        localization: MRT_Localization_ES,
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.tecnico_asignado === null
                        ? "#fa6e70"
                        : cell.row.original.id_estado == 3
                        ? "#71c7f5"
                        : cell.row.original.id_estado == 4
                        ? "#9af5b8"
                        : cell.row.original.id_estado == 5 &&
                          dayjs(cell.row.original.fecha_ini).isBefore(
                              dayjs().subtract(2, "day"),
                              "day"
                          )
                        ? "#cf001c" //#fcb281
                        : "",
                color:
                    cell.row.original.tecnico_asignado === null ||
                    cell.row.original.id_estado == 3
                        ? "white"
                        : cell.row.original.id_estado == 4
                        ? "black"
                        : cell.row.original.id_estado == 5 &&
                          colorScheme === "dark"
                        ? "white"
                        : cell.row.original.id_estado == 5 &&
                          colorScheme === "light"
                        ? "black"
                        : "",
            },
        }),
        renderRowActionMenuItems: ({ row }) =>
            usuario.role_id === 1 ? (
                <MenuSolicitudTable
                    row={row}
                    isEdit={row.original.id_estado === 2 ? false : true}
                    handleDiagnosticar={handleDiagnosticar}
                    handleEditar={handleEditar}
                    handleAsignar={handleAsignar}
                    handleAnular={handleAnular}
                    handleExport={handleExportSoporte}
                />
            ) : usuario.role_id === 2 ? (
                <MenuTable_T
                    row={row}
                    handleDiagnosticar={handleDiagnosticar}
                    handleExport={handleExportSoporte}
                />
            ) : null,
        renderDetailPanel: ({ row }) => (
            <DetailSolicitudesActualesTable row={row} />
        ),
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
            sx: {
                "thead > tr": {
                    backgroundColor: "inherit",
                },
                "thead > tr > th": {
                    backgroundColor: "inherit",
                },
                "tbody > tr > td": {
                    backgroundColor: "inherit",
                },
            },
        },
    });

    return <TableContent table={table} />;
};
