import cx from "clsx";
import { useMemo, useState } from "react";
import {
    Avatar,
    Divider,
    Group,
    Menu,
    UnstyledButton,
    rem,
} from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { NightModeSwitch, TextSection } from "../../../components";
import { useAuthStore } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { menuProfile } from "../../../layouts/appshell/menu/data/menuRoutes";
import { capitalizarCadaPalabra } from "../../../helpers/fnHelpers";
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
        if (!usuario || !usuario.usu_alias) return "G";
        const [firstName = "", lastName = ""] = usuario.usu_alias.split(" ");
        return `${firstName[0] || ""}${lastName[0] || ""}`;
    }, [usuario]);

    const handleMenuClick = (linked) => {
        navigate(linked);
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
                    <Group gap={20}>
                        <Avatar
                            alt={nombres}
                            variant="default"
                            radius="xl"
                        >
                            {nombres}
                        </Avatar>
                        <div style={{ flex: 1 }}>
                            <TextSection tt="" fw={600} fz={15}>
                                {typeof usuario?.usu_alias === "string"
                                    ? capitalizarCadaPalabra(usuario.usu_alias)
                                    : "Sin datos"}
                            </TextSection>
                            <TextSection color="dimmed" tt="">
                                {usuario?.email ?? "Sin datos"}
                            </TextSection>
                        </div>
                        <IconChevronDown
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Group justify="space-between" p={20}>
                    <Avatar
                        alt={nombres}
                        variant="default"
                        radius="xl"
                        size="lg"
                    >
                        {nombres}
                    </Avatar>
                    <div>
                        <TextSection tt="" fz={15} fw={500}>
                            {typeof usuario?.usu_alias === "string"
                                ? capitalizarCadaPalabra(usuario.usu_alias)
                                : "Sin datos"}
                            <br />
                        </TextSection>
                        <TextSection tt="" fz={15} fw={300}>
                            {usuario?.email || "Sin datos"}
                        </TextSection>
                    </div>
                </Group>
                <Divider mb={10} />
                {menuProfile
                    .slice(0, -1)
                    .map(({ label, path, link, icon: Icon, color }) => (
                        <Menu.Item
                            key={path}
                            onClick={() => handleMenuClick(link)}
                            leftSection={
                                <Icon
                                    style={{ width: rem(20), height: rem(20) }}
                                    color={color}
                                    stroke={1.7}
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
