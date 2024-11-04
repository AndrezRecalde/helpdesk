import { Container, Divider } from "@mantine/core";
import { SoportesCalificacionTable, TitlePage } from "../../components";
import { useSoporteStore, useTitlePage } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const SoporteCalificacionPage = () => {
    useTitlePage("Helpdesk | Calificar Soportes");
    const { startLoadSoportesSinCalificar, clearSoportes, message, errores } =
        useSoporteStore();

    useEffect(() => {
        startLoadSoportesSinCalificar();

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
                title: "Opps..",
                text: errores,
                showConfirmButton: false,
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xxl">
            <TitlePage order={2}>
                Cerrar Soportes - {new Date().getFullYear()}
            </TitlePage>
            <Divider my="md" />
            <SoportesCalificacionTable />
        </Container>
    );
};

export default SoporteCalificacionPage;
