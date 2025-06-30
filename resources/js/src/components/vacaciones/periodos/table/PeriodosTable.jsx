import { useMemo } from "react";
import { TableContent } from "../../../../components";
import { usePeriodoStore } from "../../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import { PeriodoInfoTable } from "./PeriodoInfoTable";
import dayjs from "dayjs";

export const PeriodosTable = () => {
    const { isLoading, periodos } = usePeriodoStore();
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
            },
            {
                header: "Cargo",
                accessorFn: (row) =>
                    (row?.cargo || "NO CONTIENE INFORMACION")
                        .toString()
                        .toUpperCase(),
            },
            {
                header: "Fecha Ingreso",
                accessorFn: (row) =>
                    dayjs(row?.fecha_ingreso).isValid()
                        ? dayjs(row?.fecha_ingreso).format("YYYY-MM-DD")
                        : null,
                size: 80,
            },
        ],
        [periodos]
    );

    const table = useMantineReactTable({
        columns,
        data: periodos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableColumnDragging: false,
        enableDensityToggle: false,
        enableRowActions: true,
        renderDetailPanel: ({ row }) => (
            <PeriodoInfoTable data={row} />
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
