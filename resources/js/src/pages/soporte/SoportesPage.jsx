import { Card, Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormSoportes,
    TextSection,
    TitlePage,
    SoportesTable
} from "../../components";

export const SoportesPage = () => {
    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Soportes
            </TitlePage>
            <Group justify="space-between">
                <TextSection fw={700} tt="" fz={16}>
                    Tienes 20 soportes
                </TextSection>
                <BtnSection>Agregar soporte</BtnSection>
            </Group>
            <FilterFormSoportes />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SoportesTable />
                </Card.Section>
            </Card>
        </Container>
    );
};
