import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import { IconCopyPlus } from "@tabler/icons-react";
import {
    BtnSection,
    MenuTable_Perif,
    TableContent,
} from "../../../../components";
import {
    useInvEquipoStore,
    useInvPerifericoStore,
    useInvUiEquipo,
    useInvUiPeriferico,
} from "../../../../hooks";
import Swal from "sweetalert2";
import { useMantineTheme } from "@mantine/core";

export const InvEquipoComponentesTable = () => {
    const { colorScheme } = useMantineTheme();
    const { activateInvEquipo, startClearEquipoFromEquipo } =
        useInvEquipoStore();
    const { modalActionAssignPeriferico } = useInvUiEquipo();
    const { modalActionTransferirPeriferico } = useInvUiPeriferico();
    const { setActivateInvPeriferico } = useInvPerifericoStore();
    const { perifericos = [] } = activateInvEquipo || {};

    const columns = useMemo(
        () => [
            {
                header: "Modelo",
                accessorKey: "nombre_periferico",
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

    const handleTransferir = useCallback(
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

    const handleClearEquipo = useCallback(
        (selected) => {
            //const { pivot = {} } = selected;
            //console.log(selected);

            Swal.fire({
                text: `¿Deseas remover periférico del equipo?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, remover!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startClearEquipoFromEquipo(selected);
                }
            });
        },
        [perifericos]
    );

    const table = useMantineReactTable({
        columns,
        data: perifericos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableFilters: false,
        enableDensityToggle: false,
        enablePagination: false,
        enableSorting: false,
        enableHiding: false,
        enableFullScreenToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Perif
                row={row}
                handleTrasnferir={handleTransferir}
                handleClearEquipo={handleClearEquipo}
            />
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
        mantineTableProps: {
            highlightOnHover: false,
            withColumnBorders: true,
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
