import { useEffect } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import {
    TitlePage,
    CardProfile,
    CardInfoStatsUser,
    TableMarcacionRelojOnline,
} from "../../components";
import {
    useAuthStore,
    useMarcacionStore,
    usePermisoStore,
    useTecnicoStore,
    useTitlePage,
    useUsersStore,
} from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../helpers/dictionary";

const ProfilePage = () => {
    useTitlePage("Helpdesk | Perfil");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const token = JSON.stringify(localStorage.getItem("auth_token"));

    const navigate = useNavigate();
    const { startProfile, clearProfile } = useAuthStore();
    const { startLoadInfoUsersSoporte, clearInfoSoportes } = useUsersStore();
    const { startLoadInfoTecnicosSoporte, clearInfoSoportesTecnico } =
        useTecnicoStore();
    const { startLoadInfoPermisos, setActivatePermiso } = usePermisoStore();
    const { startLoadMarcacionesBiometricos, marcaciones, clearMarcaciones } =
        useMarcacionStore();

    useEffect(() => {
        if (token) {
            startProfile();
        }
        return () => {
            clearProfile();
        };
    }, []);

    useEffect(() => {
        if (
            usuario?.role === Roles.TIC_TECNICO ||
            usuario?.role === Roles.TIC_GERENTE
        ) {
            startLoadInfoTecnicosSoporte(usuario.cdgo_usrio);
            return;
        }
        startLoadInfoUsersSoporte(usuario.cdgo_usrio);
        return () => {
            clearInfoSoportes();
            clearInfoSoportesTecnico();
        };
    }, []);

    useEffect(() => {
        startLoadInfoPermisos(usuario.cdgo_usrio);
        startLoadMarcacionesBiometricos(usuario.asi_id_reloj);

        return () => {
            setActivatePermiso(null);
            clearMarcaciones();
        };
    }, []);

    const handleAction = () => {
        navigate("/helpdesk/soportes");
    };

    return (
        <Container size="xl">
            <TitlePage order={1}>Perfil</TitlePage>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb={20}>
                <CardProfile usuario={usuario} handleAction={handleAction} />
                <CardInfoStatsUser usuario={usuario} />
            </SimpleGrid>
            <TableMarcacionRelojOnline usuario={usuario} />
        </Container>
    );
};

export default ProfilePage;
