import { useMantineReactTable } from "mantine-react-table";
import { TableContent } from "../../../components";
import { useMemo } from "react";
import { useMarcacionStore } from "../../../hooks";

export const TableMarcaciones = () => {
    const { marcaciones, permisos } = useMarcacionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "NAME",
                header: "Trabajador",
            },
            {
                accessorFn: (row) =>  permisos.map(permiso => permiso.STARTSPECDAY ? permiso.STARTSPECDAY : row.CHECKTIME) ,
                header: "Fecha",
            },
            {
                accessorFn: (row) => {
                    const horas = row.CHECKTIME_HORAS.split(", ");
                    return horas[0] >= "01:00:00" && horas[0] <= "11:00:00"
                        ? horas[0]
                        : "";
                },
                header: "Reg Engtrada",
            },
            {
                accessorFn: (row) => {
                    const elementosUnicos = new Set();
                    const horas = row.CHECKTIME_HORAS.split(", ");
                    const arrHoras = [];
                    horas.map((elemento) => {
                        const indice = elemento.substring(0, 2);
                        if (!elementosUnicos.has(indice)) {
                            elementosUnicos.add(indice);
                            const numero =
                                elemento >= "12:00:00" && elemento <= "13:00:00"
                                    ? elemento
                                    : "";
                            arrHoras.push(numero);
                        }
                    });
                    return arrHoras.filter((arr) => arr !== "");
                },
                header: "Salida Almuerzo",
            },
            {
                accessorFn: (row) => {
                    const elementosUnicos = new Set();
                    const horas = row.CHECKTIME_HORAS.split(", ");
                    const arrHoras = [];
                    horas.map((elemento) => {
                        const indice = elemento.substring(0, 2);
                        if (!elementosUnicos.has(indice)) {
                            elementosUnicos.add(indice);
                            //arrHoras.push(elemento);
                            const numero =
                                elemento >= "13:00:00" && elemento <= "15:00:00"
                                    ? elemento
                                    : "";
                            arrHoras.push(numero);
                        }
                    });
                    return arrHoras.filter((arr) => arr !== "");
                },
                header: "Entrada Almuerzo",
            },
            {
                accessorFn: (row) => {
                    const arr = row.CHECKTIME_HORAS.split(", ");
                    return arr[arr.length - 1] >= "16:00:00" &&
                        arr[arr.length - 1] <= "23:00:00"
                        ? arr[arr.length - 1]
                        : "";
                },
                header: "Reg Salida",
            },
            {
                accessorFn: (row) => permisos.map(permiso => permiso.STARTSPECDAY === row.CHECKTIME ? permiso.LeaveName : ""),
                header: "Obsercacion",
            }
        ],
        [marcaciones]
    );

    const table = useMantineReactTable({
        columns,
        data: marcaciones,
        enableFacetedValues: true,
    });

    return <TableContent table={table} />;
};
