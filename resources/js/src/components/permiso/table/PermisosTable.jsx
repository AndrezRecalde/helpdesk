import { useCallback, useEffect, useMemo, useState } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    MenuTableActions,
    ModalAnularPermiso,
    TableContent,
} from "../../../components";
import { usePermisoStore, useUiPermiso } from "../../../hooks";
import { Spoiler } from "@mantine/core";
import dayjs from "dayjs";
import { IconBan, IconPrinter } from "@tabler/icons-react";
/* import duration from 'dayjs/plugin/duration';
dayjs.extend(duration); */

export const PermisosTable = () => {
    const {
        isLoading,
        permisos,
        paginacion,
        startLoadPermisos,
        startExportPermiso,
        setActivatePermiso,
    } = usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();

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
                size: 80,
            },
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código",
                size: 80,
            },
            {
                accessorKey: "usuario_pide", //access nested data with dot notation
                header: "Solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "direccion_pide", //access nested data with dot notation
                header: "Departamento solicitante",
                filterVariant: "autocomplete",
                size: 200,
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
                header: "Hora de salida",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_llegada).format("HH:mm:ss"),
                header: "Hora de llegada",
            },
            {
                accessorKey: "motivo", //access nested data with dot notation
                header: "Motivo",
                filterVariant: "autocomplete",
                size: 80,
            },
            {
                accessorKey: "tiempo_total", //access nested data with dot notation
                header: "T. total",
                size: 80,
            },
            {
                accessorKey: "per_observaciones",
                header: "Observaciones",
                Cell: ({ cell }) => {
                    const value = cell.getValue();

                    if (typeof value !== "string" || value.length <= 60) {
                        return value;
                    }

                    return (
                        <Spoiler
                            maxHeight={40}
                            showLabel="Ver más"
                            hideLabel="Ver menos"
                        >
                            {value}
                        </Spoiler>
                    );
                },
            },
        ],
        [permisos],
    );

    const handleExport = useCallback((selected) => {
        //setActivatePermiso(selected);
        startExportPermiso(selected.idper_permisos);
    }, []);

    const handleAnular = useCallback((selected) => {
        setActivatePermiso(selected);
        modalActionAnularPermiso(1);
    }, []);

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
                        icon: IconBan,
                        label: "Anular",
                        onClick: handleAnular,
                        disabled:
                            row.original.id_estado === 8 ||
                            row.original.id_estado === 7 ||
                            row.original.id_estado === 6 ||
                            row.original.id_estado === 2,
                    },
                    {
                        icon: IconPrinter,
                        label: "Imprimir",
                        onClick: handleExport,
                        disabled:
                            //row.original.id_estado === 8 ||
                            row.original.id_estado === 7 ||
                            row.original.id_estado === 6,
                    },
                ]}
            />
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

    return (
        <>
            <TableContent table={table} />
            <ModalAnularPermiso />
        </>
    );
};
