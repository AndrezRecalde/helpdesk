import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { BtnSection, MenuTable_E, TableContent } from "../../../../components";
import { IconCubePlus } from "@tabler/icons-react";
import { useInvConceptoStore, useInvUiConcepto } from "../../../../hooks";

export const InvConceptoTable = () => {
    const { isLoading, invConceptos, setActivateInvConcepto } =
        useInvConceptoStore();
    const { modalActionConcepto } = useInvUiConcepto();

    const columns = useMemo(
        () => [
            {
                header: "Concepto de Estado",
                accessorKey: "nombre_concepto",
            },
        ],
        [invConceptos]
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvConcepto(selected);
            modalActionConcepto(true);
        },
        [invConceptos]
    );

    const handleAgregar = useCallback(() => {
        //console.log("agregar");
        modalActionConcepto(true);
    }, [invConceptos]);

    const table = useMantineReactTable({
        columns,
        data: invConceptos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
