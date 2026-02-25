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
        ultimosFiltros,
        startLoadPermisos,
        startExportPermiso,
        setActivatePermiso,
    } = usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: "estado", //access nested data with dot notation
                header: "Estado",
                filterVariant: "autocomplete",
                size: 80,
                enableColumnFilter: !ultimosFiltros?.id_estado, // Ocultar si hay filtro global
            },
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código",
                size: 80,
                // Aplicar un pequeño delay o requerir Enter para no saturar al escribir números
                mantineFilterTextInputProps: {
                    placeholder: "Ej. 421",
                },
                filterVariant: "text",
                enableColumnFilter: !ultimosFiltros?.idper_permisos,
            },
            {
                accessorKey: "usuario_pide", //access nested data with dot notation
                header: "Solicitante",
                filterVariant: "autocomplete",
                enableColumnFilter: !ultimosFiltros?.id_usu_pide,
            },
            {
                accessorKey: "direccion_pide", //access nested data with dot notation
                header: "Departamento solicitante",
                filterVariant: "autocomplete",
                size: 200,
                enableColumnFilter: !ultimosFiltros?.id_direccion_pide,
            },
            {
                id: "per_fecha_salida",
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("YYYY-MM-DD"),
                header: "Fecha",
                filterVariant: "date-range",
                size: 80,
                enableColumnFilter: !(
                    ultimosFiltros?.fecha_inicio || ultimosFiltros?.fecha_fin
                ),
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("HH:mm:ss"),
                header: "Hora de salida",
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_llegada).format("HH:mm:ss"),
                header: "Hora de llegada",
                enableColumnFilter: false,
            },
            {
                accessorKey: "motivo", //access nested data with dot notation
                header: "Motivo",
                filterVariant: "autocomplete",
                size: 80,
                enableColumnFilter: !ultimosFiltros?.id_tipo_motivo,
            },
            {
                accessorKey: "tiempo_total", //access nested data with dot notation
                header: "T. total",
                size: 80,
                enableColumnFilter: false,
            },
            {
                accessorKey: "per_observaciones",
                header: "Observaciones",
                enableColumnFilter: false,
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
        [permisos, ultimosFiltros],
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
            pagination,
        },
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
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
