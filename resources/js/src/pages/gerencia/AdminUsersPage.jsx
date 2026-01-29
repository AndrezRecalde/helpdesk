import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    BtnSection,
    FilterFormUsers,
    ModalActivateUser,
    ModalResetPwdUser,
    ModalUser,
    TitlePage,
    UsersTable,
    ModalCodigoBiometrico,
} from "../../components";
import {
    useCargoStore,
    useEmpresaStore,
    useSexoStore,
    useTipoContratoStore,
    useTipoUsuarioStore,
    useTitlePage,
    useUiUser,
    useUsersStore,
} from "../../hooks";
import { IconPencilPlus } from "@tabler/icons-react";
import Swal from "sweetalert2";

const AdminUsersPage = () => {
    useTitlePage("Administrar Usuarios - Helpdesk");
    const { errores, message } = useUsersStore();
    const { modalActionUser } = useUiUser();

    const { clearEmpresas } = useEmpresaStore();
    const { clearTipoSexo } = useSexoStore();
    const { clearCargos } = useCargoStore();
    const { clearTiposUsuarios } = useTipoUsuarioStore();
    const { clearTiposContratos } = useTipoContratoStore();
    const { clearUsers } = useUsersStore();

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
                confirmButtonColor: "#094293",
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        return () => {
            clearEmpresas();
            clearTipoSexo();
            //clearDirecciones();
            clearUsers();
            clearCargos();
            clearTiposUsuarios();
            clearTiposContratos();
        };
    }, []);

    const handleOpenModal = (e) => {
        e.preventDefault();
        modalActionUser(true);
    };

    return (
        <Container size="xl">
            <Group justify="space-between">
                <TitlePage order={2}>Administrar usuarios</TitlePage>
                <BtnSection
                    heigh={45}
                    handleAction={handleOpenModal}
                    IconSection={IconPencilPlus}
                >
                    Agregar usuario
                </BtnSection>
            </Group>
            <Divider my="md" />
            <FilterFormUsers />
            <UsersTable />
            <ModalUser />
            <ModalActivateUser />
            <ModalResetPwdUser />
            <ModalCodigoBiometrico />
        </Container>
    );
};

export default AdminUsersPage;
