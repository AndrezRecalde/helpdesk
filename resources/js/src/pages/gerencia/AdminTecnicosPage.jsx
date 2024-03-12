import { Card, Container, Group } from "@mantine/core";
import { BtnSection, TecnicosTable, TextSection, TitlePage } from "../../components";

export const AdminTecnicosPage = () => {
    return (
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Gestión De Técnicos
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes 20 técnicos activos
                </TextSection>
                <BtnSection>Agregar Técnico</BtnSection>
            </Group>
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <TecnicosTable />
                </Card.Section>
            </Card>
        </Container>
    );
};
