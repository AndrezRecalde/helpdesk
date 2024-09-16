import { useMantineReactTable } from "mantine-react-table";
import { BtnSection, MenuTable_E } from "../../../components";
import { useCallback, useMemo } from "react";

export const InvTipocategoriasPage = () => {


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
        [lestrategias]
    );

    const handleEditar = useCallback(() => {
        console.log("editar");
    }, [lestrategias]);

    const table = useMantineReactTable({
        columns,
        data: lestrategias, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        defaultColumn: { minSize: 80, maxSize: 200, size: 100 },
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_E row={row} handleEdit={handleEdit} />
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
