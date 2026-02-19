import { useCallback, useMemo } from "react";
//import { NavLink } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import {
    BtnSection,
    InvCategoriaModal,
    MenuTableActions,
    TableContent,
} from "../../../../components";
import { useInvCategoriaStore, useInvUiCategoria } from "../../../../hooks";
import { IconCubePlus, IconEditCircle } from "@tabler/icons-react";

export const InvCategoriaTable = () => {
    const { isLoading, categorias, setActivateInvCategoria } =
        useInvCategoriaStore();
    const { modalActionCategoria } = useInvUiCategoria();

    const columns = useMemo(
        () => [
            {
                header: "Categorias",
                accessorKey: "nombre_categoria",
            },
            {
                header: "Tipo Categoria",
                accessorKey: "nombre_tipocategoria",
            },
        ],
        [categorias],
    );

    /* const handleStock = useCallback(
        (selected) => {
            setActivateInvCategoria(selected);
            modalActionStockCategoria(true);
        },
        [categorias]
    ); */

    const handleAgregar = useCallback(() => {
        //console.log("agregar");
        modalActionCategoria(true);
    }, [categorias]);

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvCategoria(selected);
            modalActionCategoria(true);
        },
        [categorias],
    );

    const table = useMantineReactTable({
        columns,
        data: categorias, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEditCircle,
                        label: "Editar",
                        onClick: handleEditar,
                    },
                ]}
            />
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

    return (
        <>
            <TableContent table={table} />
            <InvCategoriaModal />
        </>
    );
};
