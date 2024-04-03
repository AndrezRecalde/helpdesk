import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import {
    IconPencilPlus,
    IconDeviceImac,
    IconLicense,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/menu/MenuGrid.module.css";
import { useNavigate } from "react-router-dom";

const mockdata = [
    { title: "Agregar actividades", icon: IconPencilPlus, color: "violet", link: "/gad/d/agregar-actividad" },
    { title: "Solicitar Soporte",   icon: IconDeviceImac, color: "teal", link: "/gad/d/solicitud" },
    { title: "Solicitar Permiso",   icon: IconLicense, color: "blue", link: "/gad/d/permiso" },
];

export const MenuSeleccion = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item} onClick={() => navigate(item.link)}>
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));

    return (
        <Card radius="md" className={classes.card}>
            <Text className={classes.title}>Servicios</Text>
            <SimpleGrid cols={3} mt="md">
                {items}
            </SimpleGrid>
        </Card>
    );
};
