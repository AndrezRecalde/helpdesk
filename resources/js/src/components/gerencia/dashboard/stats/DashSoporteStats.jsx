import { Group, Paper, SimpleGrid } from "@mantine/core";
import { TextSection } from "../../../../components";
import { useDashGerenciaStore } from "../../../../hooks";
import {
    IconDeviceImacOff,
    IconDeviceImacShare,
    IconDeviceImacPause,
    IconBellRinging2,
} from "@tabler/icons-react";
import classes from "../../../../assets/styles/modules/stats/StatsGrid.module.css";

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
        { title: "Nuevos", icon: "user", value: soportesActuales },
        { title: "No Asignados", icon: "coin", value: soportesNoAsignados },
        { title: "Pendientes", icon: "receipt", value: soportesPendientes },
        { title: "Cerrados", icon: "discount", value: soportesCerrados },
    ];

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];

        return (
            <Paper withBorder p="md" radius="md" shadow="md" key={stat.title}>
                <Group justify="space-between">
                    <TextSection fw={700} color="dimmed">
                        {stat.title}
                    </TextSection>
                    <Icon className={classes.icon} size="1.8rem" stroke={1.5} />
                </Group>
                <Group align="flex-end" gap="xs" mt={10}>
                    <TextSection fz={26} fw={700}>{stat.value}</TextSection>
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
