import { useEffect } from "react";
import { Card, Container, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormUsers,
    ModalActivateUser,
    ModalResetPwdUser,
    ModalUser,
    TitlePage,
    UsersTable,
} from "../../components";
import { useTitlePage, useUiUser, useUsersStore } from "../../hooks";
import Swal from "sweetalert2";
import { IconPencilPlus } from "@tabler/icons-react";

export const AdminUsersPage = () => {
    useTitlePage("Helpdesk | Usuarios");
    const { users, errores, message } = useUsersStore();
    const { modalActionUser } = useUiUser();

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
                title: "Opps...",
                text: errores,
                confirmButtonColor: '#094293',
                footer: 'Intenta con otros filtros de búsqueda'
            });
            return;
        }
    }, [errores]);

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
                <BtnSection handleAction={handleOpenModal} IconSection={IconPencilPlus}>
                    Agregar usuario
                </BtnSection>
            </Group>
            <FilterFormUsers />
            {users.length !== 0 ? (
                <Card withBorder shadow="sm" radius="md" mt={20} mb={20}>
                    <Card.Section>
                        <UsersTable />
                    </Card.Section>
                </Card>
            ) : null}
            <ModalUser title="Agregar usuario" />
            <ModalActivateUser />
            <ModalResetPwdUser />
        </Container>
    );
};
