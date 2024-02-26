import { Card, Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormUsers,
    TitlePage,
    UsersTable,
} from "../../components";

export const AdminUsersPage = () => {
    return (
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Administrar usuarios
            </TitlePage>
            <Group justify="flex-end">
                <BtnSection>Agregar usuario</BtnSection>
            </Group>
            <FilterFormUsers />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <UsersTable />
                </Card.Section>
            </Card>
        </Container>
    );
};
