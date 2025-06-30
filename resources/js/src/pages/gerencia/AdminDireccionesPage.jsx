import { Container, Divider } from "@mantine/core";
import {
    DireccionesTable,
    FilterFormDirecciones,
    ModalDireccion,
    TitlePage,
} from "../../components";
import { useDirectorStore, useTitlePage, useUsersStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const AdminDireccionesPage = () => {
    useTitlePage("Helpdesk | Direcciones");
    const { startLoadUsers, clearUsers } = useUsersStore();
    const { clearDirectores, message, errores } =
        useDirectorStore();

    useEffect(() => {
        startLoadUsers({});

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
                timer: 2500,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xl">
            <TitlePage order={2}>Administrar Direcciones</TitlePage>
            <Divider my="md" />
            <FilterFormDirecciones />

            <DireccionesTable />
            <ModalDireccion />
        </Container>
    );
};

export default AdminDireccionesPage;
