import {
    Group,
    Menu,
    Stack,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import { Link } from "react-router-dom";

export const MenuList = ({ usuario, menuData, theme }) => {
    return Object.entries(menuData).map(([category, items]) => {
        // Filtramos los items permitidos según el role del usuario
        const allowedItems = items.filter((item) =>
            item.roles.includes(usuario.role)
        );

        // Si no hay items permitidos, no renderizamos nada para esta categoría
        if (allowedItems.length === 0) return null;

        return (
            <div key={category}>
                <Menu.Label>{category}</Menu.Label>
                {allowedItems.map((item) => (
                    <Menu.Item
                        key={item.title}
                        leftSection={
                            <item.icon size={18} color={theme.colors.teal[8]} />
                        }
                        component={Link}
                        to={item.link}
                    >
                        {item.title}
                    </Menu.Item>
                ))}
                <Menu.Divider />
            </div>
        );
    });
};

/* Links de Mega Menu */
export const MenuQuick = ({ menuData, classes, theme }) => {
    return menuData.map((item) => (
        <Link
            to={item.link}
            key={item.title}
            className={classes.subLink}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={35} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.dark[8]} />
                </ThemeIcon>
                <Text size="sm" fw={500}>
                    {item.title}
                </Text>
            </Group>
        </Link>
    ));
};

export const MenuItems = ({ menuHome, classes, toggleDrawer = null }) => {
    const handleCloseDrawer = () => {
        if (toggleDrawer) toggleDrawer(false);
    };

    return menuHome.map((item) => (
        <UnstyledButton
            key={item.title}
            component={Link}
            to={item.link}
            className={classes.menuCard}
            onClick={handleCloseDrawer}
        >
            <Stack
                align="center"
                justify="center"
                gap="sm"
                className={classes.menuCardInner}
                h="100%"
            >
                <ThemeIcon
                    size={60}
                    radius="xl"
                    variant="light"
                    color={item.color || "blue"}
                    className={classes.menuIcon}
                >
                    <item.icon size={35} stroke={1.7} />
                </ThemeIcon>

                <Text
                    className={classes.menuTitle}
                    size="md"
                    fw={700}
                    ta="center"
                >
                    {item.title}
                </Text>

                {item.description && (
                    <Text
                        className={classes.menuDescription}
                        size="sm"
                        c="dimmed"
                        ta="center"
                    >
                        {item.description}
                    </Text>
                )}
            </Stack>
        </UnstyledButton>
    ));
};
