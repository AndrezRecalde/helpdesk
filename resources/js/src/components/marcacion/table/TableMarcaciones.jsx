import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../../../components";
import { useMemo } from "react";
import { useMarcacionStore } from "../../../hooks";


export const TableMarcaciones = () => {

    const { marcaciones } = useMarcacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "NAME", //access nested data with dot notation
                header: "Trabajador",
            },
            {
                accessorKey: "CHECKTIME", //access nested data with dot notation
                header: "Fecha",
            },
            {
                //accessorKey: "CHECKTIME_HORAS", //access nested data with dot notation
                accessorFn: (row) => {
                    const horas = row.CHECKTIME_HORAS.split(", ");
                    return horas[0] >= "01:00:00" && horas[0] <= "11:00:00" ? horas[0] : "";
                },
                header: "Reg Engtrada",
            },
            {
                //accessorKey: "CHECKTIME_HORAS", //access nested data with dot notation
                accessorFn: (row) => {
                    const elementosUnicos = new Set();
                    const horas = row.CHECKTIME_HORAS.split(", ");
                    const arrHoras = [];
                    horas.map((elemento) => {
                        const indice = elemento.substring(0, 2);
                        if (!elementosUnicos.has(indice)) {
                            elementosUnicos.add(indice);
                            //arrHoras.push(elemento);
                            const numero = elemento >= "12:00:00" && elemento <= "13:00:00" ? elemento : "";
                            arrHoras.push(numero);
                        }
                    });
                    return arrHoras.filter(arr => arr !== '');
                },
                header: "Salida Almuerzo",
            },
            {
                //accessorKey: "CHECKTIME_HORAS", //access nested data with dot notation
                accessorFn: (row) => {
                    const elementosUnicos = new Set();
                    const horas = row.CHECKTIME_HORAS.split(", ");
                    const arrHoras = [];
                    horas.map((elemento) => {
                        const indice = elemento.substring(0, 2);
                        if (!elementosUnicos.has(indice)) {
                            elementosUnicos.add(indice);
                            //arrHoras.push(elemento);
                            const numero =  elemento >= "13:00:00" && elemento <= "15:00:00" ? elemento : "";
                            arrHoras.push(numero);
                        }
                    });
                    return arrHoras.filter(arr => arr !== '');
                },
                header: "Entrada Almuerzo",
            },
            {
                //accessorKey: "CHECKTIME_HORAS", //access nested data with dot notation
                accessorFn: (row) => {
                    const arr = row.CHECKTIME_HORAS.split(", ");
                    return arr[arr.length - 1] >= "16:00:00" && arr[arr.length - 1]  <= "23:00:00" ? arr[arr.length - 1] : "";
                },
                header: "Reg Salida",
            },
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data:marcaciones,
        //state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        /* enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Per
                row={row}
                handleAnular={handleAnular}
                handleExport={handleExport}
            />
        ), */
    });

    return <TableContent table={table} />;
};
