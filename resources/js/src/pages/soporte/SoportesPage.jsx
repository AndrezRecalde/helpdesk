import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
import {
    FilterFormSoportes,
    TextSection,
    TitlePage,
    SoportesTable,
    BtnAddActions,
    ModalSolicitudAdminSoporte,
    ModalCreateSoporte,
    ModalAsignarSoporte,
    ModalAnularSoporte,
    ModalDiagnostico,
    BtnSection,
} from "../../components";
import { useDireccionStore, useSoporteStore, useUiSoporte } from "../../hooks";
import Swal from "sweetalert2";

export const SoportesPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { message, errores, clearSoportes } = useSoporteStore();
    const { modalActionAddSolicitud, modalActionCreateSoporte } =
        useUiSoporte();

    const handleOpenModalSolicitud = () => {
        modalActionAddSolicitud(1);
    };

    const handleOpenModalSoporte = () => {
        console.log("clic");
        modalActionCreateSoporte(1);
    };

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
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

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Gestión De Soportes
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes 20 soportes
                </TextSection>
                {usuario.role_id === 1 ? (
                    <BtnAddActions
                        handleOpenModalSolicitud={handleOpenModalSolicitud}
                        handleOpenModalSoporte={handleOpenModalSoporte}
                    >
                        Crear nuevo
                    </BtnAddActions>
                ) : (
                    <BtnSection handleAction={handleOpenModalSoporte}>
                        Agregar soporte
                    </BtnSection>
                )}
            </Group>
            <FilterFormSoportes role={usuario.role_id === 2 ? true : false} />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SoportesTable />
                </Card.Section>
            </Card>
            <ModalSolicitudAdminSoporte />
            <ModalCreateSoporte role={usuario.role_id === 1 ? false : true} />
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico />
        </Container>
    );
};
