import {
    UnstyledButton,
    Center,
    Box,
    Collapse,
    Group,
    ThemeIcon,
    Divider,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { MenuQuick } from "./MenuLinks";
import { Link } from "react-router-dom";
import { TextSection } from "../../../components";

export const MenuSection = ({
    title,
    usuario,
    menuData,
    isOpen,
    toggle,
    classes,
    toggleDrawer,
}) => {
    const handleActionToggle = () => {
        isOpen ? toggle(false) : toggle(true);
    };
    return (
        <>
            <UnstyledButton
                className={classes.link}
                onClick={() => handleActionToggle()}
            >
                <Center inline>
                    <Box component="span" mr={5}>
                        {title}
                    </Box>
                    <IconChevronDown size={16} />
                </Center>
            </UnstyledButton>
            <Collapse in={isOpen}>
                {Object.entries(menuData).map(([category, items]) => (
                    <div key={category} style={{ paddingLeft: 10 }}>
                        <TextSection fw={700} color="dimmed" style={{ letterSpacing: "1px" }}>
                            {category}
                        </TextSection>
                        {items.map((item) => {
                            const isAllowed = item.roles.includes(usuario.role);

                            if (!isAllowed) return null; // Oculta el item si el rol no tiene permiso

                            return (
                                <Link
                                    key={item.title}
                                    to={item.link}
                                    className={classes.subLink}
                                    onClick={() => toggleDrawer(false)}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    <Group wrap="nowrap" align="center">
                                        <ThemeIcon
                                            size={35}
                                            variant="default"
                                            radius="md"
                                        >
                                            <item.icon
                                                size={18}
                                            />
                                        </ThemeIcon>
                                        <TextSection>{item.title}</TextSection>
                                    </Group>
                                </Link>
                            );
                        })}
                        <Divider my="sm" />
                    </div>
                ))}
            </Collapse>
            <Divider my="sm" />
        </>
    );
};

export const MenuRapidoSection = ({
    title,
    menuData,
    isOpen,
    toggle,
    classes,
    theme,
    toggleDrawer,
}) => (
    <>
        <UnstyledButton className={classes.link} onClick={toggle}>
            <Center inline>
                <Box component="span" mr={5}>
                    {title}
                </Box>
                <IconChevronDown size={16} />
            </Center>
        </UnstyledButton>
        <Collapse in={isOpen}>
            <MenuQuick
                menuData={menuData}
                classes={classes}
                theme={theme}
                toggleDrawer={toggleDrawer}
            />
        </Collapse>
    </>
);
