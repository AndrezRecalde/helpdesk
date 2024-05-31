import { useCallback, useMemo } from 'react'
import { useMantineReactTable } from 'mantine-react-table';
import { MenuTable_E, TableContent } from '../../../../components';
import { useDirectorStore, useUiDirector } from '../../../../hooks';


export const DireccionesTable = () => {
    const { directores, setActivateDirectores } = useDirectorStore();
    const { modalActionDirector } = useUiDirector();

    const handleEdit = useCallback(
      (selected) => {
        setActivateDirectores(selected);
        modalActionDirector(1);
      },
      [directores],
    )


    const columns = useMemo(
        () => [
            {
                accessorKey: "nmbre_dprtmnto", //access nested data with dot notation
                header: "Dirección",
            },
            {
                accessorKey: "jefe", //access nested data with dot notation
                header: "Director del área",
                //filterVariant: 'autocomplete',
            },
            {
                accessorKey: "encargado", //normal accessorKey
                header: "Jefe encargado",
            },
        ],
        [directores]
    );

    const table = useMantineReactTable({
        columns,
        data: directores, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E
            row={row}
            handleEdit={handleEdit}
            />
        ),
    });

  return (
    <TableContent table={table} />
  )
}
