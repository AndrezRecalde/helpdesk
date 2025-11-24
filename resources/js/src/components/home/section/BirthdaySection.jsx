import { Paper, Text, Group, Avatar, Stack, Badge, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconCake, IconGift, IconSparkles } from "@tabler/icons-react";
import { useUsersStore } from "../../../hooks";
import "@mantine/carousel/styles.css";

export const BirthdaySection = () => {
    const { birthdays } = useUsersStore();

    const getInitials = (name) => {
        const words = name.split(" ");
        return words.length >= 2
            ? `${words[0][0]}${words[1][0]}`
            : name.substring(0, 2);
    };

    const formatBirthday = (date) => {
        const [year, month, day] = date.split("-");
        const birth = new Date(year, month - 1, day);
        const options = { day: "numeric", month: "short" };
        return birth.toLocaleDateString("es-ES", options);
    };

    const getFirstName = (fullName) => {
        const words = fullName.split(" ");
        return words[2] || words[0];
    };

    const formatName = (name) => {
        return name
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    if (!birthdays || birthdays.length === 0) {
        return null;
    }

    return (
        <Paper
            shadow="none"
            p="md"
            radius="md"
            withBorder

        >
            <Group mb="sm" gap="xs">
                <IconCake
                    size={18}
                    color="var(--mantine-color-cyan-4)"
                    stroke={1.5}
                />
                <Text size="sm" fw={500} c="dimmed">
                    Cumpleaños del día de hoy
                </Text>
                <Badge size="xs" variant="light" color="cyan">
                    {birthdays.length}
                </Badge>
            </Group>

            <Carousel
                height={160}
                slideSize="300px"
                slideGap="md"
                align="start"
                slidesToScroll={1}
                withControls={birthdays.length > 1}
                draggable={birthdays.length > 1}
                loop
            >
                {birthdays.map((employee) => {
                    const firstName = getFirstName(employee.nmbre_usrio);

                    return (
                        <Carousel.Slide key={employee.cdgo_usrio}>
                            <Paper
                                p="sm"
                                radius="md"
                                withBorder
                                h="100%"
                            >
                                <Stack gap="xs" h="100%">
                                    <Group gap="sm" wrap="nowrap">
                                        <Box pos="relative">
                                            <Avatar
                                                color="cyan"
                                                radius="xl"
                                                size="md"
                                                variant="light"
                                            >
                                                {getInitials(
                                                    employee.nmbre_usrio
                                                )}
                                            </Avatar>
                                            <Box
                                                pos="absolute"
                                                top={-4}
                                                right={-4}
                                            >
                                                <IconSparkles
                                                    size={16}
                                                    color="var(--mantine-color-cyan-4)"
                                                />
                                            </Box>
                                        </Box>

                                        <Stack
                                            gap={2}
                                            style={{ flex: 1, minWidth: 0 }}
                                        >
                                            <Text
                                                size="xs"
                                                fw={600}
                                                lineClamp={2}
                                                lh={1.3}
                                                tt="capitalize"
                                            >
                                                {formatName(
                                                    employee.nmbre_usrio
                                                )}
                                            </Text>
                                            <Group gap={6}>
                                                <IconCake
                                                    size={12}
                                                    color="var(--mantine-color-cyan-4)"
                                                    stroke={1.5}
                                                />
                                                <Text size="xs" c="dimmed">
                                                    {formatBirthday(
                                                        employee.usu_fec_nac
                                                    )}
                                                </Text>
                                                <Badge
                                                    size="xs"
                                                    variant="light"
                                                    color="cyan"
                                                    leftSection={
                                                        <IconGift size={10} />
                                                    }
                                                >
                                                    Hoy
                                                </Badge>
                                            </Group>
                                        </Stack>
                                    </Group>

                                    <Paper
                                        p="xs"
                                        radius="sm"
                                        bg="transparent"
                                        style={{
                                            border: "none",
                                            flex: 1,
                                        }}
                                    >
                                        <Text
                                            size="xs"
                                            c="dimmed"
                                            fw={500}
                                            lh={1.4}
                                            fs="italic"
                                        >
                                            {`¡Feliz cumpleaños ${formatName(
                                                firstName
                                            )}! 🎉 La institución te desea un día maravilloso lleno de bendiciones y éxitos.`}
                                        </Text>
                                    </Paper>
                                </Stack>
                            </Paper>
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        </Paper>
    );
};
