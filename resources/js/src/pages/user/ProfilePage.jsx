import { Card, Avatar, Text, Group, Button, Container, ThemeIcon, rem } from "@mantine/core";
import classes from "../../assets/styles/modules/user/ProfileCard.module.css";
import { IconSwimming } from "@tabler/icons-react";

const stats = [
    { value: "34K", label: "Followers" },
    { value: "187", label: "Follows" },
    { value: "1.6K", label: "Posts" },
];

export const ProfilePage = () => {
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

    return (
        <Container size="sm">
            <Card withBorder padding="xl" radius="md" className={classes.card}>
                <Card.Section
                    h={140}
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
                    }}
                />
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                    size={80}
                    radius={80}
                    mx="auto"
                    mt={-30}
                    className={classes.avatar}
                />
                {/* <ThemeIcon className={classes.avatar} size={80} radius={80} mx="auto" mt={-30}>
                    <IconSwimming
                        style={{ width: rem(32), height: rem(32) }}
                        stroke={1.5}
                    />
                </ThemeIcon> */}
                <Text ta="center" fz="lg" fw={500} mt="sm">
                    Cristhian Recalde
                </Text>
                <Text ta="center" fz="sm" c="dimmed">
                    Sistemas y Aplicaciones
                </Text>
                <Group mt="md" justify="center" gap={30}>
                    {items}
                </Group>
                <Button
                    fullWidth
                    radius="md"
                    mt="xl"
                    size="md"
                    variant="default"
                >
                    Follow
                </Button>
            </Card>
        </Container>
    );
};
