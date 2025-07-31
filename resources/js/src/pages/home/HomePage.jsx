import {
    Badge,
    Card,
    Container,
    Divider,
    Group,
    SimpleGrid,
    useMantineTheme,
} from "@mantine/core";
import { useTitlePage } from "../../hooks";
import { TextSection, TitlePage } from "../../components";
import { MenuItems } from "../../layouts";
import { menuHome } from "../../layouts/appshell/menu/data/menuRoutes";
import { capitalizarCadaPalabra } from "../../helpers/fnHelpers";
import classes from "../../assets/styles/modules/menu/MenuGrid.module.css";

function HomePage() {
    useTitlePage("Helpdesk | Inicio");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const theme = useMantineTheme();

    return (
        <Container mt={20} size="md">
            <Group justify="space-between">
                <TitlePage order={3} fw={800}>
                    Bienvenido, { capitalizarCadaPalabra(usuario.usu_alias) || "Usuario"}
                </TitlePage>
            </Group>
            <Divider my="sm" />
            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <TextSection tt="" fw={700} fz={18} color="dimmed">
                        Servicios Rápidos
                    </TextSection>
                    <Badge
                        variant="light"
                        color="teal.8"
                        size="lg"
                        radius="md"
                    >
                        {usuario.lgin || "Sin Datos"}
                    </Badge>
                </Group>
                <Divider my="sm" />
                <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2 }} mt="md">
                    <MenuItems menuHome={menuHome} classes={classes} theme={theme} />
                </SimpleGrid>
            </Card>
        </Container>
    );
}

export default HomePage;
