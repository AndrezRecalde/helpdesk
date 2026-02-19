import { useMemo } from "react";
import { Box } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { MenuTableActions, BtnSection } from "../../components";
import { useRoleStore } from "../../hooks";
import { IconCubePlus, IconEdit } from "@tabler/icons-react";

export const RolesTable = ({ setModalVisible, handleOpenRoleModal }) => {
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
        renderTopToolbarCustomActions: () => (
            <BtnSection
                IconSection={IconCubePlus}
                handleAction={handleOpenRoleModal}
            >
                Crear Rol
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
