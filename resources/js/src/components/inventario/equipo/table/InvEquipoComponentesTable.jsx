import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { IconCopyPlus } from "@tabler/icons-react";
import {
    BtnSection,
    MenuTable_D,
    MenuTable_Perif,
    TableContent,
} from "../../../../components";
import { useInvEquipoStore, useInvPerifericoStore, useInvUiEquipo, useInvUiPeriferico } from "../../../../hooks";
import Swal from "sweetalert2";

export const InvEquipoComponentesTable = () => {
    const { activateInvEquipo } = useInvEquipoStore();
    const { modalActionAssignPeriferico } = useInvUiEquipo();
    const { modalActionTransferirPeriferico } = useInvUiPeriferico();
    const { setActivateInvPeriferico } = useInvPerifericoStore();
    const { perifericos = [] } = activateInvEquipo || {};

    const columns = useMemo(
        () => [
            {
                header: "Modelo",
                accessorKey: "modelo",
                filterVariant: "autocomplete",
            },
            {
                header: "Categoría",
                accessorKey: "categoria.nombre_categoria",
                filterVariant: "autocomplete",
            },
            {
                header: "No. serie",
                accessorKey: "numero_serie",
            },
        ],
        [perifericos]
    );

    const handleTrasnferir = useCallback(
        (selected) => {
            //const { pivot = {} } = selected;
            console.log(selected);
            setActivateInvPeriferico(selected);
            modalActionTransferirPeriferico(true);
        },
        [perifericos]
    );

    const handleAssign = useCallback(() => {
        //console.log(selected);
        //setActivateInvEquipo(selected);
        modalActionAssignPeriferico(true);
    }, [perifericos]);

    const table = useMantineReactTable({
        columns,
        data: perifericos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Perif row={row} handleTrasnferir={handleTrasnferir} />
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <BtnSection
                heigh={30}
                fontSize={12}
                IconSection={IconCopyPlus}
                handleAction={handleAssign}
            >
                Agregar
            </BtnSection>
        ),
        mantineTableBodyCellProps: ({ cell }) => ({
            style: {
                backgroundColor:
                    cell.row.original.estado_id == 1
                        ? "#08c2a6"
                        : cell.row.original.estado_id == 2
                        ? "#9af5b8"
                        : cell.row.original.estado_id == 3
                        ? "#cf001c" //#fcb281
                        : "",
                color:
                    cell.row.original.estado_id == 1
                        ? "white"
                        : cell.row.original.estado_id == 2
                        ? "black"
                        : cell.row.original.estado_id == 3 &&
                          colorScheme === "dark"
                        ? "white"
                        : cell.row.original.estado_id == 3 &&
                          colorScheme === "light"
                        ? "black"
                        : "",
            },
        }),
    });

    return <TableContent table={table} />;
};
