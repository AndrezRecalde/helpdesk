import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { TableContent } from "../../../components";
import { usePermisoStore } from "../../../hooks";

export const PermisosConsolidadosTable = () => {
    const { isLoading, permisos } = usePermisoStore();

    function timeToMinutes(time) {
        if (!time) return 0; // Asegurar un valor predeterminado en caso de que `time` sea nulo o indefinido
        const parts = time.split(":"); // Separar por ':'
        const hours = parseInt(parts[0], 10); // Obtener horas
        const minutes = parseInt(parts[1], 10); // Obtener minutos
        // Convertir horas a minutos y sumar minutos
        return hours * 60 + minutes;
    }

    function timeToDays(time) {
        if (!time) return 0; // Asegurar un valor predeterminado en caso de que `time` sea nulo o indefinido
        const [hours, minutes, seconds] = time.split(":").map(Number); // Separar y convertir cada parte a número
        const totalHours = hours + minutes / 60 + seconds / 3600; // Convertir todo a horas
        const days = totalHours / 24; // Dividir horas entre 24 para obtener los días
        return parseFloat(days.toFixed(2));
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "direccion_string", //access nested data with dot notation
                header: "Dirección",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "usuario_string", //access nested data with dot notation
                header: "Servidor",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "total_permisos",
                header: "T. Permisos",
            },
            {
                accessorFn: (row) =>
                    timeToMinutes(row.suma_tiempo),
                header: "T. Minutos",
            },
            {
                accessorKey: "suma_tiempo",
                header: "T. Total",
            },
            {
                accessorFn: (row) => timeToDays(row.suma_tiempo), //access nested data with dot notation
                header: "T. Días",
            },
        ],
        [permisos]
    );

    const table = useMantineReactTable({
        columns,
        data: permisos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: false,
        localization: MRT_Localization_ES,
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
