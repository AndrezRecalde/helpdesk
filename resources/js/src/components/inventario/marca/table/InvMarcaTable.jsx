import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    BtnSection,
    InvMarcaModal,
    MenuTableActions,
    TableContent,
} from "../../../../components";
import { useInvMarcaStore, useInvUiMarca } from "../../../../hooks";
import { IconCubePlus, IconEditCircle } from "@tabler/icons-react";

export const InvMarcaTable = () => {
    const { isLoading, invMarcas, setActivateInvMarca } = useInvMarcaStore();
    const { modalActionMarca } = useInvUiMarca();

    const columns = useMemo(
        () => [
            {
                header: "Marca",
                accessorKey: "nombre_marca",
            },
        ],
        [invMarcas],
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvMarca(selected);
            modalActionMarca(true);
        },
        [invMarcas],
    );

    const handleAgregar = useCallback(() => {
        //console.log("agregar");
        modalActionMarca(true);
    }, [invMarcas]);

    const table = useMantineReactTable({
        columns,
        data: invMarcas, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
        },
    });

    return (
        <>
            <TableContent table={table} />
            <InvMarcaModal />
        </>
    );
};
