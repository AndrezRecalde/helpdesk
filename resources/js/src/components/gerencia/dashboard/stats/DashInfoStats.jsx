import { Group, Paper, SimpleGrid } from "@mantine/core";
import { TextSection } from "../../../../components";
import { useDashGerenciaStore } from "../../../../hooks";
import {
    IconUserScan,
    IconBuildingBank,
    IconUserShield,
    IconListDetails,
} from "@tabler/icons-react";
import classes from "../../../../assets/styles/modules/stats/StatsGrid.module.css";

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
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 1, lg: 1 }}>
                {stats}
            </SimpleGrid>
        </div>
    );
};
