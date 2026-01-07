import { Card, Divider, Group, SimpleGrid } from "@mantine/core";
import { TextSection } from "../../elements/titles/TextSection";
import { MenuItems } from "../../../layouts";

export const ServiceSection = ({ title, menu, classes }) => {
    const gridProps = {
        cols: { base: 1, sm: 2, md: 5, lg: 5 },
        spacing: { base: "md", sm: "lg" },
        mt: "md",
    };

    return (
        <Card withBorder radius="md" className={classes.card} mb={20}>
            <Group justify="space-between">
                <TextSection tt="" fw={700} fz={18} c="dimmed">
                    {title}
                </TextSection>
            </Group>
            <Divider my="sm" />
            <SimpleGrid {...gridProps}>
                <MenuItems menuHome={menu} classes={classes} />
            </SimpleGrid>
        </Card>
    );
};
