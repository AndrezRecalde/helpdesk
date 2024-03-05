import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    MenuSolicitudTable,
    MenuTable_E,
    TableContent,
} from "../../../components";
import { Badge, Card, Group, Text } from "@mantine/core";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import dayjs from "dayjs";

export const SolicitudesTable = ({ menu }) => {
    const { isLoading, soportes, setActivateSoporte } = useSoporteStore();
    const { modalActionAsignarSoporte, modalActionAnularSoporte } =
        useUiSoporte();
    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop", //access nested data with dot notation
                header: "Número de soporte",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fecha_ini).format("YYYY-MM-DD HH:mm"), //access nested data with dot notation
                header: "Fecha - Hora",
            },
            {
                accessorKey: "usuario_recibe", //normal accessorKey
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "direccion", //normal accessorKey
                header: "Departamento del usuario",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "tecnico_asignado", //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
        ],
        []
    );

    const handleAsignar = useCallback((selected) => {
        setActivateSoporte(selected);
        modalActionAsignarSoporte(1);
    }, []);

    const handleAnular = useCallback((selected) => {
        setActivateSoporte(selected)
        modalActionAnularSoporte(1);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) =>
            menu === 1 ? (
                <MenuSolicitudTable
                    row={row}
                    handleAsignar={handleAsignar}
                    handleAnular={handleAnular}
                />
            ) : (
                <MenuTable_E />
            ),
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.tecnico_asignado === null
                        ? "#CB3234"
                        : "",
                color:
                    cell.row.original.tecnico_asignado === null ? "white" : "",
            },
        }),
        renderDetailPanel: ({ row }) => (
            <Group grow>
                <Card withBorder shadow="sm" radius="sm">
                    <Group justify="space-between">
                        <Text fz="sm" mb={5} fw={700}>
                            Incidencia
                        </Text>
                        <Badge radius="sm">{row.original.estado}</Badge>
                    </Group>
                    <Card.Section withBorder inheritPadding p="md" mt="md">
                        {row.original.incidente}
                    </Card.Section>
                </Card>
            </Group>
        ),
    });

    return <TableContent table={table} />;
};
