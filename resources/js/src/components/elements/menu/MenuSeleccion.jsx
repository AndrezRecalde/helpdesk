import {
    Anchor,
    Card,
    Group,
    SimpleGrid,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { TextSection } from "../../../components";
import {
    IconPencilPlus,
    IconDeviceImac,
    IconLicense,
    IconFingerprintScan,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/menu/MenuGrid.module.css";

const mockdata = [
    {
        title: "Solicitar Soporte",
        icon: IconDeviceImac,
        color: "teal",
        link: "/intranet/solicitud-soporte",
    },
    {
        title: "Solicitar Permiso",
        icon: IconLicense,
        color: "blue",
        link: "/intranet/permiso",
    },
    {
        title: "Revisar Marcaciones",
        icon: IconFingerprintScan,
        color: "indigo",
        link: "/intranet/marcaciones-biometricos",
    },
    {
        title: "Agregar actividades",
        icon: IconPencilPlus,
        color: "violet",
        link: "/intranet/agregar-actividad",
    },
];

export const MenuSeleccion = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const items = mockdata.map((item) => (
        <UnstyledButton
            key={item.title}
            className={classes.item}
            onClick={() => navigate(item.link)}
        >
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <TextSection tt="" fz={14} mt={7}>
                {item.title}
            </TextSection>
        </UnstyledButton>
    ));

    return (
        <Card radius="md" className={classes.card}>
            <Group justify="space-between">
                <TextSection tt="" fz={16} fw={700}>
                    Servicios
                </TextSection>
                <Anchor
                    size="xs"
                    c="dimmed"
                    style={{ lineHeight: 1 }}
                    onClick={() => navigate("/intranet/home")}
                >
                    Ir al Inicio
                </Anchor>
            </Group>
            <SimpleGrid cols={2} mt="md">
                {items}
            </SimpleGrid>
        </Card>
    );
};
