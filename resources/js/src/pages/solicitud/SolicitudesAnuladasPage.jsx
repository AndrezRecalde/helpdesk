import { Card, Container } from "@mantine/core";
import { SolicitudesTable, TitlePage } from "../../components";

export const SolicitudesAnuladasPage = () => {
    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Solicitudes Anuladas
            </TitlePage>
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SolicitudesTable menu={2} />
                </Card.Section>
            </Card>
        </Container>
    );
};
