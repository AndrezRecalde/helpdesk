import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import React from "react";

export const NightModeSwitch = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Switch
            label="Modo Nocturno"
            size="sm"
            p="md"
            color="dark.4"
            onChange={() => toggleColorScheme()}
            onLabel={
                <IconSun
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-yellow-4)"
                />
            }
            offLabel={
                <IconMoonStars
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-blue-6)"
                />
            }
        />
    );
};
