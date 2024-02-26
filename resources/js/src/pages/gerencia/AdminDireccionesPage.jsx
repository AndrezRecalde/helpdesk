import { Card, Container } from "@mantine/core";
import {
    DireccionesTable,
    FilterFormDirecciones,
    TitlePage,
} from "../../components";

export const AdminDireccionesPage = () => {
    return (
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Administrar Direcciones
            </TitlePage>
            <FilterFormDirecciones />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <DireccionesTable />
                </Card.Section>
            </Card>
        </Container>
    );
};
