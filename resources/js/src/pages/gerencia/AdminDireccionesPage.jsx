import { Card, Container } from "@mantine/core";
import {
    DireccionesTable,
    FilterFormDirecciones,
    ModalDireccion,
    TitlePage,
} from "../../components";
import { useDirectorStore, useTitlePage, useUsersStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const AdminDireccionesPage = () => {
    useTitlePage("Helpdesk | Direcciones");
    const { clearUsers } = useUsersStore();
    const { directores, clearDirectores, message, errores } =
        useDirectorStore();

    useEffect(() => {
        return () => {
            clearDirectores();
            clearUsers();
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
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Administrar Direcciones
            </TitlePage>
            <FilterFormDirecciones />

            {directores.length !== 0 ? (
                <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                    <Card.Section>
                        <DireccionesTable />
                    </Card.Section>
                </Card>
            ) : null}
            <ModalDireccion />
        </Container>
    );
};
