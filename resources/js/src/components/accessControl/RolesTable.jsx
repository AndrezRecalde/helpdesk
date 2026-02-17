import { useMemo } from "react";
import { Box } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useRoleStore } from "../../hooks/accessControl/useRoleStore";
import { MenuTableActions } from "../elements/tables/MenuTableActions";

export const RolesTable = ({ setModalVisible }) => {
    const { setActiveRole, roles, isLoading } = useRoleStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Nombre del Rol",
            },
            {
                accessorFn: (row) =>
                    row.permissions?.map((p) => p.name).join(", "),
                header: "Permisos",
                Cell: ({ cell }) => (
                    <Box style={{ whiteSpace: "normal" }}>
                        {cell.getValue()}
                    </Box>
                ),
            },
        ],
        [],
    );

    const handleEdit = (role) => {
        setActiveRole(role);
        setModalVisible(true);
    };

    const table = useMantineReactTable({
        columns,
        data: roles,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        state: { showProgressBars: isLoading },
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        label: "Editar",
                        icon: IconEdit,
                        onClick: handleEdit,
                    },
                ]}
            />
        ),
        localization: {
            actions: "Acciones",
            noRecordsToDisplay: "No hay registros para mostrar",
        },
        mantineTableProps: {
            withColumnBorders: true,
            withTableBorder: true,
        },
    });

    return <MantineReactTable table={table} />;
};
