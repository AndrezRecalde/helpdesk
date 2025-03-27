import cx from "clsx";
import { useMemo, useState } from "react";
import {
    Avatar,
    Group,
    Menu,
    Text,
    UnstyledButton,
    rem,
} from "@mantine/core";
import {
    IconChevronRight,
    IconLogout,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks";
import { NightModeSwitch } from "./NightModeSwitch";
import { menuProfile } from "../../../layouts/appshell/menu/data/menuRoutes";
import classes from "../../../assets/styles/modules/user/UserHeader.module.css";

export const UserBtnHeader = () => {
    const { startLogout } = useAuthStore();
    const navigate = useNavigate();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const usuario = useMemo(() => {
        const storedUser = localStorage.getItem("service_user");
        return storedUser ? JSON.parse(storedUser) : null;
    }, []);

    const nombres = useMemo(() => {
        if (!usuario || !usuario.usu_alias) return "G"; // Valor predeterminado si `usuario` no tiene alias
        const [firstName = "", lastName = ""] = usuario.usu_alias.split(" ");
        return `${firstName[0] || ""}${lastName[0] || ""}`;
    }, [usuario]);

    const handleMenuClick = (linked) => {
        navigate(linked);
        /* if (toggleMobile) {
            toggleMobile(true);
        } */
    };

    return (
        <Menu
            width={320}
            shadow="md"
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                    })}
                    aria-hidden={false}
                >
                    <Group gap={7}>
                        <Avatar
                            alt={nombres}
                            radius="xl"
                            color="teal.7"
                            name={nombres}
                        />
                        <div style={{ flex: 1 }}>
                            <Text fw={500} size="sm">
                                {usuario?.usu_alias || "Sin datos"}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {usuario?.email || "Sin datos"}
                            </Text>
                        </div>
                        <IconChevronRight
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {menuProfile
                    .slice(0, -1)
                    .map(({ label, path, link, icon: Icon, color }) => (
                        <Menu.Item
                            key={path}
                            onClick={() => handleMenuClick(link)}
                            leftSection={
                                <Icon
                                    style={{ width: rem(18), height: rem(18) }}
                                    color={color}
                                    stroke={1.5}
                                />
                            }
                        >
                            {label}
                        </Menu.Item>
                    ))}

                <Menu.Label>Sesión</Menu.Label>
                <NightModeSwitch />
                <Menu.Item
                    onClick={startLogout}
                    color={menuProfile.at(-1).color}
                    leftSection={
                        <IconLogout
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    }
                >
                    {menuProfile.at(-1).label}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
