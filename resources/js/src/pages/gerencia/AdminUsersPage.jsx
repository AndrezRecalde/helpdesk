import { Card, Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormUsers,
    ModalUser,
    TitlePage,
    UsersTable,
} from "../../components";
import { useUiUser } from "../../hooks";

export const AdminUsersPage = () => {
    const { modalActionUser } = useUiUser();

    const handleOpenModal = (e) => {
        e.preventDefault();
        modalActionUser(1);
    };

    return (
        <Container size="xl">
            <TitlePage order={2} size="h2">
                Administrar usuarios
            </TitlePage>
            <Group justify="flex-end">
                <BtnSection handleAction={handleOpenModal}>
                    Agregar usuario
                </BtnSection>
            </Group>
            <FilterFormUsers />
            <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                <Card.Section>
                    <UsersTable />
                </Card.Section>
            </Card>
            <ModalUser title="Agregar usuario" />
        </Container>
    );
};
