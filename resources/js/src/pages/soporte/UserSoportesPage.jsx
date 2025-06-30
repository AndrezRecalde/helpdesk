import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    AlertSection,
    BtnSection,
    ModalAnularSoporte,
    SoportesUsersTable,
    TitlePage,
} from "../../components";
import { useSoporteStore } from "../../hooks";
import { IconChevronsRight, IconInfoCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UsersSoportesPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        isLoading,
        startLoadSoportesAnualesUsuarios,
        clearSoportes,
        message,
        errores,
    } = useSoporteStore();
    const navigate = useNavigate();

    const handleAction = () => {
        navigate("/intranet/solicitud-soporte");
    };

    useEffect(() => {
        startLoadSoportesAnualesUsuarios(usuario.cdgo_usrio);

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
                confirmButtonColor: "#094293",
                footer: "Intentalo más tarde",
            });
            return;
        }
    }, [errores]);

    return (
        <Container size="xl" my={20}>
            <Group justify="space-between">
                <TitlePage order={2}>Todas Mis Solicitudes</TitlePage>

                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleAction}
                >
                    Solicitar Soporte
                </BtnSection>
            </Group>
            <Divider my="sm" />
            <AlertSection
                variant="light"
                color="teal"
                radius="md"
                title=""
                icon={IconInfoCircle}
            >
                Se visualizan el seguimiento de los soportes de todo el año
                actual
            </AlertSection>
            <SoportesUsersTable isLoading={isLoading} />

            <ModalAnularSoporte />
        </Container>
    );
};

export default UsersSoportesPage;
