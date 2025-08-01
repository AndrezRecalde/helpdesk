import { useEffect } from "react";
import { Button, Container, Divider, Group, LoadingOverlay } from "@mantine/core";
import {
    BtnSection,
    ModalAnularSoporte,
    ModalAsignarSoporte,
    ModalDiagnostico,
    ModalSolicitudAdminSoporte,
    SolicitudesTable,
    TextSection,
    TitlePage,
} from "../../components";
import { useSoporteStore, useTitlePage, useUiSoporte } from "../../hooks";
import { useDispatch } from "react-redux";
import { onLoadSoportes } from "../../store/soporte/soporteSlice";
import { IconBrandTelegram } from "@tabler/icons-react";
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";

const SolicitudesActualesPage = () => {
    useTitlePage("Helpdesk | Solicitudes");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const dispatch = useDispatch();
    const {
        loadPDF,
        startLoadSoportesActuales,
        soportes,
        clearSoportes,
        message,
        errores,
    } = useSoporteStore();
    const { modalActionAddSolicitud } = useUiSoporte();

    const fecha_actual = new Date();

    const { data, error, isLoading } = useSWR(
        usuario,
        startLoadSoportesActuales,
        { refreshInterval: 6000 }
    );

    useEffect(() => {
        dispatch(onLoadSoportes(data?.soportes ? data?.soportes : []));
    }, [data]);

    useEffect(() => {
        return () => {
            mutate(
                (key) => true, // which cache keys are updated
                undefined, // update cache data to `undefined`
                { revalidate: false } // do not revalidate
            );
            clearSoportes();
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
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    const handleOpenModal = () => {
        modalActionAddSolicitud(1);
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Solicitudes Actuales</TitlePage>
                {usuario.role_id === 1 ? (
                    <BtnSection
                        handleAction={handleOpenModal}
                        IconSection={IconBrandTelegram}
                    >
                        Nueva solicitud
                    </BtnSection>
                ) : null}
            </Group>
            <Group justify="space-between" mb={20}>
                <TextSection fw={700} tt="" fz={16}>
                    Tienes {soportes?.length} solicitudes
                </TextSection>
                <TextSection fw={700} tt="" fz={16}>
                    {fecha_actual.toLocaleDateString()}
                </TextSection>
            </Group>
            {/*  {soportes.length !== 0 ? ( */}
            <Divider my="md" />
            <LoadingOverlay
                visible={loadPDF}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <SolicitudesTable
                menu={usuario.role_id === 1 ? 1 : 2}
                isLoading={isLoading}
            />

            {/* ) : null} */}
            <ModalSolicitudAdminSoporte />
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico option={1} />
        </Container>
    );
};

export default SolicitudesActualesPage;
