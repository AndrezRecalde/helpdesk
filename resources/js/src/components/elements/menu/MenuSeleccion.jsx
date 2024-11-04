import {
    Card,
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
    { title: "Agregar actividades", icon: IconPencilPlus, color: "violet", link: "/gad/d/agregar-actividad" },
    { title: "Solicitar Soporte",   icon: IconDeviceImac, color: "teal", link: "/gad/d/solicitud" },
    { title: "Solicitar Permiso",   icon: IconLicense, color: "blue", link: "/gad/d/permiso" },
    { title: "Revisar Marcaciones",   icon: IconFingerprintScan, color: "indigo", link: "/u/ver-marcaciones" },
];

export const MenuSeleccion = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item} onClick={() => navigate(item.link)}>
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <TextSection tt="" fz={12} mt={7}>
                {item.title}
            </TextSection>
        </UnstyledButton>
    ));

    return (
        <Card radius="md" className={classes.card}>
            <TextSection tt="" fz={16} fw={700}>Servicios</TextSection>
            <SimpleGrid cols={2} mt="md">
                {items}
            </SimpleGrid>
        </Card>
    );
};
