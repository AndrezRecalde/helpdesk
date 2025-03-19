import {
    ActionIcon,
    Button,
    Group,
    Menu,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconBuildingBank,
    IconCategory,
    IconChecks,
    IconChevronDown,
    IconDeviceDesktopExclamation,
    IconDeviceImacUp,
    IconMailFast,
    IconMessageUp,
    IconSettings,
    IconUserSearch,
    IconUsers,
} from "@tabler/icons-react";

export const BtnSubmit = ({
    children,
    fullwidth = true,
    heigh = 45,
    fontSize = 18,
    IconSection = IconChecks,
    loading = false,
    disabled = false,
}) => {
    return (
        <Button
            color="teal.5"
            type="submit"
            fullWidth={fullwidth}
            mt="md"
            mb="md"
            rightSection={<IconSection />}
            disabled={disabled}
            loading={loading}
            loaderProps={{ type: "dots" }}
            styles={{
                root: {
                    "--button-height": rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            }}
        >
            {children}
        </Button>
    );
};

export const BtnSection = ({
    heigh = 40,
    fontSize = 14,
    mb = 0,
    mt = 0,
    IconSection,
    handleAction,
    disabled = false,
    children,
}) => {
    return (
        <Button
            mt={mt}
            mb={mb}
            disabled={disabled}
            variant="default"
            leftSection={<IconSection color={"#12b886"} stroke={1.8} />}
            styles={{
                root: {
                    "--button-height": rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            }}
            onClick={handleAction}
        >
            {children}
        </Button>
    );
};

export const BtnAddActions = ({
    heigh = 40,
    fontSize = 14,
    actions = [], // Lista de acciones dinámicas
    children,
}) => {
    const theme = useMantineTheme();

    return (
        <Menu
            transitionProps={{ transition: "pop-top-right" }}
            position="bottom-start"
            width={220}
            withinPortal
        >
            <Menu.Target>
                <Button
                    variant="default"
                    color="teal.5"
                    rightSection={
                        <IconChevronDown
                            style={{ width: rem(18), height: rem(18) }}
                            stroke={1.5}
                        />
                    }
                    pr={12}
                    styles={{
                        root: {
                            "--button-height": rem(heigh),
                        },
                        inner: {
                            fontSize: fontSize,
                        },
                    }}
                >
                    {children}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {actions.map(({ label, icon: Icon, onClick, color }, index) => (
                    <Menu.Item
                        key={index}
                        onClick={onClick}
                        leftSection={
                            <Icon
                                style={{ width: rem(16), height: rem(16) }}
                                color={
                                    theme.colors[color]?.[6] ||
                                    theme.colors.gray[6]
                                }
                                stroke={1.5}
                            />
                        }
                    >
                        {label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export const BtnSolicitarSoporte = ({ theme, linkNavigate }) => {
    return (
        <Menu
            transitionProps={{ transition: "pop-top-right" }}
            position="bottom-end"
            width={220}
            withinPortal
        >
            <Menu.Target>
                <ActionIcon
                    size={35}
                    variant="default"
                    aria-label="ActionIcon soportes"
                >
                    <IconDeviceDesktopExclamation
                        style={{ width: rem(22), height: rem(22) }}
                    />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => linkNavigate("/gad/d/solicitud")}
                    leftSection={
                        <IconMessageUp
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Solicitar Soporte
                </Menu.Item>
                <Menu.Item
                    onClick={() => linkNavigate("/gad/d/soportes/actuales")}
                    leftSection={
                        <IconDeviceImacUp
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Ver mis soportes
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export const BtnAdministracion = ({ theme, linkNavigate }) => {
    return (
        <Menu
            transitionProps={{ transition: "pop-top-right" }}
            position="bottom-end"
            width={220}
            withinPortal
        >
            <Menu.Target>
                <ActionIcon
                    size={35}
                    variant="default"
                    aria-label="ActionIcon administracion"
                >
                    <IconSettings style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => linkNavigate("/gerencia/usuarios")}
                    leftSection={
                        <IconUserSearch
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Administrar usuarios
                </Menu.Item>
                <Menu.Item
                    onClick={() => linkNavigate("/gerencia/direcciones")}
                    leftSection={
                        <IconBuildingBank
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Administrar gestiones
                </Menu.Item>
                <Menu.Item
                    onClick={() => linkNavigate("/gerencia/tecnicos")}
                    leftSection={
                        <IconUsers
                            style={{ width: rem(18), height: rem(18) }}
                            color={theme.colors.teal[8]}
                            stroke={1.5}
                        />
                    }
                >
                    Administrar técnicos
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export const BtnServicesApps = () => {
    return (
        <Group grow mt="md">
            <Button
                leftSection={<IconMailFast size={16} color="orange" />}
                radius="md"
                variant="light"
                component="a"
                href="https://www.gadpe.gob.ec/webmail"
                target="_blank"
                color="orange"
            >
                Webmail
            </Button>
            <Button
                leftSection={<IconCategory size={16} color="teal" />}
                radius="md"
                variant="light"
                component="a"
                href="http://186.46.193.22:8080/intranet"
                target="_blank"
                color="teal"
            >
                Intranet
            </Button>
        </Group>
    );
};
