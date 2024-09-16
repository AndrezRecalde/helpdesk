import { useCallback } from "react";
import { BtnSection, MenuTable_E, TableContent } from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { useInvCategoriaStore, useInvUiCategoria } from "../../../../hooks";
import { IconCopyPlus } from "@tabler/icons-react";

export const InvCategoriaTable = () => {

    const { isLoading, categorias, setActivateInvCategoria } = useInvCategoriaStore();
    const { modalActionCategoria } = useInvUiCategoria();

    const columns = useMemo(
        () => [
            {
                header: "Categorias",
                accessorKey: "nombre_categoria",
            },
            {
                header: "Categorias",
                accessorKey: "nombre_tipocategoria",
            },
        ],
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
        defaultColumn: { minSize: 80, maxSize: 200, size: 100 },
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
