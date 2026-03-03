import { useEffect, useMemo } from "react";
import { Box, Group, Menu, Text } from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
    IconCheck,
    IconCubePlus,
    IconEdit,
    IconRotate,
    IconTrash,
} from "@tabler/icons-react";
import { useContratoStore, useUiContrato } from "../../../hooks";
import { BtnSection } from "../../../components";
import Swal from "sweetalert2";

export const ContratosTable = () => {
    const {
        contratos,
        isLoading,
        startLoadContratos,
        setActiveContrato,
        startDeleteContrato,
        startActivateContrato,
    } = useContratoStore();

    const { modalActionContrato } = useUiContrato();
    // Alternatively, I will create a simple local state or separate store for modal

    useEffect(() => {
        startLoadContratos();
    }, []);

    const handleCreateContract = () => {
        setActiveContrato(null);
        // open create modal
        modalActionContrato(1);
    };

    const handleEditContract = (row) => {
        setActiveContrato(row.original);
        // open edit modal
        modalActionContrato(1);
    };

    const handleDeleteContract = (row) => {
        Swal.fire({
            icon: "warning",
            title: "Estas seguro?",
            text: `El contrato ${row.original.codigo_contrato} será eliminado!`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Borrar!",
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteContrato(row.original);
            }
        });
    };

    const handleActivateContract = (row) => {
        Swal.fire({
            icon: "info",
            title: "¿Activar Contrato?",
            text: `¿Estás seguro de marcar el contrato ${row.original.codigo_contrato} como Activo? (Esto desactivará los demás contratos)`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Activar!",
        }).then((result) => {
            if (result.isConfirmed) {
                startActivateContrato(row.original);
            }
        });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "codigo_contrato",
                header: "Código Contrato",
                wrap: true,
            },
            {
                accessorKey: "activo",
                header: "Estado",
                Cell: ({ cell }) => (
                    <Text
                        c={
                            cell.getValue() === 1 || cell.getValue() === true
                                ? "teal.6"
                                : "red.6"
                        }
                        fw={600}
                        fz="sm"
                    >
                        {cell.getValue() === 1 || cell.getValue() === true
                            ? "ACTIVO"
                            : "INACTIVO"}
                    </Text>
                ),
            },
            {
                accessorKey: "licencias",
                header: "Licencias Asignadas",
                Cell: ({ row }) => {
                    const lics = row.original.licencias;
                    if (!lics || lics.length === 0) return "Sin licencias";
                    return lics.map((l) => l.nombre).join(", ");
                },
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: contratos,
        enableColumnOrdering: true,
        enableGrouping: true,
        enablePinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: true,
            density: "xs",
            pagination: { pageSize: 10, pageIndex: 0 },
        },
        state: {
            showProgressBars: isLoading,
        },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        mantinePaginationProps: {
            radius: "xl",
            size: "sm",
        },
        mantineSearchTextInputProps: {
            placeholder: "Buscar...",
        },
        renderRowActionMenuItems: ({ row }) => (
            <>
                <Menu.Item
                    leftSection={<IconEdit size={16} />}
                    onClick={() => handleEditContract(row)}
                >
                    Editar Contrato
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconCheck size={16} stroke={1.5} />}
                    onClick={() => handleActivateContract(row)}
                >
                    Activar Contrato
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    leftSection={<IconTrash size={16} />}
                    color="red"
                    onClick={() => handleDeleteContract(row)}
                >
                    Eliminar Contrato
                </Menu.Item>
            </>
        ),
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Box
                    sx={{
                        display: "flex",
                        gap: "16px",
                        padding: "8px",
                    }}
                >
                    <Group>
                        <BtnSection
                            handleAction={handleCreateContract}
                            IconSection={IconCubePlus}
                        >
                            Nuevo Contrato
                        </BtnSection>
                        <BtnSection
                            handleAction={() => startLoadContratos()}
                            IconSection={IconRotate}
                        >
                            Refrescar
                        </BtnSection>
                    </Group>
                </Box>
            );
        },
    });

    return <MantineReactTable table={table} />;
};
