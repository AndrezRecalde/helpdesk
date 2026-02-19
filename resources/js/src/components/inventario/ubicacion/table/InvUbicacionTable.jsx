import { useCallback, useMemo } from "react";
import { useInvUbicacionStore, useInvUiUbicacion } from "../../../../hooks";
import { useMantineReactTable } from "mantine-react-table";
import {
    MenuTableActions,
    BtnSection,
    TableContent,
    InvUbicacionModal,
} from "../../../../components";
import {
    IconCopyPlus,
    IconCubePlus,
    IconEditCircle,
} from "@tabler/icons-react";

export const InvUbicacionTable = () => {
    const { isLoading, invUbicaciones, setActivateInvUbicacion } =
        useInvUbicacionStore();
    const { modalActionUbicacion } = useInvUiUbicacion();

    const columns = useMemo(
        () => [
            {
                header: "Edificio",
                accessorKey: "nombre_edificio",
            },
            {
                header: "Ubicación física",
                accessorKey: "nombre_ubicacion",
            },
        ],
        [invUbicaciones],
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            setActivateInvUbicacion(selected);
            modalActionUbicacion(true);
        },
        [invUbicaciones],
    );

    const handleAgregar = useCallback(() => {
        //console.log("agregar");
        modalActionUbicacion(true);
    }, [invUbicaciones]);

    const table = useMantineReactTable({
        columns,
        data: invUbicaciones, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
            <InvUbicacionModal />
        </>
    );
};
