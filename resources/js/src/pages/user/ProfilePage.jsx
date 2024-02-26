import { useEffect } from "react";
import { Badge, Card, Container, Group, Skeleton, Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import {
    TextSection,
    TitlePage,
    ProfileForm,
    BtnSubmit,
} from "../../components";
import { IconSend } from "@tabler/icons-react";
import { useAuthStore } from "../../hooks";

const stats = [
    { value: "34K", label: "Total Soportes" },
    { value: "187", label: "Pendientes" },
    { value: "1.6K", label: "Cerrados" },
];

export const ProfilePage = () => {
    useDocumentTitle("Profile");
    const { isLoading, startProfile, profile, clearProfile } = useAuthStore();

    const year = new Date();

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    useEffect(() => {
        startProfile();

        return () => {
            clearProfile();
        };
    }, []);

    return (
        <Container size="sm">
            <TitlePage order={2} size="h2">
                Perfil
            </TitlePage>
            <Card withBorder shadow="sm" radius="md" p="lg" mt={20} mb={20}>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <TextSection fw={700} tt="" fz={16}>
                            Bienvenido al Helpdesk
                        </TextSection>
                        {isLoading ? (
                            <Skeleton
                                height={8}
                                mt={6}
                                width="70%"
                                radius="xl"
                            />
                        ) : (
                            <Badge
                                variant="light"
                                color="orange.7"
                                size="lg"
                                radius="sm"
                            >
                                {profile.role}
                            </Badge>
                        )}
                    </Group>
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                    <ProfileForm />
                </Card.Section>
                <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between">
                        <TextSection fw={700} tt="" fz={16}>
                            Soportes
                        </TextSection>
                        <TextSection fw={700} tt="" fz={16}>
                            {year.getFullYear()}
                        </TextSection>
                    </Group>
                    <Group mt="md" justify="center" gap={70}>
                        {items}
                    </Group>

                    <BtnSubmit fontSize={16} IconSection={IconSend}>
                        Agregar soporte
                    </BtnSubmit>
                </Card.Section>
            </Card>
        </Container>
    );
};
