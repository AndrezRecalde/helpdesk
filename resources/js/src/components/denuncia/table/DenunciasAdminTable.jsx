import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Badge, ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconEye, IconMessageReply } from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia } from "../../../hooks";

const getEstadoColor = (estado) => {
    const colors = {
        PENDIENTE: "yellow",
        EN_PROCESO: "blue",
        RESUELTO: "green",
        RECHAZADO: "red",
    };
    return colors[estado] || "gray";
};

const getEstadoLabel = (estado) => {
    const labels = {
        PENDIENTE: "Pendiente",
        EN_PROCESO: "En Proceso",
        RESUELTO: "Resuelto",
        RECHAZADO: "Rechazado",
    };
    return labels[estado] || estado;
};

const getTipoLabel = (tipo) => {
    const labels = {
        ACOSO: "Acoso",
        ABUSO: "Abuso",
        CORRUPCION: "Corrupción",
        OTRO: "Otro",
    };
    return labels[tipo] || tipo;
};

export const DenunciasAdminTable = ({ onPageChange }) => {
    const { denuncias, isLoading, paginationDenuncias, startLoadDenuncia } =
        useDenunciaStore();
    const { handleOpenModalDetalleDenuncia, handleOpenModalResponderDenuncia } =
        useUiDenuncia();

    const handleVerDetalle = async (denuncia) => {
        await startLoadDenuncia(denuncia.id);
        handleOpenModalDetalleDenuncia();
    };

    const handleResponder = async (denuncia) => {
        await startLoadDenuncia(denuncia.id);
        handleOpenModalResponderDenuncia();
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_denuncia",
                header: "Número",
                size: 150,
                Cell: ({ cell }) => (
                    <Text size="sm" fw={500}>
                        {cell.getValue()}
                    </Text>
                ),
            },
            {
                accessorKey: "usuario.nombre",
                header: "Usuario",
                size: 200,
                Cell: ({ row }) => (
                    <div>
                        <Text size="sm" fw={500}>
                            {row.original.usuario?.nombre || "Anónimo"}
                        </Text>
                        {row.original.usuario?.email && (
                            <Text size="xs" c="dimmed">
                                {row.original.usuario.email}
                            </Text>
                        )}
                    </div>
                ),
            },
            {
                accessorKey: "tipo_denuncia",
                header: "Tipo",
                size: 150,
                Cell: ({ cell }) => (
                    <Badge size="sm" variant="light">
                        {getTipoLabel(cell.getValue())}
                    </Badge>
                ),
            },
            {
                accessorKey: "estado",
                header: "Estado",
                size: 150,
                Cell: ({ cell }) => (
                    <Badge
                        size="sm"
                        variant="dot"
                        color={getEstadoColor(cell.getValue())}
                    >
                        {getEstadoLabel(cell.getValue())}
                    </Badge>
                ),
            },
            {
                accessorKey: "fecha_creacion",
                header: "Fecha",
                size: 150,
                Cell: ({ cell }) => (
                    <Text size="sm">
                        {new Date(cell.getValue()).toLocaleDateString("es-EC")}
                    </Text>
                ),
            },
            {
                accessorKey: "archivos_count",
                header: "Archivos",
                size: 120,
                Cell: ({ cell }) => (
                    <Badge
                        size="sm"
                        variant="dot"
                        color={cell.getValue() > 0 ? "blue" : "gray"}
                    >
                        {cell.getValue()}
                    </Badge>
                ),
            },
            {
                accessorKey: "actions",
                header: "Acciones",
                size: 120,
                enableSorting: false,
                Cell: ({ row }) => (
                    <Group gap="xs" justify="center">
                        <Tooltip label="Ver Detalle">
                            <ActionIcon
                                variant="light"
                                color="blue"
                                onClick={() => handleVerDetalle(row.original)}
                            >
                                <IconEye size={16} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Responder">
                            <ActionIcon
                                variant="light"
                                color="green"
                                onClick={() => handleResponder(row.original)}
                            >
                                <IconMessageReply size={16} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                ),
            },
        ],
        [handleVerDetalle, handleResponder],
    );

    const table = useMantineReactTable({
        columns,
        data: denuncias,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableSorting: false,
        enableTopToolbar: false,
        enableBottomToolbar: true,
        manualPagination: true,
        rowCount: paginationDenuncias.total || 0,
        state: {
            showProgressBars: isLoading,
            pagination: {
                pageIndex: (paginationDenuncias.current_page || 1) - 1,
                pageSize: paginationDenuncias.per_page || 10,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === "function") {
                const newPagination = updater({
                    pageIndex: (paginationDenuncias.current_page || 1) - 1,
                    pageSize: paginationDenuncias.per_page || 10,
                });
                onPageChange?.(newPagination.pageIndex + 1);
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
