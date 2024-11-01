import { useEffect } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { TitlePage, CardProfile, CardInfoStatsUser, TableMarcacionRelojOnline } from "../../components";
import {
    useAuthStore,
    useTecnicoStore,
    useTitlePage,
    useUsersStore,
} from "../../hooks";
import { Roles, lGerente, lTecnico } from "../../layouts";
import { useNavigate } from "react-router-dom";


export const ProfilePage = () => {
    useTitlePage("Helpdesk | Perfil");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const token = JSON.stringify(localStorage.getItem("auth_token"));

    const navigate = useNavigate();
    const { startProfile, clearProfile } = useAuthStore();
    const { startLoadInfoUsersSoporte, clearInfoSoportes } = useUsersStore();
    const { startLoadInfoTecnicosSoporte, clearInfoSoportesTecnico } =
        useTecnicoStore();

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
            usuario?.role === Roles.TECNICO ||
            usuario?.role === Roles.GERENTE
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

    const handleAction = () => {
        usuario?.role_id === 1
            ? navigate(lGerente[3].links[0].link)
            : navigate(lTecnico[1].links[1].link);
    };

    return (
        <Container size="lg">
            <TitlePage order={1}>Perfil</TitlePage>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <CardProfile usuario={usuario} handleAction={handleAction} />
                <CardInfoStatsUser usuario={usuario} />
            </SimpleGrid>
            <TableMarcacionRelojOnline usuario={usuario} />
        </Container>
    );
};
