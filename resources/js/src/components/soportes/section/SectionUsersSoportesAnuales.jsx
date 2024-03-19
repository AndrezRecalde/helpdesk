import { useEffect } from "react";
import { Card, Container } from "@mantine/core";
import { AlertSection, SoportesUsersTable, TitlePage } from "../../../components";
import { useSoporteStore } from "../../../hooks";
import { IconInfoCircle } from "@tabler/icons-react";

export const SectionUsersSoportesAnuales = ({ tabValue }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadSoportesAnualesUsuarios, clearSoportes } = useSoporteStore();

    useEffect(() => {
        if (tabValue === "anuales") {
            startLoadSoportesAnualesUsuarios(usuario.cdgo_usrio);
            return;
        }

      return () => {
        clearSoportes();
      }
    }, [tabValue]);
    return (
        <Container size="xl" my={20}>
            <TitlePage order={2} size="h2">
                Todas Mis Solicitudes
            </TitlePage>
            <AlertSection
                variant="light"
                color="teal"
                radius="md"
                title=""
                icon={IconInfoCircle}
            >
                Se visualizan el seguimiento de los soportes de todo el año actual
            </AlertSection>
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SoportesUsersTable />
                </Card.Section>
            </Card>
        </Container>
    );
};
