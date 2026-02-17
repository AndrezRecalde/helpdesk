import { IconEdit } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useMemo } from "react";
import { useAccessPermissionStore } from "../../hooks/accessControl/useAccessPermissionStore";
import { MenuTableActions } from "../elements/tables/MenuTableActions";

export const PermissionsTable = ({ setModalVisible }) => {
    const { setActivePermission, permissions, isLoading } =
        useAccessPermissionStore();

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Nombre del Permiso",
            },
        ],
        [],
    );

    const handleEdit = (permission) => {
        setActivePermission(permission);
        setModalVisible(true);
    };

    const table = useMantineReactTable({
        columns,
        data: permissions,
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
