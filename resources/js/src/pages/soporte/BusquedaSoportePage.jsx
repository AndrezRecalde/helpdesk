import { Card, Container } from "@mantine/core";
import { FilterFormSearchSoli, SolicitudesTable, TitlePage } from "../../components";

export const BusquedaSoportePage = () => {
    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Busqueda de Soportes
            </TitlePage>
            <FilterFormSearchSoli />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <SolicitudesTable menu={2} />
                </Card.Section>
            </Card>
        </Container>
    );
};
