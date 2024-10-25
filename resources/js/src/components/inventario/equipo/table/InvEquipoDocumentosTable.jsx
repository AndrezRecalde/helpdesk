import { useCallback, useMemo } from "react";
import { useMantineReactTable } from "mantine-react-table";
import {
    BtnDownloadDocumento,
    BtnSection,
    MenuTable_D,
    TableContent,
} from "../../../../components";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";
import { IconCopyPlus } from "@tabler/icons-react";
import Swal from "sweetalert2";

export const InvEquipoDocumentosTable = () => {
    const { activateInvEquipo, startEliminarArchivo, startDescargarArchivo } =
        useInvEquipoStore();
    const { modalActionAddDocumento } = useInvUiEquipo();
    const { documentos = [] } = activateInvEquipo || {};

    const columns = useMemo(
        () => [
            {
                header: "Nombre Documento",
                accessorKey: "nombre_documento",
                filterVariant: "autocomplete",
            },
            {
                header: "Documento",
                accessorKey: "documento",
                Cell: ({ cell }) => (
                    <BtnDownloadDocumento
                        cell={cell}
                        handleDownload={handleDownload}
                    />
                ),
            },
        ],
        [documentos]
    );

    const handleDownload = useCallback(
        (selected) => {
            console.log(selected);
            startDescargarArchivo(selected);
        },
        [documentos]
    );

    const handleAgregar = useCallback(() => {
        modalActionAddDocumento(true);
    }, [documentos]);

    const handleDelete = useCallback(
        (selected) => {
            //const { pivot = {} } = selected;
            console.log(selected);

            Swal.fire({
                text: `¿Deseas remover el documento?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!",
            }).then((result) => {
                if (result.isConfirmed) {
                    //startRemoveUsuarioEquipo(pivot.equipo_id, pivot.id);
                    //console.log(message.idper_permisos)
                    startEliminarArchivo(selected);
                }
            });
        },
        [documentos]
    );

    const table = useMantineReactTable({
        columns,
        data: documentos, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //state: { showProgressBars: isLoading },
        enableFacetedValues: true,
        enableDensityToggle: false,
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => (
            <MenuTable_D row={row} handleDelete={handleDelete} />
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
