import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { MenuTableActions, TableContent } from "../../../components";
import { usePermisoStore, useUiPermiso } from "../../../hooks";
import { Spoiler } from "@mantine/core";
import dayjs from "dayjs";
import { IconBan, IconPrinter } from "@tabler/icons-react";
/* import duration from 'dayjs/plugin/duration';
dayjs.extend(duration); */

export const PermisosTable = () => {
    const { isLoading, permisos, startCardPermiso, setActivatePermiso } =
        usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();
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
        startCardPermiso(selected.idper_permisos);
    }, []);

    const handleAnular = useCallback((selected) => {
        setActivatePermiso(selected);
        modalActionAnularPermiso(1);
    }, []);

    const table = useMantineReactTable({
        columns,
        data: permisos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
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
                            row.original.id_estado === 6,
                    },
                    {
                        icon: IconPrinter,
                        label: "Imprimir",
                        onClick: handleExport,
                        disabled:
                            row.original.id_estado === 8 ||
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
