import { useEffect } from "react";
import { Container, Divider } from "@mantine/core";
import {
    TitlePage,
    InvPerifericoTable,
    FilterFormPeriferico,
    InvPerifericoModal,
} from "../../../components";
import {
    useInvEstadoStore,
    useInvPerifericoStore,
    useStorageField,
    useTitlePage,
} from "../../../hooks";
import Swal from "sweetalert2";

const InvComponentesPage = () => {
    useTitlePage("Helpdesk | Inv. Componentes");
    const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();
    const { isExport, message, errores } = useInvPerifericoStore();
    const { setStorageFields } = useStorageField();

    useEffect(() => {
        startLoadInvEstados();

        return () => {
            startClearInvEstados();
            setStorageFields(null);
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
                timer: 2000,
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

    return (
        <Container size="xxl">
            <TitlePage order={2}>Componentes - Periféricos</TitlePage>
            <Divider my="sm" />
            <FilterFormPeriferico />

            <InvPerifericoTable />

            <InvPerifericoModal />
        </Container>
    );
};

export default InvComponentesPage;
