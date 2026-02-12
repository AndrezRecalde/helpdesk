import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Badge, ActionIcon, Group, Text } from "@mantine/core";
import { IconEye, IconFileTypePdf } from "@tabler/icons-react";
import dayjs from "dayjs";

export const SolicitudesConsumiblesTable = ({
    isLoading,
    solicitudes = [],
    pagination = {},
    onViewDetalle,
    onExportPDF,
    onPageChange,
}) => {
    const getStatusColor = (consumiblesCount) => {
        if (consumiblesCount === 0) return "gray";
        if (consumiblesCount <= 3) return "blue";
        return "green";
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_solicitud",
                header: "N° Solicitud",
                size: 150,
                Cell: ({ cell }) => (
                    <Text fw={600} size="sm">
                        {cell.getValue()}
                    </Text>
                ),
            },
            {
                accessorKey: "created_at",
                header: "Fecha",
                size: 180,
                Cell: ({ cell }) =>
                    dayjs(cell.getValue()).format("DD/MM/YYYY HH:mm"),
            },
            {
                accessorKey: "departamento.nmbre_dprtmnto",
                header: "Departamento",
                size: 200,
                Cell: ({ row }) =>
                    row.original.departamento?.nmbre_dprtmnto || "N/A",
            },
            {
                accessorKey: "usuario_solicita.nmbre_usrio",
                header: "Solicitante",
                size: 180,
                Cell: ({ row }) =>
                    row.original.usuario_solicita?.nmbre_usrio || "N/A",
            },
            {
                accessorKey: "usuario_autoriza.nmbre_usrio",
                header: "Autorizador",
                size: 180,
                Cell: ({ row }) =>
                    row.original.usuario_autoriza?.nmbre_usrio || "N/A",
            },
            {
                accessorKey: "consumibles",
                header: "Consumibles",
                size: 120,
                Cell: ({ row }) => {
                    const count = row.original.consumibles?.length || 0;
                    return (
                        <Badge color={getStatusColor(count)} variant="light">
                            {count} items
                        </Badge>
                    );
                },
            },
            {
                accessorKey: "actions",
                header: "Acciones",
                size: 120,
                enableSorting: false,
                Cell: ({ row }) => (
                    <Group gap="xs">
                        <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() => onViewDetalle(row.original)}
                            title="Ver detalle"
                        >
                            <IconEye size={18} />
                        </ActionIcon>
                        <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => onExportPDF(row.original.id)}
                            title="Exportar PDF"
                        >
                            <IconFileTypePdf size={18} />
                        </ActionIcon>
                    </Group>
                ),
            },
        ],
        [onViewDetalle, onExportPDF],
    );

    const table = useMantineReactTable({
        columns,
        data: solicitudes,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableSorting: false,
        enableTopToolbar: false,
        enableBottomToolbar: true,
        manualPagination: true,
        rowCount: pagination.total || 0,
        state: {
            showProgressBars: isLoading,
            pagination: {
                pageIndex: (pagination.current_page || 1) - 1,
                pageSize: pagination.per_page || 10,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === "function") {
                const newPagination = updater({
                    pageIndex: (pagination.current_page || 1) - 1,
                    pageSize: pagination.per_page || 10,
                });
                onPageChange(newPagination.pageIndex + 1);
            }
        },
        mantineTableProps: {
            striped: true,
            highlightOnHover: true,
            withTableBorder: true,
        },
        mantinePaginationProps: {
            showRowsPerPage: false,
        },
    });

    return <MantineReactTable table={table} />;
};
