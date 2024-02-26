import { useMemo } from 'react'
import { useMantineReactTable } from 'mantine-react-table';
import { MenuTable_E, TableContent } from '../../../components';

const data = [
    {
        direccion: "GESTIÓN DE TECNOLOGIAS DE LA INFORMACIÓN",
        jefe: "Franklin Francis Quinde",
        encargado: "Venus Estupiñan",
    },
    {
        direccion: "GESTIÓN ADMINISTRATIVA DEL GADPE",
        jefe: "Eduardo Gutierrez",
        encargado: "Maria Ceibon",
    },
];

export const DireccionesTable = () => {

    const columns = useMemo(
        () => [
            {
                accessorKey: "direccion", //access nested data with dot notation
                header: "Dirección",
            },
            {
                accessorKey: "jefe", //access nested data with dot notation
                header: "Director del área",
                filterVariant: 'autocomplete',
            },
            {
                accessorKey: "encargado", //normal accessorKey
                header: "Jefe encargado",
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E />
        ),
    });

  return (
    <TableContent table={table} />
  )
}
