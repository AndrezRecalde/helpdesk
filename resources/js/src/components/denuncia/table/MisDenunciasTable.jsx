import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Badge, ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
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
        ABUSO: "Abuso de Autoridad",
        CORRUPCION: "Corrupción",
        OTRO: "Otro",
    };
    return labels[tipo] || tipo;
};

export const MisDenunciasTable = ({ onPageChange }) => {
    const {
        misDenuncias,
        isLoading,
        paginationMisDenuncias,
        startLoadMiDenuncia,
    } = useDenunciaStore();
    const { handleOpenModalDetalleDenuncia } = useUiDenuncia();

    const handleVerDetalle = async (numeroDenuncia) => {
        await startLoadMiDenuncia(numeroDenuncia);
        handleOpenModalDetalleDenuncia();
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
                accessorKey: "tipo_denuncia",
                header: "Tipo",
                size: 180,
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
                size: 150,
                Cell: ({ cell }) => (
                    <Badge
                        size="sm"
                        variant="dot"
                        color={cell.getValue() > 0 ? "blue" : "gray"}
                    >
                        {cell.getValue()} archivo(s)
                    </Badge>
                ),
            },
            {
                accessorKey: "actions",
                header: "Acciones",
                size: 120,
                enableSorting: false,
                Cell: ({ row }) => (
                    <Group gap="xs">
                        <Tooltip label="Ver Detalle">
                            <ActionIcon
                                variant="light"
                                onClick={() =>
                                    handleVerDetalle(
                                        row.original.numero_denuncia,
                                    )
                                }
                            >
                                <IconEye size={16} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                ),
            },
        ],
        [handleVerDetalle],
    );

    const table = useMantineReactTable({
        columns,
        data: misDenuncias,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableSorting: false,
        enableTopToolbar: false,
        enableBottomToolbar: true,
        manualPagination: true,
        rowCount: paginationMisDenuncias.total || 0,
        state: {
            showProgressBars: isLoading,
            pagination: {
                pageIndex: (paginationMisDenuncias.current_page || 1) - 1,
                pageSize: paginationMisDenuncias.per_page || 10,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === "function") {
                const newPagination = updater({
                    pageIndex: (paginationMisDenuncias.current_page || 1) - 1,
                    pageSize: paginationMisDenuncias.per_page || 10,
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
