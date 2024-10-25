import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { MenuTable_E, BtnSection, TableContent } from "../../../../components";
import { useInvPerifericoStore, useInvUiPeriferico } from "../../../../hooks";
import { IconCopyPlus } from "@tabler/icons-react";

export const InvPerifericoTable = () => {
    const { isLoading, invPerifericos, setActivateInvPeriferico } =
        useInvPerifericoStore();
    const { modalActionPeriferico } = useInvUiPeriferico();

    const columns = useMemo(
        () => [
            {
                header: "Modelo - Serie",
                accessorFn: (row) => row.modelo + " " + row.numero_serie,
            },
            {
                header: "Marca",
                accessorKey: "nombre_marca",
            },
            {
                header: "Estado",
                accessorKey: "nombre_estado",
            },
        ],
        [invPerifericos]
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvPeriferico(selected);
            modalActionPeriferico(true);
        },
        [invPerifericos]
    );

    const handleAgregar = useCallback(() => {
        //console.log("agregar");
        modalActionPeriferico(true);
    }, [invPerifericos]);

    const table = useMantineReactTable({
        columns,
        data: invPerifericos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
