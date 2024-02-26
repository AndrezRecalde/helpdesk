import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
    IconDeviceImacOff,
    IconDeviceImacShare,
    IconDeviceImacPause,
    IconBellRinging2,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/stats/StatsGrid.module.css";

const icons = {
    user: IconBellRinging2,
    discount: IconDeviceImacOff,
    receipt: IconDeviceImacPause,
    coin: IconDeviceImacShare,
};

const data = [
    { title: "Soportes Nuevos", icon: "user", value: "13,456", diff: 34 },
    { title: "Soportes Abiertos", icon: "coin", value: "4,145", diff: -13 },
    { title: "Soportes Cerrados", icon: "discount", value: "745", diff: 18 },
    { title: "Soportes Pendientes", icon: "receipt", value: "188", diff: -30 },
];

export const DashSoporteStats = () => {
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
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
        </div>
    );
};
