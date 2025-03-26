import {
    IconBuildingBank,
    IconCashBanknote,
    IconCoin,
    IconCreditCard,
    IconDeviceImacBolt,
    IconEditCircle,
    IconEyeCheck,
    IconLicense,
    IconList,
    IconListCheck,
    IconReceipt,
    IconReceiptRefund,
    IconReceiptTax,
    IconRepeat,
    IconReport,
    IconSettings,
    IconUserScan,
    IconUserScreen,
} from "@tabler/icons-react";
import {
    Anchor,
    Badge,
    Card,
    Container,
    Divider,
    Group,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import classes from "../../assets/styles/modules/menu/MenuGrid.module.css";
import { TextSection, TitlePage } from "../../components";
import { Link } from "react-router-dom";

const menuHome = [
    {
        title: "Ver mi perfil",
        icon: IconUserScan,
        color: "indigo",
        link: "/intranet/profile",
    },
    {
        title: "Cambiar contrasena",
        icon: IconSettings,
        color: "indigo",
        link: "/intranet/change-password",
    },
    {
        title: "Solicitar Soporte",
        icon: IconDeviceImacBolt,
        color: "cyan",
        link: "/intranet/solicitud-soporte",
    },
    {
        title: "Mis Soportes Solicitados",
        icon: IconList,
        color: "cyan",
        link: "/intranet/soportes/actuales",
    },
    {
        title: "Solicitar Permiso",
        icon: IconLicense,
        color: "red",
        link: "/intranet/permiso",
    },
    {
        title: "Ver mis permisos",
        icon: IconEyeCheck,
        color: "red",
        link: "/intranet/ver-permisos",
    },
    {
        title: "Agregar actividad",
        icon: IconEditCircle,
        color: "teal",
        link: "/intranet/agregar-actividad",
    },
    {
        title: "Listar actividades",
        icon: IconListCheck,
        color: "teal",
        link: "/intranet/lista-actividades",
    },
    /* { title: "Cashback", icon: IconCashBanknote, color: "orange" }, */
];

function HomePage() {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const theme = useMantineTheme();

    const items = menuHome.map((item) => (
        <Link
            key={item.title}
            to={item.link}
            className={classes.item}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <ThemeIcon
                size={40}
                variant="light"
                radius="sm"
                color={theme.colors[item.color][5]}
            >
                <item.icon
                    color={theme.colors[item.color][5]}
                    size={30}
                    stroke={1.7}
                />
            </ThemeIcon>
            <TextSection tt="" fw={700} fz={14} mt={7}>
                {item.title}
            </TextSection>
        </Link>
    ));

    return (
        <Container mt={20} size="md">
            <Group justify="space-between">
                <TitlePage order={2} fw={800}>
                    Bienvenido, {usuario.usu_alias || "Usuario"}
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
                        color="orange.7"
                        size="lg"
                        radius="md"
                    >
                        TIC_GERENTE
                    </Badge>
                </Group>
                <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2 }} mt="md">
                    {items}
                </SimpleGrid>
            </Card>
        </Container>
    );
}

export default HomePage;
