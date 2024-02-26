import { useMantineReactTable } from "mantine-react-table";
import { useMemo } from "react";
import { MenuUsersTable, TableContent } from "../../../components";


const data = [
    {
        direccion: "GESTIÓN DE TECNOLOGIAS DE LA INFORMACIÓN",
        nombres: "Cristhian Recalde Solano",
        cargo: "ANALISTA",
        login: "crecalde",
        email: "crecalde@gadpe.gob.ec",
        activo: "Activo"
    },
    {
        direccion: "GESTIÓN ADMINISTRATIVA DEL GADPE",
        nombres: "JAEN ANGULO JUAN CARLOS",
        cargo: "MECANICO",
        login: "jjaen",
        email: "jjaen@gadpe.gob.ec",
        activo: "Inactivo"
    },
];

export const UsersTable = () => {

    const columns = useMemo(
        () => [
            {
                accessorKey: "direccion", //access nested data with dot notation
                header: "Dirección",
            },
            {
                accessorKey: "nombres", //access nested data with dot notation
                header: "Nombres",
                filterVariant: 'autocomplete',
            },
            {
                accessorKey: "cargo", //normal accessorKey
                header: "Cargo",
            },
            {
                accessorKey: "login",
                header: "Usuario",
            },
            {
                accessorKey: "activo",
                header: "Activo",
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
            <MenuUsersTable />
        ),
    });

  return (
    <TableContent table={table} />
  )
}
