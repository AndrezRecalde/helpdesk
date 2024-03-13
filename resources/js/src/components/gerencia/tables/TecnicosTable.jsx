import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { ActivateUserBtn, TableContent } from "../../../components"
import { useTecnicoStore, useUiTecnico } from "../../../hooks";

export const TecnicosTable = () => {
    const { isLoading, tecnicos, setActivateTecnico } = useTecnicoStore();
    const { modalActionTecnico } = useUiTecnico();
    const columns = useMemo(
        () => [
            {
                accessorKey: "nmbre_usrio", //access nested data with dot notation
                header: "Nombres",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "role", //normal accessorKey
                header: "Role",
            },
            {
                accessorKey: "lgin",
                header: "Usuario",
            },
            {
                accessorKey: "total_soportes",
                header: "Total Soportes Año Actual",
            },
            {
                accessorKey: "actvo",
                header: "Activo",
                Cell: ({ cell }) => (
                    <ActivateUserBtn cell={cell} handleActive={handleActive} />
                ),
            },
        ],
        [tecnicos]
    );

    const handleActive = useCallback(
        (selected) => {
            setActivateTecnico(selected);
            modalActionTecnico(1, true);
        },
        [tecnicos]
    );

    const table = useMantineReactTable({
        columns,
        data: tecnicos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        state: { showProgressBars: isLoading },
    });

  return (
    <TableContent table={table} />
  )
}
