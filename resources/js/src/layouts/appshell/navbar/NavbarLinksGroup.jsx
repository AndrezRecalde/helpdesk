import { useState } from "react";
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import classes from "../../../assets/styles/modules/layout/navbar/NavbarLinksGroup.module.css";

export const LinksGroup = ({ icon: Icon, label, initiallyOpened, links, role, toggleMobile }) => {
    const hasLinks = Array.isArray(links) && links.length > 0;
    const [opened, setOpened] = useState(initiallyOpened || false);
    const location = useLocation();

    const getBasePath = (role) => {
        switch (role) {
            case "GERENTE":
                return "/gerencia";
            case "TECNICO":
                return "/tecnico";
            default:
                return "/staff";
        }
    };

    const basePath = getBasePath(role);

    const isActive = (link) => {
        return location.pathname === link;
    };

    const items = hasLinks ? links.map((link) => (
        <Text
            component={Link}
            className={`${classes.link} ${isActive(`${basePath}${link.link}`) ? classes.linkActive : ''}`}
            to={`${basePath}${link.link}`} // Ruta completa con prefijo
            key={link.label}
            onClick={toggleMobile}
        >
            {link.label}
        </Text>
    )) : null;

    return (
        <>
            <UnstyledButton
                onClick={() => setOpened((o) => !o)}
                className={classes.control}
            >
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <ThemeIcon
                            variant="default"
                            color="teal.5"
                            radius="lg"
                            size="lg"
                        >
                            <Icon size="1.1rem" stroke={1.5} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? "rotate(-90deg)" : "none",
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
};
