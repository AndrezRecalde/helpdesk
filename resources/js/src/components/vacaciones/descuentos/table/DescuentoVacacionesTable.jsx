import { useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../../../../components";

const descuentos = [];

export const DescuentoVacacionesTable = () => {
    const columns = useMemo(
        () => [
            {
                header: "Cedula",
                accessorFn: (row) =>
                    (row?.usu_ci || "NO CONTIENE CEDULA")
                        .toString()
                        .toUpperCase(),
                size: 80,
            },
            {
                header: "Servidor",
                accessorFn: (row) =>
                    (row?.nmbre_usrio || "NO CONTIENE NOMBRES")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
            },
            {
                header: "Periodo",
                accessorFn: (row) => row?.anio || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Dias Descuento",
                accessorFn: (row) =>
                    row?.dias_descuento || "NO CONTIENE INFORMACION",
                size: 80,
            },
            {
                header: "Motivo",
                accessorFn: (row) => row?.motivo || "NO CONTIENE INFORMACION",

                size: 80,
            },
            {
                header: "Ingresado Por",
                accessorFn: (row) =>
                    row?.usuario_tthh || "NO CONTIENE INFORMACION",
                size: 80,
            },
        ],
        [descuentos]
    );

    const table = useMantineReactTable({
        columns,
        data: descuentos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: false,
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
