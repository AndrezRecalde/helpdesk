import { useCallback, useMemo } from "react";
import { Badge, Table, Text } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { MenuSolicitudTable, MenuTable_T, TableContent } from "../..";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import dayjs from "dayjs";

export const SoportesTable = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isLoading, soportes, startExportSoporte, setActivateSoporte } = useSoporteStore();
    const {
        modalActionAsignarSoporte,
        modalActionAnularSoporte,
        modalActionCreateSoporte,
        modalActionDiagnosticar,
    } = useUiSoporte();
    const columns = useMemo(
        () => [
            {
                accessorKey: "id_estado", //access nested data with dot notation
                header: "Estado",
                Cell: ({ cell }) => (
                    <Badge
                        variant="light"
                        radius="sm"
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
            },
            {
                accessorKey: "direccion", //normal accessorKey
                header: "Dirección del usuario",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) => row.tecnico_asignado ?? "No asignado", //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
        ],
        [soportes]
    );

    const handleDiagnosticar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionDiagnosticar(1);
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
        renderRowActionMenuItems: ({ row }) =>
            usuario.role_id === 1 ? (
                <MenuSolicitudTable
                    row={row}
                    isEdit={true}
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
            <Table.ScrollContainer minWidth={800}>
                <Table
                    verticalSpacing="md"
                    withColumnBorders
                    withRowBorders={false}
                >
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Text fz="sm">{row.original.incidente}</Text>
                                <Text fz="xs" c="dimmed">
                                    Incidencia
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text fz="sm">
                                    {row.original.solucion ?? "Sin solución"}
                                </Text>
                                <Text fz="xs" c="dimmed">
                                    Retrospectiva del técnico
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge radius="sm">
                                    {row.original.tipo_soporte}
                                </Badge>
                                <Text fz="xs" c="dimmed">
                                    Tipo soporte
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        ),
    });

    return <TableContent table={table} />;
};
