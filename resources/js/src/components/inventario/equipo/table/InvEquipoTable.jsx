import { useCallback, useMemo } from "react";
import { Table } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs";
import {
    ActionReportPDF,
    InvAsignarCustodioModal,
    InvBajaEquipoModal,
    InvDeleteEquipoModal,
    InvEquipoAsignacionModal,
    InvEquipoDocumentoModal,
    InvEquipoModal,
    InvShowEquipoModal,
    MenuTableActions,
    TableContent,
} from "../../../../components";
import {
    useInvEquipoStore,
    useInvUiEquipo,
    useStorageField,
    useUiInvCustodio,
} from "../../../../hooks";
import Swal from "sweetalert2";
import {
    IconEyeCheck,
    IconEditCircle,
    IconUserShare,
    IconUserHexagon,
    IconTrash,
} from "@tabler/icons-react";

export const InvEquipoTable = () => {
    const {
        isLoading,
        invEquipos,
        activateInvEquipo,
        startShowInvEquipo,
        setActivateInvEquipo,
        startAsignarCustodio,
        startRemoverCustodio,
        startExportEquipos,
    } = useInvEquipoStore();
    const {
        modalActionEquipo,
        modalActionViewEquipo,
        modalActionDeleteEquipo,
    } = useInvUiEquipo();
    const { modalActionCustodio } = useUiInvCustodio();
    const { storageFields } = useStorageField();

    const columns = useMemo(
        () => [
            {
                header: "Código",
                accessorFn: (row) =>
                    (row.codigo_antiguo || "SCA") +
                    " : : : : " +
                    (row.codigo_nuevo || "SCN"), //normal accessorKey
                filterVariant: "autocomplete",
            },
            {
                header: "Categoría",
                accessorKey: "nombre_categoria",
            },
            {
                header: "Equipo",
                accessorFn: (row) => row.nombre_marca + " " + row.modelo,
                filterVariant: "autocomplete",
            },
            {
                header: "Departamento",
                accessorFn: (row) =>
                    (row?.direccion || "SIN DIRECCION")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
            },
            {
                header: "Custodio",
                accessorFn: (row) =>
                    (row?.responsable || "SIN CUSTODIO")
                        .toString()
                        .toUpperCase(),
                filterVariant: "autocomplete",
            },
            {
                header: "Estado",
                accessorKey: "nombre_estado",
            },
        ],
        [invEquipos],
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            startShowInvEquipo(selected);
            modalActionEquipo(true);
            //setActivateInvEquipo(selected);
        },
        [invEquipos],
    );

    const handleShow = useCallback(
        (selected) => {
            //console.log(selected);
            startShowInvEquipo(selected);
            modalActionViewEquipo(true);
        },
        [invEquipos],
    );

    /* const handleAssign = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateInvEquipo(selected);
            modalActionAssignEquipo(true);
        },
        [invEquipos]
    ); */

    const handleDelete = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateInvEquipo(selected);
            modalActionDeleteEquipo(true);
        },
        [invEquipos],
    );

    const handleRemoveCustodio = useCallback(
        (selected) => {
            Swal.fire({
                title: "¿Estas seguro?",
                text: `¿Confirmas en remover ${selected.responsable} como custodio?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, confirmo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startRemoverCustodio(selected, storageFields);
                }
            });
        },
        [invEquipos],
    );

    const handleAssignCustodio = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateInvEquipo(selected);
            modalActionCustodio(true);
        },
        [invEquipos],
    );

    const handleExportDataPDF = (e) => {
        e.preventDefault();
        //console.log("export");
        startExportEquipos(invEquipos);
    };

    const table = useMantineReactTable({
        columns,
        data: invEquipos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableRowActions: true,
        localization: MRT_Localization_ES,
        renderTopToolbarCustomActions: ({ table }) =>
            invEquipos.length !== 0 ? (
                <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
            ) : null,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconEyeCheck,
                        label: "Ver",
                        onClick: handleShow,
                    },
                    {
                        icon: IconEditCircle,
                        label: "Editar",
                        onClick: handleEditar,
                        disabled: (row) =>
                            row.estado_id === 4 || row.estado_id === 5,
                    },
                    {
                        icon: IconUserShare,
                        label: "Remover Custodio",
                        onClick: handleRemoveCustodio,
                        visible: (row) => row.user_id || row.direccion_id,
                        disabled: (row) =>
                            row.estado_id === 4 || row.estado_id === 5,
                    },
                    {
                        icon: IconUserHexagon,
                        label: "Asignar Custodio",
                        onClick: handleAssignCustodio,
                        visible: (row) => !(row.user_id || row.direccion_id),
                        disabled: (row) =>
                            row.estado_id === 4 || row.estado_id === 5,
                    },
                    {
                        icon: IconTrash,
                        label: "Eliminar",
                        onClick: handleDelete,
                        disabled: true,
                    },
                ]}
            />
        ),
        mantineTableBodyCellProps: ({ column, cell }) => ({
            style:
                column.id === "nombre_estado"
                    ? {
                          backgroundColor: cell.row.original.color,
                          color: "white",
                      }
                    : {},
        }),
        renderDetailPanel: ({ row }) => (
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w={160}>No. Serie</Table.Th>
                        <Table.Td>
                            {row.original.numero_serie || "SIN NUMERO DE SERIE"}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th w={160}>Descripción</Table.Th>
                        <Table.Td>
                            {row.original.descripcion || "SIN DESCRIPCIÓN"}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ),
        mantineTableProps: {
            withColumnBorders: true,
            striped: true,
            withTableBorder: true,
        },
    });

    return (
        <>
            <TableContent table={table} />
            <InvEquipoModal />
            <InvShowEquipoModal />
            <InvEquipoAsignacionModal />
            <InvDeleteEquipoModal />
            <InvBajaEquipoModal />
            <InvEquipoDocumentoModal />
            <InvAsignarCustodioModal
                setActivateElement={setActivateInvEquipo}
                activateElement={activateInvEquipo}
                startAsignarCustodioFn={startAsignarCustodio}
            />
        </>
    );
};
