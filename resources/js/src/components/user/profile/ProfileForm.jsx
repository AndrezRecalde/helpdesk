import { Grid, Skeleton } from "@mantine/core";
import { useAuthStore } from "../../../hooks";
import { TextSection } from "../../../components";

export const ProfileForm = () => {
    const { isLoading, profile } = useAuthStore();
    const arr = [1, 2, 3, 4];
    return (
        <>
            {isLoading ? (
                arr.map((e) => (
                    <Skeleton key={e} height={15} mt={20} radius="xl" />
                ))
            ) : (
                <Grid>
                    <Grid.Col span={{ base: 12 }}>
                        <TextSection tt="" fw={700}>
                            {profile?.empresa}
                        </TextSection>
                        <TextSection tt="uppercase" fz={12} fw={600} color="dimmed">
                            Institución
                        </TextSection>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                        <TextSection tt="" fw={700}>
                            {profile?.direccion}
                        </TextSection>
                        <TextSection tt="uppercase" fz={12} fw={600} color="dimmed">
                            Dirección/Gestión
                        </TextSection>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <TextSection tt="" fw={700}>
                            {profile?.nmbre_usrio}
                        </TextSection>
                        <TextSection tt="uppercase" fz={12} fw={600} color="dimmed">
                            Apellidos y Nombres
                        </TextSection>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <TextSection tt="" fw={700}>
                            {profile?.cargo}
                        </TextSection>
                        <TextSection tt="uppercase" fz={12} fw={600} color="dimmed">
                            Cargo
                        </TextSection>
                    </Grid.Col>
                </Grid>
            )}
        </>
    );
};
