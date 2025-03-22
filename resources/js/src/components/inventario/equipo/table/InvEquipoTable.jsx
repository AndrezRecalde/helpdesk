import { useCallback, useMemo } from "react";
import { Table } from "@mantine/core";
import { useMantineReactTable } from "mantine-react-table";
import {
    ActionReportPDF,
    MenuTable_Equipo,
    TableContent,
} from "../../../../components";
import { useInvEquipoStore, useInvUiEquipo, useUiInvCustodio } from "../../../../hooks";
import Swal from "sweetalert2";

export const InvEquipoTable = () => {
    const {
        isLoading,
        invEquipos,
        startShowInvEquipo,
        setActivateInvEquipo,
        startRemoverCustodio,
        startExportEquipos,
    } = useInvEquipoStore();
    const {
        modalActionEquipo,
        modalActionViewEquipo,
        modalActionDeleteEquipo,
    } = useInvUiEquipo();
    const { modalActionCustodio } = useUiInvCustodio();

    const columns = useMemo(
        () => [
            {
                header: "Código",
                accessorFn: (row) =>
                    (row.codigo_antiguo || "S/C") +
                    " : : : : " +
                    (row.codigo_nuevo || "S/C"), //normal accessorKey
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
                accessorFn: (row) => row.direccion || "Sin Dirección",
                filterVariant: "autocomplete",
            },
            {
                header: "Custodio",
                accessorFn: (row) => row.responsable || "Sin Custodio",
                filterVariant: "autocomplete",
            },
            {
                header: "Estado",
                accessorKey: "nombre_estado",
            },
        ],
        [invEquipos]
    );

    const handleEditar = useCallback(
        (selected) => {
            //console.log("editar");
            modalActionEquipo(true);
            startShowInvEquipo(selected);
            //setActivateInvEquipo(selected);
        },
        [invEquipos]
    );

    const handleShow = useCallback(
        (selected) => {
            //console.log(selected);
            modalActionViewEquipo(true);
            startShowInvEquipo(selected);
        },
        [invEquipos]
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
        [invEquipos]
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
                    startRemoverCustodio(selected);
                }
            });
        },
        [invEquipos]
    );

    const handleAssignCustodio = useCallback(
        (selected) => {
            //console.log(selected);
            setActivateInvEquipo(selected);
            modalActionCustodio(true);
        },
        [invEquipos]
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
        enableDensityToggle: false,
        enableRowActions: true,
        renderTopToolbarCustomActions: ({ table }) =>
            invEquipos.length !== 0 ? (
                <ActionReportPDF handleExportDataPDF={handleExportDataPDF} />
            ) : null,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_Equipo
                row={row}
                handleEdit={handleEditar}
                handleShow={handleShow}
                //handleAssign={handleAssign}
                handleDelete={handleDelete}
                handleRemoveCustodio={handleRemoveCustodio}
                handleAssignCustodio={handleAssignCustodio} //TODO: REALIZAR FUNCIONES Y MODAL
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
                        <Table.Td>{row.original.numero_serie}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th w={160}>Descripción</Table.Th>
                        <Table.Td>
                            {row.original.descripcion || "Sin Descripción"}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        ),
        mantineTableProps: {
            withColumnBorders: true,
            striped: true,
            withTableBorder: true,
            //withTableBorder: colorScheme === "light",
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
