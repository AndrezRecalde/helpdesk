import { Badge, Card, Group, Skeleton } from "@mantine/core";
import { ProfileForm, ServiceSection, TextSection } from "../../../components";
import { useAuthStore } from "../../../hooks";
import { menuHome } from "../../../layouts/appshell/menu/data/menuRoutes";
import classes from "../../../assets/styles/modules/menu/MenuGrid.module.css";

export const CardProfile = () => {
    const { isLoading, profile } = useAuthStore();

    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            p="lg"
            mt={10}
            mb={10}
            sx={{ position: "static", height: "50" }}
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <TextSection fw={700} tt="" fz={16} color="dimmed">
                        Te damos la bienvenida
                    </TextSection>
                    {isLoading ? (
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    ) : (
                        <Badge
                            variant="light"
                            color="orange.8"
                            size="lg"
                            radius="md"
                        >
                            {profile?.role}
                        </Badge>
                    )}
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <ProfileForm />
            </Card.Section>
            <ServiceSection
                title="Servicios Rápidos"
                menu={menuHome}
                classes={classes}
            />
        </Card>
    );
};
