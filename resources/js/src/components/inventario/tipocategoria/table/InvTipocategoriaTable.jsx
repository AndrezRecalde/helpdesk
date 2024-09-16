import { useCallback, useMemo } from "react";
import { useInvTipocategoriaStore, useInvUiTipocategoria } from "../../../../hooks";
import { BtnSection, MenuTable_E, TableContent } from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { IconCopyPlus } from "@tabler/icons-react";

export const InvTipocategoriaTable = () => {
    const { isLoading, tiposcategorias, setActivateTipocategoria } =
        useInvTipocategoriaStore();
    const { modalActionTipocategoria } = useInvUiTipocategoria();

    const columns = useMemo(
        () => [
            {
                header: "Tipos categorías",
                accessorKey: "nombre_tipocategoria",
                minSize: 100, //min size enforced during resizing
                maxSize: 400, //max size enforced during resizing
                size: 300, //medium column
            },
        ],
        [tiposcategorias]
    );

    const handleEditar = useCallback(
        (selected) => {
            console.log("editar");
            setActivateTipocategoria(selected);
            modalActionTipocategoria(true);
        },
        [tiposcategorias]
    );

    const handleAgregar = useCallback(() => {
        console.log("agregar");
        modalActionTipocategoria(true);
    }, [tiposcategorias]);

    const table = useMantineReactTable({
        columns,
        data: tiposcategorias, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
