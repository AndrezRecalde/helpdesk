import { useMantineReactTable } from "mantine-react-table";
import { useCallback, useMemo } from "react";
import { ActivateUserBtn, MenuUsersTable, TableContent } from "../../..";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { Table } from "@mantine/core";

export const UsersTable = () => {
    const { isLoading, users, setActivateUser } = useUsersStore();
    const {
        modalActionUser,
        modalActionActiveUser,
        modalActionResetPwd,
        modalActionCodigoBiometrico,
    } = useUiUser();
    const columns = useMemo(
        () => [
            {
                accessorKey: "direccion", //access nested data with dot notation
                header: "Dirección",
                filterVariant: "autocomplete",
                size: 250,
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
                size: 80,
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
                size: 80,
            },
        ],
        []
    );

    const handleEdit = useCallback(
        (selected) => {
            //console.log(selected)
            setActivateUser(selected);
            modalActionUser(true, true);
        },
        [users]
    );

    const handleActive = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionActiveUser(true);
        },
        [users]
    );

    const handleResetPassword = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionResetPwd(true);
        },
        [users]
    );

    const handleCodigoBiometrico = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionCodigoBiometrico(true);
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
                handleCodigoBiometrico={handleCodigoBiometrico}
            />
        ),
        renderDetailPanel: ({ row }) => (
            <Table withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Cédula</Table.Th>
                        <Table.Th>Código Biométrico</Table.Th>
                        <Table.Th>Tipo Contrato</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    <Table.Tr key={row.original.cdgo_usrio}>
                        <Table.Td>
                            {row.original.usu_ci || "SIN DATOS CEDULACION"}
                        </Table.Td>
                        <Table.Td>
                            {row.original.asi_id_reloj ||
                                "SIN DATOS INGRESADOS"}
                        </Table.Td>
                        <Table.Td>
                            {row.original.tipo_contrato ||
                                "SIN DATOS INGRESADOS"}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ),
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
            sx: {
                "thead > tr": {
                    backgroundColor: "inherit",
                },
                "thead > tr > th": {
                    backgroundColor: "inherit",
                },
                "tbody > tr > td": {
                    backgroundColor: "inherit",
                },
            },
        },
    });

    return <TableContent table={table} />;
};
