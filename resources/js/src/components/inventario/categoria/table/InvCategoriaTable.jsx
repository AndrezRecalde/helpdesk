import { useCallback, useMemo } from "react";
//import { NavLink } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { BtnSection, MenuTable_E, TableContent } from "../../../../components";
import { useInvCategoriaStore, useInvUiCategoria } from "../../../../hooks";
import { IconCubePlus } from "@tabler/icons-react";

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
        [categorias]
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
        [categorias]
    );

    const table = useMantineReactTable({
        columns,
        data: categorias, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
