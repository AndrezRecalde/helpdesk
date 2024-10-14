import { useCallback, useMemo } from "react";
import { NavLink } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { BtnSection, MenuTable_E, TableContent } from "../../../../components";
import { useInvCategoriaStore, useInvUiCategoria } from "../../../../hooks";
import { IconCopyPlus } from "@tabler/icons-react";

export const InvCategoriaTable = () => {

    const { isLoading, categorias, setActivateInvCategoria } = useInvCategoriaStore();
    const { modalActionCategoria, modalActionStockCategoria } = useInvUiCategoria();

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
            {
                header: "Stock",
                accessorKey: "stock",
                Cell: ({ cell }) => (
                    <NavLink
                        onClick={() => handleStock(cell.row.original)}
                        label={cell.getValue()}
                    />
                )
            },
        ],
        [categorias]
    );

    const handleStock = useCallback(
        (selected) => {
            setActivateInvCategoria(selected);
            modalActionStockCategoria(true);
        },
        [categorias]
    );

    const handleAgregar = useCallback(() => {
        console.log("agregar");
        modalActionCategoria(true);
    }, [categorias]);

    const handleEditar = useCallback((selected) => {
        console.log("editar");
        setActivateInvCategoria(selected);
        modalActionCategoria(true);
    }, [categorias]);

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
                IconSection={IconCopyPlus}
                handleAction={handleAgregar}
            >
                Agregar
            </BtnSection>
        ),
    });

    return <TableContent table={table} />;
};
