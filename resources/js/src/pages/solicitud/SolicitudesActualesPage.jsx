import { Card, Container, Group } from "@mantine/core";
import {
    ModalAnularSoporte,
    ModalAsignarSoporte,
    ModalDiagnostico,
    SolicitudesTable,
    TextSection,
    TitlePage,
} from "../../components";
import { useSoporteStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const SolicitudesActualesPage = () => {
    const {
        startLoadSoportesActuales,
        soportes,
        clearSoportes,
        message,
        errores,
    } = useSoporteStore();

    const fecha_actual = new Date();

    useEffect(() => {
        startLoadSoportesActuales();

        return () => {
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
                Solicitudes Actuales
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes {soportes.length} solicitudes
                </TextSection>
                <TextSection fw={700} tt="" fz={16}>
                    {fecha_actual.toLocaleDateString()}
                </TextSection>
            </Group>
            {/*  {soportes.length !== 0 ? ( */}
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SolicitudesTable menu={1} />
                </Card.Section>
            </Card>
            {/* ) : null} */}
            <ModalAsignarSoporte />
            <ModalAnularSoporte />
            <ModalDiagnostico />
        </Container>
    );
};
