import { ActionIcon, Divider, Group, Stack } from "@mantine/core";
import { IconGiftFilled, IconX } from "@tabler/icons-react";
import { useUsersStore } from "../../../hooks";
import { AlertSection, TextSection } from "../../../components";

export const StackAside = ({ btnToggle }) => {
    const { birthdays } = useUsersStore();
    return (
        <Stack>
            <Group justify="space-between">
                <TextSection fz={12} fw={700}>
                    Notificaciones
                </TextSection>
                <ActionIcon
                    variant="default"
                    size="sm"
                    aria-label="Notificaciones"
                    onClick={btnToggle}
                >
                    <IconX
                        style={{ width: "60%", height: "60%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Group>
            <Divider />
            {birthdays.map((birthday, index) => (
                <AlertSection
                    key={index}
                    variant="light"
                    color="rgba(18, 184, 24, 1)"
                    title="Cumpleaños  🎉"
                    icon={IconGiftFilled}
                    mt={1}
                    mb={1}
                >
                    <strong>{birthday.nmbre_usrio.toUpperCase()}</strong> Que
                    tengas un día increíble lleno de éxito y alegría.{" "}
                    <strong>¡Te deseamos lo mejor!</strong> 🎂🥳
                </AlertSection>
            ))}
        </Stack>
    );
};
