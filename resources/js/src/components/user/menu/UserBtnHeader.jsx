import cx from "clsx";
import { useCallback, useEffect, useState } from "react";
import {
    Avatar,
    Group,
    Menu,
    Text,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconChevronRight,
    IconLogout,
    IconSettings,
    IconUserHexagon,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/user/UserHeader.module.css";


export const UserBtnHeader = () => {
    const theme = useMantineTheme();
    const { startLogout } = useAuthStore();
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [nombres, setNombres] = useState("");

    useEffect(() => {
      if (usuario !== null) {
        iniciales();
        return;
      }
    }, [])


    const iniciales = useCallback(() => {
        let inicial_nombre = usuario?.usu_alias?.split(" ");
        let nombre = inicial_nombre[0]?.slice(0,1);
        let apellido = inicial_nombre[1]?.slice(0,1);

        setNombres(nombre + apellido);
    }, []);

    return (
        <Menu
            width={260}
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
                >
                    <Group gap={7}>
                        <Avatar
                            alt="{usuario.apellidos}"
                            radius="xl"
                            color="teal.7"
                        >
                            {nombres}
                        </Avatar>
                        <div style={{ flex: 1 }}>
                            <Text fw={500} size="sm">
                                {usuario?.usu_alias}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {usuario?.email}
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
                <Menu.Item
                onClick={() => navigate("/u/profile")}
                    leftSection={
                        <IconUserHexagon
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.teal[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Ver perfil
                </Menu.Item>
                <Menu.Item
                onClick={() => navigate("/u/change-password")}
                    leftSection={
                        <IconSettings
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    }
                >
                    Cambiar contraseña
                </Menu.Item>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    onClick={startLogout}
                    color="red"
                    leftSection={
                        <IconLogout
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    }
                >
                    Cerrar sesión
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
