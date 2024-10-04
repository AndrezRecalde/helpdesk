import { Card, Divider, Drawer, rem, Stack, Tabs, Text } from "@mantine/core";
import { useInvUiEquipo } from "../../../../hooks";
import { TitlePage } from "../../../../components";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";

export const InvViewEquipoModal = () => {
    const iconStyle = { width: rem(12), height: rem(12) };
    const { isOpenModalViewEquipo, modalActionViewEquipo } = useInvUiEquipo();

    const handleCloseModal = () => {
        modalActionViewEquipo(false);
    };

    return (
        <Drawer
            position="right"
            size="xl"
            opened={false}
            onClose={handleCloseModal}
            title={
                <TitlePage order={3} ta="left">
                    Detalles del Equipo
                </TitlePage>
            }
        >
            <Divider my="md" />
            <Stack>
                <div>
                    <Text fz="md" fw={300}>
                        001663
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Codigo
                    </Text>
                </div>
                <div>
                    <Text fz="md" fw={300}>
                        PROPIEDAD, PLANTA Y EQUIPO DE ADMINISTRACION
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Tipo
                    </Text>
                </div>
                <div>
                    <Text fz="md" fw={300}>
                        BIENES MUEBLES
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        SubTipo
                    </Text>
                </div>
                <div>
                    <Text fz="md" fw={300}>
                        EQUIPO ELECTRONICO/COMPUTADOR DE ESCRITORIO
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Categoria
                    </Text>
                </div>
                <div>
                    <Text fz="md" fw={300}>
                        COMPUTADOR COMPLETO ACTUALMENTE SOLO CUENTA CON MONITOR
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Descripcion
                    </Text>
                </div>
            </Stack>

            <Tabs mt={30} variant="outline" defaultValue="general">
                <Tabs.List>
                    <Tabs.Tab
                        value="general"
                        leftSection={<IconPhoto style={iconStyle} />}
                    >
                        General
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="ubicacion"
                        leftSection={<IconMessageCircle style={iconStyle} />}
                    >
                        Ubicacion Fisica
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="complementaria"
                        leftSection={<IconSettings style={iconStyle} />}
                    >
                        Complementaria
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery">General</Tabs.Panel>

                <Tabs.Panel value="messages">Ubicacion Fisica</Tabs.Panel>

                <Tabs.Panel value="settings">Complementaria</Tabs.Panel>
            </Tabs>
        </Drawer>
    );
};
