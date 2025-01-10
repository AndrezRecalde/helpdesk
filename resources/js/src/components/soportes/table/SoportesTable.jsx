import { useCallback, useMemo } from "react";
import { Badge, Table, useMantineColorScheme } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import {
    MenuSolicitudTable,
    MenuTable_T,
    TableContent,
    TextSection,
} from "../../../components";
import {
    useDireccionStore,
    useSoporteStore,
    useTecnicoStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime); // Extiende Day.js con el plugin
dayjs.locale("es"); // Configura el idioma a español
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
    const { direcciones } = useDireccionStore();
    const { tecnicos } = useTecnicoStore();
    const { users } = useUsersStore();
    const columns = useMemo(
        () => [
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
            },
            {
                accessorKey: "numero_sop", //access nested data with dot notation
                header: "Número de soporte",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"),
                header: "Fecha - Hora",
            },
            {
                accessorKey: "usuario_recibe", //normal accessorKey
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
                mantineEditSelectProps: {
                    data: users,
                },
            },
            {
                accessorKey: "direccion", //normal accessorKey
                header: "Dirección del usuario",
                filterVariant: "autocomplete",
                mantineEditSelectProps: {
                    data: direcciones,
                },
            },
            {
                accessorFn: (row) => row.tecnico_asignado ?? "No asignado", //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
                mantineEditSelectProps: {
                    data: tecnicos,
                },
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
            <Table
                verticalSpacing="md"
                withColumnBorders
                withRowBorders={true}
            >
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>
                            <TextSection fz="sm" fw={300} tt="">
                                {row.original.incidente}{" "}
                            </TextSection>

                            <TextSection fs="italic" tt="" fz={12}>
                                {"- "}
                                {dayjs(row.original.fecha_ini).fromNow()}{" "}
                            </TextSection>
                            <TextSection fz="xs" c="dimmed" tt="" fw={700}>
                                Incidencia
                            </TextSection>
                        </Table.Td>
                        <Table.Td>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        row.original.solucion ?? "Sin solución",
                                }}
                            />
                            <TextSection fs="italic" tt="" fz={12}>
                                {row.original.fecha_fin
                                    ? "- " +
                                      dayjs(row.original.fecha_fin).fromNow()
                                    : null}{" "}
                            </TextSection>
                            <TextSection fz="xs" c="dimmed" tt="" fw={700}>
                                Retrospectiva del técnico
                            </TextSection>
                        </Table.Td>
                        <Table.Td>
                            <Badge radius="sm">
                                {row.original.tipo_soporte}
                            </Badge>
                            <TextSection fz="xs" c="dimmed" tt="" fw={700}>
                                Tipo soporte
                            </TextSection>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ),
    });

    return <TableContent table={table} />;
};
