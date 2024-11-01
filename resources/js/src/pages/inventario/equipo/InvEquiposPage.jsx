import { useEffect } from "react";
import { Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormEquipos,
    InvBajaEquipoModal,
    InvDeleteEquipoModal,
    InvEquipoAsignacionModal,
    InvEquipoAssignComponente,
    InvEquipoDocumentoModal,
    InvEquipoModal,
    InvEquipoTable,
    InvShowEquipoModal,
    InvTransferirPerifericoModal,
    TitlePage,
} from "../../../components";
import { IconCopyPlus } from "@tabler/icons-react";
import {
    useDireccionStore,
    useInvCategoriaStore,
    useInvEquipoStore,
    useInvEstadoStore,
    useInvUiEquipo,
    useTitlePage,
    useUsersStore,
} from "../../../hooks";
import Swal from "sweetalert2";

export const InvEquiposPage = () => {
    useTitlePage("Helpdesk | Inv. Equipos");
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadInvCategorias, startClearInvCategorias } =
        useInvCategoriaStore();
    const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();
    const { isExport, message, errores } = useInvEquipoStore();
    const { modalActionEquipo } = useInvUiEquipo();

    useEffect(() => {
        startLoadDirecciones();
        startLoadUsersGeneral({});
        startLoadInvCategorias({});
        startLoadInvEstados();
        return () => {
            clearDirecciones();
            clearUsers();
            startClearInvCategorias();
            startClearInvEstados();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        if (isExport === true) {
            Swal.fire({
                icon: "warning",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando isExport es false
        }
    }, [isExport]);

    const handleAgregar = () => {
        modalActionEquipo(true);
    };

    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2}>Inventario de Equipos</TitlePage>
                <BtnSection
                    IconSection={IconCopyPlus}
                    handleAction={handleAgregar}
                >
                    Agregar
                </BtnSection>
            </Group>
            <FilterFormEquipos />
            <InvEquipoTable />

            <InvEquipoModal />
            <InvShowEquipoModal />
            <InvEquipoAsignacionModal />
            <InvDeleteEquipoModal />
            <InvBajaEquipoModal />
            <InvEquipoAssignComponente />
            <InvTransferirPerifericoModal />
            <InvEquipoDocumentoModal />
        </Container>
    );
};
