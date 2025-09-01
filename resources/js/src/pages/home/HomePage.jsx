import { useMemo } from "react";
import {
    Badge,
    Container,
    Divider,
    Group,
} from "@mantine/core";
import { useTitlePage } from "../../hooks";
import { ServiceSection, TitlePage } from "../../components";
import {
    menuHome,
    menuHomeContratados,
} from "../../layouts/appshell/menu/data/menuRoutes";
import { capitalizarCadaPalabra } from "../../helpers/fnHelpers";
import classes from "../../assets/styles/modules/menu/MenuGrid.module.css";

function HomePage() {
    useTitlePage("Helpdesk | Inicio");
    const usuario = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("service_user")) || {};
        } catch {
            return {};
        }
    }, []);

    return (
        <Container mt={20} size="md">
            <Group justify="space-between">
                <TitlePage order={3} fw={800}>
                    Bienvenido,{" "}
                    {capitalizarCadaPalabra(usuario?.usu_alias) || "Usuario"}
                </TitlePage>
                <Badge variant="light" color="teal.8" size="lg" radius="md">
                    {usuario?.lgin || "Sin Datos"} -{" "}
                    {usuario?.cdgo_lrgo || "GADPE"}
                </Badge>
            </Group>

            <Divider my="sm" />
            <ServiceSection
                title="Servicios Rápidos"
                menu={menuHome}
                classes={classes}
            />
            <ServiceSection
                title="Servicios Extras"
                menu={menuHomeContratados}
                classes={classes}
            />
        </Container>
    );
}

export default HomePage;
