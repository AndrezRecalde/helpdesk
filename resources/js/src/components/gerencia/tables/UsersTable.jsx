import { useMantineReactTable } from "mantine-react-table";
import { useCallback, useMemo } from "react";
import { ActivateUserBtn, MenuUsersTable, TableContent } from "../../../components";
import { useUiUser, useUsersStore } from "../../../hooks";

export const UsersTable = () => {
    const { isLoading, users, setActivateUser } = useUsersStore();
    const { modalActionActiveUser } = useUiUser();
    const columns = useMemo(
        () => [
            {
                accessorKey: "direccion", //access nested data with dot notation
                header: "Dirección",
            },
            {
                accessorKey: "nmbre_usrio", //access nested data with dot notation
                header: "Nombres",
                filterVariant: "autocomplete",
            },
            {
                accessorKey: "nom_cargo", //normal accessorKey
                header: "Cargo",
            },
            {
                accessorKey: "lgin",
                header: "Usuario",
            },
            {
                accessorKey: "actvo",
                header: "Activo",
                Cell: ({ cell }) => (
                    <ActivateUserBtn cell={cell} handleActive={handleActive} />
                ),
            },
        ],
        []
    );

    const handleEdit = useCallback(
        (selected) => {
            setActivateUser(selected);
        },
        [users]
    );

    const handleActive = useCallback(
      (selected) => {
        setActivateUser(selected);
        modalActionActiveUser(1);
      },
      [users],
    )


    const table = useMantineReactTable({
        columns,
        data: users, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <MenuUsersTable row={row} handleEdit={handleEdit} />
        ),
    });

    return <TableContent table={table} />;
};
