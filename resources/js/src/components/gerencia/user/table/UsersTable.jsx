import { useMantineReactTable } from "mantine-react-table";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
    ActivateUserBtn,
    MenuTableActions,
    ModalActivateUser,
    ModalCodigoBiometrico,
    ModalResetPwdUser,
    TableContent,
} from "../../../../components";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { Table } from "@mantine/core";
import {
    IconEditCircle,
    IconRestore,
    IconClockHour2,
} from "@tabler/icons-react";
import { Roles } from "../../../../helpers/dictionary";

export const UsersTable = ({ usuario }) => {
    const { isLoading, users, setActivateUser, paginacion, startLoadUsers } =
        useUsersStore();
    const {
        modalActionUser,
        modalActionActiveUser,
        modalActionResetPwd,
        modalActionCodigoBiometrico,
    } = useUiUser();

    const [paginationState, setPaginationState] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // Sincronizar el estado del paginador con la respuesta del backend
    useEffect(() => {
        if (paginacion) {
            setPaginationState((prev) => {
                const newPageIndex = Number(paginacion.pagina_actual || 1) - 1;
                const newPageSize = Number(paginacion.por_pagina || 10);

                if (
                    prev.pageIndex !== newPageIndex ||
                    prev.pageSize !== newPageSize
                ) {
                    return { pageIndex: newPageIndex, pageSize: newPageSize };
                }
                return prev;
            });
        }
    }, [paginacion]);

    // Cargar datos cuando cambia la paginación (solo si hay filtros aplicados)
    useEffect(() => {
        // Evitar petición duplicada si el estado de paginación coincide con el de Redux
        const isSyncedWithRedux =
            paginacion &&
            paginationState.pageIndex + 1 ===
                Number(paginacion.pagina_actual || 1) &&
            paginationState.pageSize === Number(paginacion.por_pagina || 10);

        // Solo cargar si hay filtros válidos aplicados (anio no es null)
        if (!isSyncedWithRedux) {
            startLoadUsers({
                por_pagina: paginationState.pageSize,
                pagina_actual: paginationState.pageIndex + 1,
            });
        }
    }, [paginationState.pageIndex, paginationState.pageSize]);

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
        [],
    );

    const handleEdit = useCallback(
        (selected) => {
            //console.log(selected)
            setActivateUser(selected);
            modalActionUser(true, true);
        },
        [users],
    );

    const handleActive = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionActiveUser(true);
        },
        [users],
    );

    const handleResetPassword = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionResetPwd(true);
        },
        [users],
    );

    const handleCodigoBiometrico = useCallback(
        (selected) => {
            setActivateUser(selected);
            modalActionCodigoBiometrico(true);
        },
        [users],
    );

    const table = useMantineReactTable({
        columns,
        data: users, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableFacetedValues: true,
        enableRowActions: true,
        manualPagination: true,
        rowCount: paginacion.total,
        pageCount: paginacion.ultima_pagina,
        onPaginationChange: setPaginationState,
        state: {
            showProgressBars: isLoading,
            pagination: paginationState,
        },
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Editar",
                        onClick: handleEdit,
                        // GERENTE siempre puede editar; TIC con permiso gestionar también
                        visible: () =>
                            usuario.roles?.includes(Roles.GERENTE) ||
                            usuario.permissions?.includes(
                                "tic.usuarios.gestionar",
                            ),
                    },
                    {
                        icon: IconRestore,
                        label: "Resetear contraseña",
                        onClick: handleResetPassword,
                        // Solo GERENTE
                        visible: () => usuario.roles?.includes(Roles.GERENTE),
                    },
                    {
                        icon: IconClockHour2,
                        label: "Código Biométrico",
                        onClick: handleCodigoBiometrico,
                        // Solo GERENTE
                        visible: () => usuario.roles?.includes(Roles.GERENTE),
                    },
                ]}
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
        },
    });

    return (
        <>
            <TableContent table={table} />
            <ModalActivateUser />
            <ModalResetPwdUser />
            <ModalCodigoBiometrico />
        </>
    );
};
