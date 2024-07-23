import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import { useMemo } from "react";
import dayjs from "dayjs";

export const TableMarcacion = () => {
    const { isLoading, marcaciones } = useMarcacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "nombre",
                header: "Trabajador",
            },
            {
                accessorFn: (row) => dayjs(row.fecha).format("YYYY-MM-DD"),
                header: "Fecha",
            },
            {
                accessorKey: "registro_entrada",
                header: "Registro Entrada",
            },
            {
                accessorKey: "registro_salida",
                header: "Salida Almuerzo",
            },
            {
                accessorKey: "registro_entrada2",
                header: "Entrada Almuerzo",
            },
            {
                accessorKey: "registro_salida2",
                header: "Registro Salida",
            },
            {
                accessorKey: "detalle_permiso",
                header: "Observación",
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones,
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        mantineTableProps: {
            withTableBorder: true,
            withColumnBorders: true,
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
        mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "registro_entrada"
                    ? {
                          backgroundColor:
                              cell.row.original.registro_entrada >
                                  cell.row.original.inicio ||
                              cell.row.original.registro_entrada === null
                                  ? "#ff6961"
                                  : "#20c997",
                          color: "white",
                      }
                    : column.id === "registro_salida"
                    ? {
                          backgroundColor:
                              cell.row.original.registro_salida < "12:30:00" ||
                              cell.row.original.registro_salida === null
                                  ? "#ff6961"
                                  : "#20c997",
                          color: "white",
                      }
                    : column.id === "registro_entrada2"
                    ? {
                          backgroundColor:
                              cell.row.original.registro_entrada2 >
                                  "13:30:00" ||
                              cell.row.original.registro_salida === null
                                  ? "#ff6961"
                                  : "#20c997",
                          color: "white",
                      }
                    : column.id === "registro_salida2"
                    ? {
                          backgroundColor:
                              cell.row.original.registro_salida2 >=
                              cell.row.original.salida
                                  ? "#20c997"
                                  : "#ff6961",
                          color: "white",
                      }
                    : {},
        }),
    });

    return <TableContent table={table} />;
};
