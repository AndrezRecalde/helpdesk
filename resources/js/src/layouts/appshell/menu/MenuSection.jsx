import {
    UnstyledButton,
    Center,
    Box,
    Collapse,
    Text,
    Group,
    ThemeIcon,
    Divider,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { MenuQuick } from "./MenuLinks";
import { Link } from "react-router-dom";

export const MenuSection = ({ title, menuData, isOpen, toggle, classes, theme, toggleDrawer }) => (
    <>
        <UnstyledButton className={classes.link} onClick={toggle}>
            <Center inline>
                <Box component="span" mr={5}>
                    {title}
                </Box>
                <IconChevronDown size={16} color={theme.colors.teal[6]} />
            </Center>
        </UnstyledButton>
        <Collapse in={isOpen}>
            {Object.entries(menuData).map(([category, items]) => (
                <div key={category} style={{ paddingLeft: 10 }}>
                    <Text fw={700} size="sm" c="dimmed">
                        {category}
                    </Text>
                    {items.map((item) => (
                        <Link
                            key={item.title}
                            to={item.link}
                            className={classes.subLink}
                            onClick={() => toggleDrawer(false)}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Group wrap="nowrap" align="center">
                                <ThemeIcon
                                    size={35}
                                    variant="default"
                                    radius="md"
                                >
                                    <item.icon size={18} color={theme.colors.teal[6]} />
                                </ThemeIcon>
                                <Text size="sm">{item.title}</Text>
                            </Group>
                        </Link>
                    ))}
                    <Divider my="sm" />
                </div>
            ))}
        </Collapse>
        <Divider my="sm" />
    </>
);

export const MenuRapidoSection = ({ title, menuData, isOpen, toggle, classes, theme, toggleDrawer  }) => (
    <>
        <UnstyledButton className={classes.link} onClick={toggle}>
            <Center inline>
                <Box component="span" mr={5}>
                    {title}
                </Box>
                <IconChevronDown size={16} color={theme.colors.teal[6]} />
            </Center>
        </UnstyledButton>
        <Collapse in={isOpen}>
            <MenuQuick menuData={menuData} classes={classes} theme={theme} toggleDrawer={toggleDrawer} />
        </Collapse>
    </>
);
