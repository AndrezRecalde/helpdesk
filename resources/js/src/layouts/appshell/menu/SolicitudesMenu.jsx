import { Button, HoverCard, SimpleGrid } from "@mantine/core";
import { IconLicense } from "@tabler/icons-react";
import { MenuQuick } from "./MenuLinks";

export const SolicitudesMenu = ({ menuData, classes, theme }) => {
    return (
        <HoverCard
            width={400}
            position="bottom"
            radius="md"
            shadow="md"
            withinPortal
        >
            <HoverCard.Target>
                <Button
                    variant="light"
                    color="teal.7"
                    rightSection={<IconLicense size={18} />}
                >
                    Solicitudes
                </Button>
            </HoverCard.Target>

            <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <SimpleGrid cols={2} spacing={0}>
                    <MenuQuick
                        menuData={menuData}
                        classes={classes}
                        theme={theme}
                    />
                </SimpleGrid>
            </HoverCard.Dropdown>
        </HoverCard>
    );
};
