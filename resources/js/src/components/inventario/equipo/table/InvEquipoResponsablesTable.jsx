import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    AlertSection,
    BtnSection,
    MenuTable_D,
    TableContent,
} from "../../../../components";
import { Text } from "@mantine/core";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";
import { IconCopyPlus, IconInfoCircle } from "@tabler/icons-react";
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
        [responsables]
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
        [responsables]
    );

    const handleAssign = useCallback(
        () => {
            //console.log(selected);
            //setActivateInvEquipo(selected);
            modalActionAssignEquipo(true);
        },
        [responsables]
    );

    const table = useMantineReactTable({
        columns,
        data: responsables, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
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
            <MenuTable_D row={row} handleDelete={handleDelete} />
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
                        El equipo se ha dado de baja, no mantiene un responsable
                        activo actualmente. El equipo reposa en las
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
