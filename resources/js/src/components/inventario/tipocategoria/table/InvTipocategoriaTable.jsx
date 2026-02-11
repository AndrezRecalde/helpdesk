import { useCallback, useMemo } from "react";
import {
    useInvTipocategoriaStore,
    useInvUiTipocategoria,
} from "../../../../hooks";
import {
    BtnSection,
    MenuTableActions,
    TableContent,
} from "../../../../components";
import { useMantineReactTable } from "mantine-react-table";
import { IconCubePlus, IconEditCircle } from "@tabler/icons-react";

export const InvTipocategoriaTable = () => {
    const { isLoading, tiposcategorias, setActivateTipocategoria } =
        useInvTipocategoriaStore();
    const { modalActionTipocategoria } = useInvUiTipocategoria();

    const columns = useMemo(
        () => [
            {
                header: "Tipos categorías",
                accessorKey: "nombre_tipocategoria",
            },
        ],
        [tiposcategorias],
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateTipocategoria(selected);
            modalActionTipocategoria(true);
        },
        [tiposcategorias],
    );

    const handleAgregar = useCallback(() => {
        //console.log("agregar");
        modalActionTipocategoria(true);
    }, [tiposcategorias]);

    const table = useMantineReactTable({
        columns,
        data: tiposcategorias, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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

    return <TableContent table={table} />;
};
