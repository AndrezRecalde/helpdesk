import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { BtnSection, MenuTable_E, TableContent } from "../../../../components";
import { useInvEstadoStore, useInvUiEstado } from "../../../../hooks";
import { IconCubePlus } from "@tabler/icons-react";
import { ColorSwatch } from "@mantine/core";

export const InvEstadoTable = () => {
    const { isLoading, invEstados, setActivateInvEstado } = useInvEstadoStore();
    const { modalActionEstado } = useInvUiEstado();

    const columns = useMemo(
        () => [
            {
                header: "Estado",
                accessorKey: "nombre_estado",
            },
            {
                header: "Color",
                accessorKey: "color",
                Cell: ({ cell }) => (
                    <ColorSwatch color={cell.row.original.color} />
                )
            },
        ],
        [invEstados]
    );

    const handleEditar = useCallback(
        (selected) => {
            console.log("editar");
            setActivateInvEstado(selected);
            modalActionEstado(true);
        },
        [invEstados]
    );

    const handleAgregar = useCallback(() => {
        console.log("agregar");
        modalActionEstado(true);
    }, [invEstados]);

    const table = useMantineReactTable({
        columns,
        data: invEstados, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEditar} />
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <BtnSection
                heigh={30}
                fontSize={12}
                IconSection={IconCubePlus}
                handleAction={handleAgregar}
            >
                Agregar
            </BtnSection>
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
