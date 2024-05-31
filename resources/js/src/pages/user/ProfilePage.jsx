import { useEffect } from "react";
import { Container } from "@mantine/core";
import { TitlePage, CardProfile } from "../../components";
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
    const navigate = useNavigate();
    const { startProfile, clearProfile } = useAuthStore();
    const { startLoadInfoUsersSoporte, clearInfoSoportes } = useUsersStore();
    const { startLoadInfoTecnicosSoporte, clearInfoSoportesTecnico } = useTecnicoStore();

    useEffect(() => {
        startProfile();
        return () => {
            clearProfile();
        };
    }, []);

    useEffect(() => {
        if (usuario?.role === Roles.TECNICO || usuario?.role === Roles.GERENTE) {
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
        <Container size="sm">
            <TitlePage order={1} size="h1">
                Perfil
            </TitlePage>
            <CardProfile usuario={usuario} handleAction={handleAction} />
        </Container>
    );
};
