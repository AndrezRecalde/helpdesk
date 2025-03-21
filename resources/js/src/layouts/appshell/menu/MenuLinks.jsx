import { Group, Menu, Text, ThemeIcon } from "@mantine/core";
import { Link } from "react-router-dom";

export const MenuList = ({ usuario, menuData, theme }) => {
    return Object.entries(menuData).map(([category, items]) => (
        <div key={category}>
            <Menu.Label>{category}</Menu.Label>
            {items.map((item) => {
                const isAllowed = item.roles.includes(usuario.role);
                return (
                    <Menu.Item
                        key={item.title}
                        leftSection={
                            <item.icon size={18} color={theme.colors.teal[7]} />
                        }
                        disabled={!isAllowed}
                        component={isAllowed ? Link : "div"}
                        to={isAllowed ? item.link : "#"}
                    >
                        {item.title}
                    </Menu.Item>
                );
            })}
            <Menu.Divider />
        </div>
    ));
};

/* Links de Mega Menu */
export const MenuQuick = ({ menuData, classes, theme, toggleDrawer }) => {
    return menuData.map((item) => (
        <Link
            to={item.link}
            key={item.title}
            className={classes.subLink}
            onClick={() => toggleDrawer(false)}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={35} variant="light" radius="md">
                    <item.icon size={22} color={theme.colors.teal[7]} />
                </ThemeIcon>
                <Text size="sm" fw={500}>
                    {item.title}
                </Text>
            </Group>
        </Link>
    ));
};
