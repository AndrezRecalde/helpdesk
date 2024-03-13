import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
import {
    BtnSection,
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
} from "../../components";
import { useDireccionStore, useSoporteStore, useUiSoporte } from "../../hooks";
import Swal from "sweetalert2";

export const SoportesPage = () => {
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { message, errores, clearSoportes } = useSoporteStore();
    const { modalActionAddSolicitud, modalActionCreateSoporte } = useUiSoporte();

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
                {/* <BtnSection>Agregar soporte</BtnSection> */}
                <BtnAddActions
                    handleOpenModalSolicitud={handleOpenModalSolicitud}
                    handleOpenModalSoporte={handleOpenModalSoporte}
                >
                    Crear nueva
                </BtnAddActions>
            </Group>
            <FilterFormSoportes role={true} />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SoportesTable menu={1} />
                </Card.Section>
            </Card>
            <ModalSolicitudAdminSoporte />
            <ModalCreateSoporte role={true} /> {/* false: tecnico true: gerente */}
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico />
        </Container>
    );
};
