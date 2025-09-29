import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import { TableContent, TextSection } from "../../../components";
import { useRutaStore } from "../../../hooks";
import dayjs from "dayjs";

export const DespachosTable = () => {
    const { despachos } = useRutaStore();
    const columns = useMemo(
        () => [
            {
                accessorKey: "nmro_item",
                header: "Item",
                size: 60, // lo más pequeño, solo números
            },
            {
                accessorKey: "remitente",
                header: "Remitente",
                size: 150, // nombre corto, un poco más de espacio
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "descripcion_accion",
                header: "Acción",
                size: 220, // acción puede ser descriptiva
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fcha_dspcho).isValid()
                        ? dayjs(row.fcha_dspcho).format("YYYY-MM-DD HH:mm")
                        : null,
                header: "Fecha despacho",
                size: 80, // fecha con hora necesita más que 80
                wrap: false
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fcha_rspsta).isValid()
                        ? dayjs(row.fcha_rspsta).format("YYYY-MM-DD HH:mm")
                        : null,
                header: "Fecha respuesta",
                size: 80, // igual a la anterior para simetría
                wrap: false
            },
            {
                accessorKey: "descripcion_respuesta",
                header: "Respuesta",
                size: 220, // texto explicativo
            },
            {
                accessorKey: "oficio_respuesta",
                header: "Doc. respuesta",
                size: 160, // docs suelen ser cortos, pero darle aire
            },
        ],
        [despachos]
    );

    const table = useMantineReactTable({
        columns,
        enableColumnActions: false,
        enableColumnFilterModes: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,
        enableSorting: false,
        data: despachos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        localization: MRT_Localization_ES,
        renderTopToolbarCustomActions: ({ table }) => (
            <TextSection fz={16} fw={700}>
                Despachos
            </TextSection>
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
