import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
    IconDeviceImacOff,
    IconDeviceImacShare,
    IconDeviceImacPause,
    IconBellRinging2,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/stats/StatsGrid.module.css";
import { useDashGerenciaStore } from "../../../hooks";



export const DashSoporteStats = () => {
    const {
        soportesActuales,
        soportesNoAsignados,
        soportesPendientes,
        soportesCerrados,
    } = useDashGerenciaStore();

    const icons = {
        user: IconBellRinging2,
        discount: IconDeviceImacOff,
        receipt: IconDeviceImacPause,
        coin: IconDeviceImacShare,
    };

    const data = [
        { title: "Soportes Nuevos", icon: "user", value: soportesActuales },
        { title: "Soportes No Asignados", icon: "coin", value: soportesNoAsignados },
        { title: "Soportes Pendientes", icon: "receipt", value: soportesPendientes },
        { title: "Soportes Cerrados", icon: "discount", value: soportesCerrados },
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
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
        </div>
    );
};
