import { Paper, Group, Avatar, Stack, Badge, Box } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useUsersStore } from "../../../hooks";
import { TextSection } from "../../../components";
import { IconCake, IconGift, IconSparkles } from "@tabler/icons-react";
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
            .replace(/(^|\s)\p{L}/gu, (char) => char.toUpperCase());
    };

    if (!birthdays || birthdays.length === 0) {
        return null;
    }

    return (
        <Paper shadow="none" p="md" radius="md" withBorder>
            <Group mb="sm" gap="xs">
                <IconCake
                    size={20}
                    color="var(--mantine-color-teal-4)"
                    stroke={1.7}
                />
                <TextSection tt="" fz={15} fw={500}>
                    Cumpleaños del día de hoy
                </TextSection>
                <Badge size="md" variant="light" color="teal.7">
                    {birthdays.length}
                </Badge>
            </Group>

            <Carousel
                height={160}
                slideSize="330px"
                slideGap="md"
                align="start"
                slidesToScroll={1}
                withControls={birthdays.length > 3}
                draggable={birthdays.length > 1}
                loop
            >
                {birthdays.map((employee) => {
                    const firstName = getFirstName(employee.nmbre_usrio);

                    return (
                        <Carousel.Slide key={employee.cdgo_usrio}>
                            <Paper p="sm" radius="md" withBorder h="100%">
                                <Stack gap="xs" h="100%">
                                    <Group gap="sm" wrap="nowrap">
                                        <Box pos="relative">
                                            <Avatar
                                                color="teal"
                                                radius="xl"
                                                size="lg"
                                                variant="light"
                                            >
                                                {getInitials(
                                                    employee.nmbre_usrio,
                                                )}
                                            </Avatar>
                                            <Box
                                                pos="absolute"
                                                top={-4}
                                                right={-4}
                                            >
                                                <IconSparkles
                                                    size={16}
                                                    color="var(--mantine-color-teal-4)"
                                                />
                                            </Box>
                                        </Box>

                                        <Stack
                                            gap={2}
                                            style={{ flex: 1, minWidth: 0 }}
                                        >
                                            <TextSection
                                                fz={14}
                                                fw={600}
                                                lineClamp={2}
                                                tt="capitalize"
                                            >
                                                {formatName(
                                                    employee.nmbre_usrio,
                                                )}
                                            </TextSection>
                                            <Group gap={6}>
                                                <IconCake
                                                    size={12}
                                                    color="var(--mantine-color-teal-4)"
                                                    stroke={1.5}
                                                />
                                                <TextSection fz={12} tt="">
                                                    {formatBirthday(
                                                        employee.usu_fec_nac,
                                                    )}
                                                </TextSection>
                                                <Badge
                                                    size="xs"
                                                    variant="light"
                                                    color="teal"
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
                                        <TextSection
                                            fz={12}
                                            fw={500}
                                            fs="italic"
                                            tt=""
                                            ta="center"
                                        >
                                            {`¡Feliz cumpleaños ${formatName(
                                                firstName,
                                            )}! 🎉 La institución te desea un día maravilloso lleno de bendiciones y éxitos.`}
                                        </TextSection>
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
