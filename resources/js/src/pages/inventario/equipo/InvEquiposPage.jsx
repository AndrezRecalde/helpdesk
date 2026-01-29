import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    BtnAddActions,
    FilterFormEquipos,
    InvAsignarCustodioModal,
    InvBajaEquipoModal,
    InvDeleteEquipoModal,
    InvEquipoAsignacionModal,
    InvEquipoDocumentoModal,
    InvEquipoModal,
    InvEquipoTable,
    InvShowEquipoModal,
    TitlePage,
} from "../../../components";
import { IconCubePlus, IconDeviceDesktopDown } from "@tabler/icons-react";
import {
    useInvEquipoStore,
    useInvUiEquipo,
    useTitlePage,
} from "../../../hooks";
import Swal from "sweetalert2";

const InvEquiposPage = () => {
    useTitlePage("Inventario de Equipos Informáticos - Helpdesk");

    const {
        isExport,
        activateInvEquipo,
        setActivateInvEquipo,
        message,
        errores,
        startClearInvEquipos,
        startAsignarCustodio,
    } = useInvEquipoStore();
    const { modalActionEquipo, modalActionBajaEquipo } = useInvUiEquipo();

    useEffect(() => {
        return () => {
            startClearInvEquipos();
        };
    }, []);

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 2000,
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
                confirmButtonColor: "#38d17b",
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

    const handleBajaEquipo = () => {
        modalActionBajaEquipo(true);
    }

    const menuActions = [
        {
            label: "Nuevo Equipo",
            icon: IconCubePlus,
            onClick: handleAgregar,
            color: "teal",
        },
        {
            label: "Dar Baja Equipo",
            icon: IconDeviceDesktopDown,
            onClick: handleBajaEquipo,
            color: "red",
        },
    ];

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Inventario de Equipos Informáticos</TitlePage>
                <BtnAddActions actions={menuActions}>Crear nuevo</BtnAddActions>
            </Group>
            <Divider my="md" />
            <FilterFormEquipos />
            <InvEquipoTable />

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
        </Container>
    );
};

export default InvEquiposPage;
