import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
    IconUserScan,
    IconBuildingBank,
    IconUserShield,
    IconListDetails,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/stats/StatsGrid.module.css";
import { useDashGerenciaStore } from "../../../hooks";

export const DashInfoStats = () => {
    const { totalUsuarios, totalDirecciones, totalTecnicos, totalAreasTic } =
        useDashGerenciaStore();

    const icons = {
        user: IconUserScan,
        discount: IconUserShield,
        receipt: IconListDetails,
        coin: IconBuildingBank,
    };

    const data = [
        { title: "Total Usuarios", icon: "user", value: totalUsuarios },
        { title: "Total Direcciones", icon: "coin", value: totalDirecciones },
        { title: "Total Técnicos", icon: "discount", value: totalTecnicos },
        {
            title: "Total Subprocesos -TIC",
            icon: "receipt",
            value: totalAreasTic,
        },
    ];

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.8rem" stroke={1.5} />
                </Group>
                <Group align="flex-end" gap="xs" mt={10}>
                    <Text className={classes.value}>{stat.value}</Text>
                </Group>
            </Paper>
        );
    });
    return (
        <div className={classes.root}>
            <SimpleGrid cols={{ base: 4, xs: 1, sm: 4, md: 4, lg: 4 }}>
                {stats}
            </SimpleGrid>
        </div>
    );
};
