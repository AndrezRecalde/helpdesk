import { useEffect, useMemo, useState } from "react";
import { TableContent } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import dayjs from "dayjs";

const STORAGE_KEY = "marcaciones_page_size";

export const TableMarcacionRelojOnline = () => {
    const { isLoading, marcaciones } = useMarcacionStore();
    const [pageSize, setPageSize] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 50;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, pageSize.toString());
    }, [pageSize]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "NAME", //access nested data with dot notation
                header: "SERVIDOR",
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.EVENTO_FECHA).format("YYYY-MM-DD"), //access nested data with dot notation
                header: "FECHA DE MARCACION",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.CHECKTYPE !== null
                        ? dayjs(row.EVENTO_FECHA).format("HH:mm:ss")
                        : "SIN MARCACION", //normal accessorKey
                header: "HORA DE MARCACION",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) => {
                    const checkType = row.CHECKTYPE;
                    const checkTime = dayjs(row.EVENTO_FECHA); // Convierte la fecha con dayjs

                    if (checkType === "I") {
                        return checkTime.hour() < 12 ? "ENTRADA" : "SALIDA";
                    } else if (
                        checkType === "O" &&
                        checkTime.isBefore(dayjs().hour(13).minute(30))
                    ) {
                        return "ALMUERZO";
                    }
                    return "";
                },
                header: "TIPO DE MARCACION",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.LeaveName !== null
                        ? `JUSTIFICADO - ${row.LeaveName} - CON HORAS: ${dayjs(
                              row.STARTSPECDAY
                          ).format("HH:mm:ss")} - ${dayjs(
                              row.ENDSPECDAY
                          ).format("HH:mm:ss")}`
                        : null,
                header: "OBSERVACION",
                enableColumnFilter: false,
                //filterVariant: "autocomplete",
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones,
        enableFacetedValues: true,
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === "function"
                    ? updater(table.getState().pagination)
                    : updater;
            setPageSize(newPagination.pageSize); // Guarda el nuevo pageSize
            table.setPagination(newPagination); // Aplica el cambio a la tabla
        },
        initialState: {
            showColumnFilters: true,
            showGlobalFilter: true,
            showProgressBars: isLoading,
            pagination: {
                pageSize,
            },
        },
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.LeaveName !== null ? "#448af2" : null,
                color: cell.row.original.LeaveName !== null ? "white" : null,
            },
        }),
        mantineTableProps: {
            highlightOnHover: true,
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
