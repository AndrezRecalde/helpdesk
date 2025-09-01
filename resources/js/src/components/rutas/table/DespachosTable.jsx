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
                accessorKey: "nmro_item", //access nested data with dot notation
                header: "Item",
                size: 80,
            },
            {
                accessorKey: "remitente", //access nested data with dot notation
                header: "Remitente",
                size: 120,
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "descripcion_accion", //access nested data with dot notation
                header: "Acción",
                size: 200,
                //filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fcha_dspcho).isValid()
                        ? dayjs(row.fcha_dspcho).format("YYYY-MM-DD HH:mm")
                        : null,
                header: "Fecha despacho",
                size: 80,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.fcha_rspsta).isValid()
                        ? dayjs(row.fcha_rspsta).format("YYYY-MM-DD HH:mm")
                        : null,
                header: "Fecha respuesta",
                size: 80,
            },
            {
                accessorKey: "descripcion_respuesta", //access nested data with dot notation
                header: "Respuesta",
                size: 200,
                //filterVariant: "autocomplete",
            },
            {
                accessorKey: "oficio_respuesta", //access nested data with dot notation
                header: "Doc. respuesta",
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
