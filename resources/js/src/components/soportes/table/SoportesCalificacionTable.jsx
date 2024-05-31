import { useMantineReactTable } from "mantine-react-table";
import { useMemo } from "react";
import { useSoporteStore } from "../../../hooks";
import { Box, Button } from "@mantine/core";
import { IconChecks, IconStars } from "@tabler/icons-react";
import { TableContent } from "../../../components";

export const SoportesCalificacionTable = () => {
    const { isLoading, soportes, startUpdateCalificacion } = useSoporteStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "numero_sop", //access nested data with dot notation
                header: "Número de soporte",
            },
            {
                accessorKey: "usuario_recibe", //normal accessorKey
                header: "Usuario solicitante",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "direccion", //normal accessorKey
                header: "Departamento del usuario",
                filterVariant: "autocomplete",
            },
            {
                accessorFn: (row) => row.tecnico_asignado, //normal accessorKey
                header: "Técnico asignado",
                filterVariant: "autocomplete",
            },
        ],
        [soportes]
    );

    const handleCalificar = (rows, table) => {
        rows.map(row => startUpdateCalificacion(row.original.id_sop));
        //console.log(table.resetRowSelection())
    }

    const table = useMantineReactTable({
        columns,
        data: soportes, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowSelection: true,
        columnFilterDisplayMode: "popover",
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        state: { showProgressBars: isLoading },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                style={{
                    display: "flex",
                    gap: "16px",
                    padding: "8px",
                    flexWrap: "wrap",
                }}
            >
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() &&
                        !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={() =>
                        handleCalificar(table.getSelectedRowModel().rows, table)
                    }
                    leftSection={<IconChecks color="teal" />}
                    variant="default"
                >
                    Cerrar
                </Button>
            </Box>
        ),
    });

    return <TableContent table={table} />;
};
