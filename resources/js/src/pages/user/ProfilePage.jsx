import { useEffect } from "react";
import { Container } from "@mantine/core";
import { TitlePage, CardProfile } from "../../components";
import { useAuthStore, useTitlePage } from "../../hooks";

const ProfilePage = () => {
    useTitlePage("Helpdesk | Perfil");
    const token = JSON.stringify(localStorage.getItem("auth_token"));

    const { startProfile, clearProfile } = useAuthStore();

    useEffect(() => {
        if (token) {
            startProfile();
        }
        return () => {
            //clearProfile();
        };
    }, []);

    return (
        <Container size="md">
            <TitlePage order={1}>Perfil</TitlePage>
            <CardProfile />
        </Container>
    );
};

export default ProfilePage;
