import { Button, Menu, rem, useMantineTheme } from "@mantine/core";
import {
    IconChevronDown,
    IconDeviceImacUp,
    IconMessageUp,
} from "@tabler/icons-react";

export const BtnSubmit = ({
    children,
    fullwidth = true,
    heigh = 45,
    fontSize = 18,
    IconSection,
    loading = false,
    disabled = false
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
    heigh = 35,
    fontSize = 14,
    mb = 0,
    mt = 0,
    handleAction,
    children,
}) => {
    return (
        <Button
            mt={mt}
            mb={mb}
            color="teal.5"
            variant="light"
            styles={{
                root: {
                    "--button-height": rem(heigh),
                },
                inner: {
                    fontSize: fontSize,
                },
            }}
            onClick={(e) => handleAction(e)}
        >
            {children}
        </Button>
    );
};

export const BtnAddActions = ({
    heigh = 35,
    fontSize = 14,
    mb = 0,
    mt = 0,
    handleOpenModalSolicitud,
    handleOpenModalSoporte,
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
                    mt={mt}
                    mb={mb}
                    variant="light"
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
                <Menu.Item
                    onClick={handleOpenModalSolicitud}
                    leftSection={
                        <IconMessageUp
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.teal[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Nueva solicitud
                </Menu.Item>
                <Menu.Item
                    onClick={handleOpenModalSoporte}
                    leftSection={
                        <IconDeviceImacUp
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.pink[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Nuevo soporte
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
