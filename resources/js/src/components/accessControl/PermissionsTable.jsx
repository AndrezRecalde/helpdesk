import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useAccessPermissionStore } from "../../hooks";
import { MenuTableActions, BtnSection } from "../../components";
import { IconCubePlus, IconEdit } from "@tabler/icons-react";

export const PermissionsTable = ({
    setModalVisible,
    handleOpenPermissionModal,
}) => {
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
        renderTopToolbarCustomActions: () => (
            <BtnSection
                IconSection={IconCubePlus}
                handleAction={handleOpenPermissionModal}
            >
                Crear Permiso
            </BtnSection>
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
