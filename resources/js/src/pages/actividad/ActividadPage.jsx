import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import { ActividadForm, AlertSection, InformationActividadList, TitlePage } from "../../components";
import { useActividadStore, useTitlePage } from "../../hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import Swal from "sweetalert2";


export const ActividadPage = () => {
    useTitlePage("Helpdesk | Actividad");
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

    return (
        <Container size="sm" my="md">
            <TitlePage order={2}>
                Registrar actividad
            </TitlePage>
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
