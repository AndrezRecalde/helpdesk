import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
    IconUserScan,
    IconBuildingBank,
    IconUserShield,
    IconListDetails,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/stats/StatsGrid.module.css";

const icons = {
    user: IconUserScan,
    discount: IconUserShield,
    receipt: IconListDetails,
    coin: IconBuildingBank,
};

const data = [
    { title: "Total Usuarios", icon: "user", value: "368", diff: 34 },
    { title: "Total Direcciones", icon: "coin", value: "14", diff: -13 },
    { title: "Total Técnicos", icon: "discount", value: "11", diff: 18 },
    { title: "Total Subprocesos -TIC", icon: "receipt", value: "5", diff: -30 },
];

export const DashInfoStats = () => {
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
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 1, lg: 1 }}>{stats}</SimpleGrid>
        </div>
    );
};
