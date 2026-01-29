import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import { AppLogosModal, AppLogosTable, TitlePage } from "../../components";
import { useAppStore, useTitlePage } from "../../hooks";
import Swal from "sweetalert2";

const AppLogosPage = () => {
    useTitlePage("Gestionar Aplicativo - Helpdesk");
    const {
        startLoadImagenes,
        imagenes,
        startClearImagenes,
        message,
        errores,
    } = useAppStore();

    useEffect(() => {
        if (imagenes !== null || imagenes.length === 0) {
            startLoadImagenes();
        }

        return () => {
            startClearImagenes();
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
                confirmButtonColor: "#094293",
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xl">
            <Group justify="space-between" mb={20}>
                <TitlePage order={2}>
                    Gestión de Imágenes del Aplicativo
                </TitlePage>
            </Group>
            <Divider my="sm" />
            <AppLogosTable />

            <AppLogosModal />
        </Container>
    );
};

export default AppLogosPage;
