import { Divider, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import {
    IconUserPlus,
    IconDiscount2,
    IconReceipt2,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
    IconAlarm,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/user/StatsGrid.module.css";
import { TextSection } from "../../elements/titles/TextSection";

const icons = {
    marcacion: IconAlarm,
    coin: IconCoin,
    discount: IconDiscount2,
};

const data = [
    { title: "Total Permisos", icon: "coin", value: "22", descripcion: "Visualización de permisos por el año actual" },
    { title: "Minutos en Permisos", icon: "discount", value: "745", descripcion: "Tiempo en minutos del total en permisos" },
    { title: "Tiempo Total", icon: "discount", value: "745", descripcion: "Tiempo en horas del total en permisos" },
    { title: "Total en Días", icon: "discount", value: "745", descripcion: "Tiempo en días del total en permisos" },
    { title: "Total Soportes Recibidos", icon: "discount", value: "745", descripcion: "Total de soportes recibidos" },

];

export const CardInfoStatsUser = () => {
    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];

        return (
            <Paper withBorder p="sm" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <TextSection  color="dimmed" fw={700}>
                        {stat.title}
                    </TextSection>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>

                <Group align="flex-end" gap="xs" mt={5}>
                    <TextSection fz={20} fw={700}>
                        {stat.value}
                    </TextSection>
                </Group>

                <TextSection tt="" fz="xs" color="dimmed" mt={5}>
                    {stat.descripcion}
                </TextSection>
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <SimpleGrid cols={{ base: 1, xs: 1, md: 1 }}>{stats}</SimpleGrid>
        </div>
    );
};
