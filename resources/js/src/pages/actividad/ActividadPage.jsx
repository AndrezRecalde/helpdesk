import { useEffect } from "react";
import { Card, Container, Divider, Group } from "@mantine/core";
import {
    ActividadForm,
    AlertSection,
    BtnSection,
    InformationActividadList,
    TitlePage,
} from "../../components";
import { useActividadStore, useTitlePage } from "../../hooks";
import { IconChevronsRight, IconInfoCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ActividadPage = () => {
    useTitlePage("Registrar Actividad - Intranet");
    const navigate = useNavigate();
    const { message, errores } = useActividadStore();

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

    const handleAction = () => {
         navigate("/intranet/lista-actividades");
    }

    return (
        <Container size="md" my="md">
            <Group justify="space-between">
                <TitlePage order={2}>Registrar actividad</TitlePage>
                <BtnSection
                    IconSection={IconChevronsRight}
                    handleAction={handleAction}
                >
                    Ver Actividades
                </BtnSection>
            </Group>
            <Divider my="md" />
            <Card withBorder shadow="sm" radius="md" mt="md">
                <Card.Section withBorder inheritPadding py="xs">
                    <ActividadForm />
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                    <AlertSection
                        variant="light"
                        color="orange.7"
                        title="Al momento de registrar la actividad: "
                        icon={IconInfoCircle}
                    >
                        <InformationActividadList />
                    </AlertSection>
                </Card.Section>
            </Card>
        </Container>
    );
};

export default ActividadPage;
