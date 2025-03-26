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
    Group,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import classes from "../../assets/styles/modules/menu/MenuGrid.module.css";
import { TextSection } from "../../components";

const mockdata = [
    { title: "Ver mi perfil", icon: IconUserScan, color: "orange" },
    { title: "Cambiar contrasena", icon: IconSettings, color: "orange" },
    { title: "Solicitar Soporte", icon: IconDeviceImacBolt, color: "cyan" },
    { title: "Mis Soportes Solicitados", icon: IconList, color: "cyan" },
    { title: "Solicitar Permiso", icon: IconLicense, color: "red" },
    { title: "Ver mis permisos", icon: IconEyeCheck, color: "red" },
    { title: "Agregar actividad", icon: IconEditCircle, color: "teal" },
    { title: "Listar actividades", icon: IconListCheck, color: "teal" },
    /* { title: "Cashback", icon: IconCashBanknote, color: "orange" }, */
];

function HomePage() {
    const theme = useMantineTheme();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item}>
            <ThemeIcon size={40} variant="light" radius="sm" color={theme.colors[item.color][5]}>
                <item.icon
                    color={theme.colors[item.color][5]}
                    size={30}
                    stroke={1.7}
                />
            </ThemeIcon>
            <TextSection tt="" fw={700} fz={14} mt={7}>
                {item.title}
            </TextSection>
        </UnstyledButton>
    ));

    return (
        <Container mt={20} size="sm">
            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <TextSection tt="" fw={700} fz={22}>
                        Servicios Rapidos
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
                <SimpleGrid cols={2} mt="md">
                    {items}
                </SimpleGrid>
            </Card>
        </Container>
    );
}

export default HomePage;
