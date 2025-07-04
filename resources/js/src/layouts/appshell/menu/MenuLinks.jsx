import { Grid, Group, Menu, Text, ThemeIcon } from "@mantine/core";
import { TextSection } from "../../../components";
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
export const MenuQuick = ({ menuData, classes, theme }) => {
    return menuData.map((item) => (
        <Link
            to={item.link}
            key={item.title}
            className={classes.subLink}
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

export const MenuItems = ({
    menuHome,
    classes,
    theme,
    toggleDrawer = null,
}) => {
    const handleCloseDrawer = () => {
        if (toggleDrawer !== null) {
            toggleDrawer(false);
            return;
        }
    };

    return menuHome.map((item) => (
        <Link
            key={item.title}
            to={item.link}
            className={classes.item}
            onClick={handleCloseDrawer}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <Grid>
                <Grid.Col span={5}>
                    <ThemeIcon
                        size={50}
                        variant="default"
                        radius="md"
                        color={theme.colors[item.color][5]}
                    >
                        <item.icon
                            color={theme.colors[item.color][7]}
                            //size={40}
                            //stroke={1.5}
                        />
                    </ThemeIcon>
                </Grid.Col>
                <Grid.Col span={7}>
                    <TextSection tt="left" fw={400} fz={16} mt={7}>
                        {item.title}
                    </TextSection>
                </Grid.Col>
            </Grid>
        </Link>
    ));
};
