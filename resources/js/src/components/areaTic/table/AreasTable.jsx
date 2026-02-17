import { useMemo } from "react";
import { Badge, Box } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MenuTableArea } from "./MenuTableArea";
import { useAreaTicStore } from "../../../hooks";

export const AreasTable = () => {
    const { areas, isLoading } = useAreaTicStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "nombre",
                header: "Nombre del Área",
                size: 200,
            },
            {
                accessorKey: "activo",
                header: "Estado",
                size: 120,
                Cell: ({ cell }) => (
                    <Badge
                        color={cell.getValue() ? "green" : "red"}
                        variant="dot"
                        radius="xl"
                    >
                        {cell.getValue() ? "Activo" : "Inactivo"}
                    </Badge>
                ),
            },
            {
                accessorKey: "acciones",
                header: "Acciones",
                size: 100,
                Cell: ({ row }) => <MenuTableArea row={row.original} />,
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: areas,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        state: {
            isLoading,
        },
        initialState: {
            density: "xs",
            pagination: { pageSize: 10, pageIndex: 0 },
        },
        mantineTableProps: {
            striped: true,
            withColumnBorders: true,
            withTableBorder: true,
        },
        mantineSearchTextInputProps: {
            placeholder: "Buscar área...",
        },
    });

    return (
        <Box>
            <MantineReactTable table={table} />
        </Box>
    );
};
