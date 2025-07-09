import { useEffect, useMemo, useState } from "react";
import { TableContent } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import dayjs from "dayjs";

const STORAGE_KEY = "marcaciones_page_size";

export const TableMarcacionRelojOnline = () => {
    const { isLoading, marcaciones } = useMarcacionStore();

    // ✅ Obtener pageSize desde localStorage o usar 50 por defecto
    const getInitialPageSize = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? parseInt(saved, 10) : 50;
    };

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: getInitialPageSize(),
    });

    // ✅ Guardar pageSize cuando cambia
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, pagination.pageSize.toString());
    }, [pagination.pageSize]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "NAME",
                header: "SERVIDOR",
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) =>
                    dayjs(row.EVENTO_FECHA).format("YYYY-MM-DD"),
                header: "FECHA DE MARCACION",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) =>
                    row.CHECKTYPE !== null
                        ? dayjs(row.EVENTO_FECHA).format("HH:mm:ss")
                        : "SIN MARCACION",
                header: "HORA DE MARCACION",
                enableColumnFilter: false,
            },
            {
                accessorFn: (row) => {
                    const checkType = row.CHECKTYPE;
                    const checkTime = dayjs(row.EVENTO_FECHA);
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
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones,
        enableFacetedValues: true,
        state: {
            pagination, // 👈 controlado desde useState
        },
        onPaginationChange: setPagination,
        initialState: {
            showColumnFilters: true,
            showGlobalFilter: true,
            showProgressBars: isLoading,
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
