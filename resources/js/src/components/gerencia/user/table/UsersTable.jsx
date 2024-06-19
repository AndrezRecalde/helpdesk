import { useMantineReactTable } from "mantine-react-table";
import { useCallback, useMemo } from "react";
import {
    ActivateUserBtn,
    MenuUsersTable,
    TableContent,
} from "../../..";
import { useUiUser, useUsersStore } from "../../../../hooks";

export const UsersTable = () => {
    const { isLoading, users, setActivateUser } = useUsersStore();
    const { modalActionUser, modalActionActiveUser, modalActionResetPwd } = useUiUser();
    const columns = useMemo(
        () => [
            {
                accessorKey: "direccion", //access nested data with dot notation
                header: "Dirección",
                filterVariant: "autocomplete",
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
                accessorKey: "email",
                header: "Correo",
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
            //console.log(selected)
            setActivateUser(selected);
            modalActionUser(1);
        },
        [users]
    );

    const handleActive = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionActiveUser(1);
        },
        [users]
    );

    const handleResetPassword = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionResetPwd(1);
        },
        [users]
    );

    const table = useMantineReactTable({
        columns,
        data: users, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        state: { showProgressBars: isLoading },
        renderRowActionMenuItems: ({ row }) => (
            <MenuUsersTable
                row={row}
                handleEdit={handleEdit}
                handleResetPassword={handleResetPassword}
            />
        ),
    });

    return <TableContent table={table} />;
};
