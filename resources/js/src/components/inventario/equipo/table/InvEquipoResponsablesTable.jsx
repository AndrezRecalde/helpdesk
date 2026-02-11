import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    AlertSection,
    BtnSection,
    MenuTableActions,
    TableContent,
} from "../../../../components";
import { Text } from "@mantine/core";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";
import { IconCubePlus, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const InvEquipoResponsablesTable = () => {
    const { activateInvEquipo, startRemoveUsuarioEquipo } = useInvEquipoStore();
    const { modalActionAssignEquipo } = useInvUiEquipo();
    const { usuarios: responsables = [] } = activateInvEquipo || {};

    const columns = useMemo(
        () => [
            {
                header: "Responsable",
                accessorKey: "responsable",
                filterVariant: "autocomplete",
            },
            {
                header: "Departamento",
                accessorKey: "direccion",
                filterVariant: "autocomplete",
            },
            {
                header: "Concepto de uso",
                accessorKey: "concepto_nombre",
            },
        ],
        [responsables],
    );

    const handleDelete = useCallback(
        (selected) => {
            const { pivot = {} } = selected;
            //console.log(pivot);

            Swal.fire({
                text: `¿Deseas remover el responsable? ${selected.responsable}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startRemoveUsuarioEquipo(pivot.equipo_id, pivot.id);
                    //console.log(message.idper_permisos)
                }
            });
        },
        [responsables],
    );

    const handleAssign = useCallback(() => {
        //console.log(selected);
        //setActivateInvEquipo(selected);
        modalActionAssignEquipo(true);
    }, [responsables]);

    const table = useMantineReactTable({
        columns,
        data: responsables, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
        renderDetailPanel: ({ row }) => (
            <div>
                <Text fz="md" fw={300}>
                    {row.original.observacion || "Sin Observación"}
                </Text>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                    Observación
                </Text>
            </div>
        ),
        renderRowActionMenuItems: ({ row }) => (
            <MenuTableActions
                row={row}
                actions={[
                    {
                        icon: IconTrash,
                        label: "Eliminar",
                        onClick: handleDelete,
                    },
                ]}
            />
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <BtnSection
                heigh={30}
                fontSize={12}
                IconSection={IconCubePlus}
                handleAction={handleAssign}
                disabled={
                    activateInvEquipo?.estado_id === 4 ||
                    activateInvEquipo?.estado_id === 5
                }
            >
                Agregar
            </BtnSection>
        ),
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

    return (
        <div>
            <div>
                {activateInvEquipo?.fecha_baja ? (
                    <AlertSection
                        variant="light"
                        color="indigo.5"
                        title="Información"
                        icon={IconInfoCircle}
                    >
                        El equipo se ha dado de baja, no mantiene prestaciones
                        ni custodio activo actualmente. El equipo reposa en las
                        instalaciones de Bodega de la Gestión Administrativa
                    </AlertSection>
                ) : null}
            </div>
            <div>
                <TableContent table={table} />
            </div>
        </div>
    );
};
