import { useCallback, useEffect, useMemo, useState } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { MenuTableActions, TableContent } from "../../../../components";
import { Table } from "@mantine/core";
import { usePermisoStore } from "../../../../hooks";
import { IconBan, IconChecks } from "@tabler/icons-react";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const ANULAR_PERMISO = 6;
const AUTORIZAR_PERMISO = 2;

export const AutorizarPermisoTable = () => {
    const {
        isLoading,
        permisos,
        paginacion,
        startLoadPermisos,
        startUpdateEstadoPermiso,
    } = usePermisoStore();

    const [paginationServer, setPaginationServer] = useState({
        pageIndex: 0,
        pageSize: 15,
    });

    // Sincronizar el estado del paginador con la respuesta del backend
    useEffect(() => {
        if (paginacion) {
            setPaginationServer((prev) => {
                const newPageIndex = Number(paginacion.pagina_actual || 1) - 1;
                const newPageSize = Number(paginacion.por_pagina || 15);

                if (
                    prev.pageIndex !== newPageIndex ||
                    prev.pageSize !== newPageSize
                ) {
                    return { pageIndex: newPageIndex, pageSize: newPageSize };
                }
                return prev;
            });
        }
    }, [paginacion]);

    // Cargar datos cuando cambia la paginación (solo si hay filtros aplicados)
    useEffect(() => {
        // Evitar petición duplicada si el estado de paginación coincide con el de Redux
        const isSyncedWithRedux =
            paginacion &&
            paginationServer.pageIndex + 1 ===
                Number(paginacion.pagina_actual || 1) &&
            paginationServer.pageSize === Number(paginacion.por_pagina || 15);

        // Solo cargar si hay filtros válidos aplicados (anio no es null)
        if (!isSyncedWithRedux) {
            startLoadPermisos({
                anio: new Date(),
                por_pagina: paginationServer.pageSize,
                pagina_actual: paginationServer.pageIndex + 1,
            });
        }
    }, [paginationServer.pageIndex, paginationServer.pageSize]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "estado", //access nested data with dot notation
                header: "Estado",
                filterVariant: "autocomplete",
                size: 80,
            },
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código",
                size: 80,
            },
            {
                accessorFn: (row) => row.usuario_pide?.toUpperCase(),
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("YYYY-MM-DD"),
                header: "Fecha",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("HH:mm:ss"),
                header: "Hora de Salida",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_llegada).format("HH:mm:ss"),
                header: "Hora de llegada",
                size: 80,
            },
        ],
        [permisos],
    );

    const handleAnularPermiso = useCallback(
        (selected) => {
            //setActivatePermiso(selected);
            Swal.fire({
                title: "¿Estas seguro?",
                html: `
                <p>¿Confirmas en <u>anular</u> el permiso
                        <b>${selected.idper_permisos}</b> perteneciente
                        a <b>${selected.usuario_pide}</b>?</p>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, confirmo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startUpdateEstadoPermiso(selected, ANULAR_PERMISO);
                }
            });
        },
        [permisos],
    );

    const handleAutorizarPermiso = useCallback(
        (selected) => {
            //setActivatePermiso(selected);
            Swal.fire({
                title: "¿Estas seguro?",
                html: `
                <p>¿Confirmas en <u>autorizar</u> el permiso
                        <b>${selected.idper_permisos}</b> perteneciente
                        a <b>${selected.usuario_pide}</b>?</p>
                `,
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, confirmo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startUpdateEstadoPermiso(selected, AUTORIZAR_PERMISO);
                }
            });
        },
        [permisos],
    );

    const table = useMantineReactTable({
        columns,
        data: permisos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: {
            showProgressBars: isLoading,
            pagination: paginationServer,
        },
        manualPagination: true,
        onPaginationChange: setPaginationServer,
        rowCount: paginacion?.total,
        pageCount: paginacion?.ultima_pagina,
        enableFacetedValues: true,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconChecks,
                        label: "Autorizar",
                        onClick: handleAutorizarPermiso,
                        disabled:
                            row.original.id_estado === 2 ||
                            row.original.id_estado === 6 ||
                            row.original.id_estado === 7,
                    },
                    {
                        icon: IconBan,
                        label: "Anular",
                        onClick: handleAnularPermiso,
                        disabled:
                            row.original.id_estado === 6 ||
                            row.original.id_estado === 7,
                    },
                ]}
            />
        ),
        renderDetailPanel: ({ row }) => (
            <Table highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Observación</Table.Th>
                        <Table.Th>Motivo de Anulación</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr key={row.original.idper_permisos}>
                        <Table.Td>
                            {row.original.per_observaciones
                                ? row.original.per_observaciones
                                : "Sin Observación"}
                        </Table.Td>
                        <Table.Td>
                            {row.original.per_observacion_anulado
                                ? row.original.per_observacion_anulado
                                : "Sin motivo"}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ),
        mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "estado"
                    ? {
                          backgroundColor: cell.row.original.color,
                          color: "white",
                      }
                    : {},
        }),
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
    });
    return <TableContent table={table} />;
};
