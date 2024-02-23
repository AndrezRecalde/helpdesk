import { Text } from "@mantine/core";

export const TextSection = ({
    color = "dimmed",
    tt = "uppercase",
    fw,
    fz = 14,
    ta = "left",
    children,
    fs = ""
}) => {
    return (
        <Text c={color} fz={fz} tt={tt} ta={ta} fw={fw} fs={fs}>
            {children}
        </Text>
    );
};
