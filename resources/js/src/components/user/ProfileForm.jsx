import { Grid, Skeleton, Text } from "@mantine/core";
import { useAuthStore } from "../../hooks";

export const ProfileForm = () => {
    const { isLoading, profile } = useAuthStore();
    const arr = [1,2,3,4];
    return (
        <>
            {isLoading ? (
                arr.map((e) => <Skeleton key={e} height={15} mt={20} radius="xl" />)
            ) : (
                <Grid>
                    <Grid.Col span={{ base: 12 }}>
                        <Text fz="md" fw={700}>
                            {profile.empresa}
                        </Text>
                        <Text fz="xs" tt="uppercase" fw={600} c="dimmed">
                            Institución
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                        <Text fz="md" fw={700}>
                            {profile.direccion}
                        </Text>
                        <Text fz="xs" tt="uppercase" fw={600} c="dimmed">
                            Dirección/Gestión
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <Text fz="md" fw={700}>
                            {profile.nmbre_usrio}
                        </Text>
                        <Text fz="xs" tt="uppercase" fw={600} c="dimmed">
                            Apellidos y Nombres
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <Text fz="md" fw={700}>
                            {profile.cargo}
                        </Text>
                        <Text fz="xs" tt="uppercase" fw={600} c="dimmed">
                            Cargo
                        </Text>
                    </Grid.Col>
                </Grid>
            )}
        </>
    );
};
