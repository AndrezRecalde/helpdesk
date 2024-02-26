import { Card, Container, Group } from "@mantine/core";
import { SolicitudesTable, TextSection, TitlePage } from "../../components";

export const SolicitudesActualesPage = () => {
    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Solicitudes Actuales
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes 20 solicitudes
                </TextSection>
                <TextSection fw={700} tt="" fz={16}>
                    24/02/2024
                </TextSection>
            </Group>
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SolicitudesTable menu={1} />
                </Card.Section>
            </Card>
        </Container>
    );
};
