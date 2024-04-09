import { useEffect } from "react";
import { Card, Container, Group, LoadingOverlay } from "@mantine/core";
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
import useSWR, { mutate } from "swr";
import Swal from "sweetalert2";


export const SolicitudesActualesPage = () => {
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
        { refreshInterval: 2000 }
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
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [errores]);

    const handleOpenModal = () => {
        modalActionAddSolicitud(1);
    };

    return (
        <Container size="xxl">
            <Group justify="space-between">
                <TitlePage order={2} size="h2">
                    Solicitudes Actuales
                </TitlePage>
                {usuario.role_id === 1 ? (
                    <BtnSection handleAction={handleOpenModal}>
                        Nueva solicitud
                    </BtnSection>
                ) : null}
            </Group>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes {soportes?.length} solicitudes
                </TextSection>
                <TextSection fw={700} tt="" fz={16}>
                    {fecha_actual.toLocaleDateString()}
                </TextSection>
            </Group>
            {/*  {soportes.length !== 0 ? ( */}
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                <LoadingOverlay visible={loadPDF} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    <SolicitudesTable
                        menu={usuario.role_id === 1 ? 1 : 2}
                        isLoading={isLoading}
                    />
                </Card.Section>
            </Card>
            {/* ) : null} */}
            <ModalSolicitudAdminSoporte />
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico />
        </Container>
    );
};
