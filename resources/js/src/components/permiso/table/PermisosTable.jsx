import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { MenuTable_Per, TableContent } from "../../../components";
import { usePermisoStore, useUiPermiso } from "../../../hooks";
import dayjs from "dayjs";
import { Spoiler } from "@mantine/core";
/* import duration from 'dayjs/plugin/duration';
dayjs.extend(duration); */

export const PermisosTable = () => {
    const { isLoading, permisos, startCardPermiso, setActivatePermiso } =
        usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();
    const columns = useMemo(
        () => [
            {
                accessorKey: "idper_permisos", //access nested data with dot notation
                header: "Código permiso",
            },
            {
                accessorKey: "usuario_pide", //access nested data with dot notation
                header: "Usuario solicitante",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.per_fecha_salida).format("YYYY-MM-DD"),
                header: "Fecha",
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
                accessorKey: "tiempo_total", //access nested data with dot notation
                header: "T. total",
            },
            /* {
                accessorFn: (row) => {
                    const salida = dayjs(row.per_fecha_salida);
                    const llegada = dayjs(row.per_fecha_llegada);

                    // Verificamos que ambas fechas existan
                    if (!salida.isValid() || !llegada.isValid()) return "—";

                    const duration = dayjs.duration(llegada.diff(salida));

                    // Puedes devolver el tiempo en el formato que prefieras:
                    return `${String(duration.hours()).padStart(2, "0")}:${String(duration.minutes()).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`;
                },
                header: "T. total",
            }, */
            {
                accessorKey: "estado", //access nested data with dot notation
                header: "Estado",
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
        [permisos]
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
            <MenuTable_Per
                row={row}
                handleAnular={handleAnular}
                handleExport={handleExport}
            />
        ),
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
