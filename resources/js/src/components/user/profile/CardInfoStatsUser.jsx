import { Group, Paper, SimpleGrid, Skeleton } from "@mantine/core";
import { TextSection } from "../../../components";
import {
    usePermisoStore,
} from "../../../hooks";
import {
    IconLicense,
    IconClockHour2,
    IconDeviceImacStar,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/user/StatsGrid.module.css";


export const CardInfoStatsUser = ({ year}) => {
    const { isLoading, activateStatsUsuarioPermiso } = usePermisoStore();

    //Convertir Horas a Minutos
    /* function timeToMinutes(time) {
        if (!time) return 0; // Asegurar un valor predeterminado en caso de que `time` sea nulo o indefinido
        const parts = time.split(":"); // Separar por ':'
        const hours = parseInt(parts[0], 10); // Obtener horas
        const minutes = parseInt(parts[1], 10); // Obtener minutos
        // Convertir horas a minutos y sumar minutos
        return hours * 60 + minutes;
    } */

    //Convertir Horas a dias
    /* function timeToDays(time) {
        if (!time) return 0; // Asegurar un valor predeterminado en caso de que `time` sea nulo o indefinido
        const [hours, minutes, seconds] = time.split(":").map(Number); // Separar y convertir cada parte a número
        const totalHours = hours + minutes / 60 + seconds / 3600; // Convertir todo a horas
        const days = totalHours / 24; // Dividir horas entre 24 para obtener los días
        return parseFloat(days.toFixed(2));
    } */

    const icons = {
        total_permisos: IconLicense,
        tiempo_permiso: IconClockHour2,
        total_soportes: IconDeviceImacStar,
    };

    const data = [
        {
            title: "Total Permisos",
            icon: "total_permisos",
            value: activateStatsUsuarioPermiso?.total_permisos || 0,
            descripcion: `Visualización de permisos por el año ${year}`,
        },
        {
            title: "Minutos en Permisos",
            icon: "tiempo_permiso",
            value: activateStatsUsuarioPermiso?.tiempo_minutos || 0, //timeToMinutes(activateStatsUsuarioPermiso?.tiempo_estimado),
            descripcion: "Tiempo en minutos del total en permisos",
        },
        {
            title: "Tiempo Total",
            icon: "tiempo_permiso",
            value: activateStatsUsuarioPermiso?.tiempo_estimado || "00:00:00",
            descripcion: "Tiempo en horas del total en permisos",
        },
        {
            title: "Total en Días",
            icon: "tiempo_permiso",
            value: activateStatsUsuarioPermiso?.dias_equivalentes || 0,
            descripcion: "Tiempo en días del total en permisos",
        },
    ];

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];

        return (
            <Paper withBorder p="sm" radius="md" key={stat.title}>
                <Skeleton height={5} width="100%" radius="xl" visible={isLoading} />
                <Group justify="space-between">
                    <TextSection color="dimmed" fw={700}>
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
            <SimpleGrid cols={{ base: 1, xs: 1, md: 4 }}>{stats}</SimpleGrid>
        </div>
    );
};
