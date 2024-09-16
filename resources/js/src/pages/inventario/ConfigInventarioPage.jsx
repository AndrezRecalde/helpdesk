import { useEffect } from "react";
import { Container, Divider, rem, Tabs } from "@mantine/core";
import { useInvTipocategoriaStore } from "../../hooks";
import {
    TitlePage,
} from "../../components";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";

export const ConfigInventarioPage = () => {
    const iconStyle = { width: rem(12), height: rem(12) };

    const { startLoadTiposcategorias, startClearTiposcategorias } =
        useInvTipocategoriaStore();

    useEffect(() => {
        startLoadTiposcategorias();

        return () => {
            startClearTiposcategorias();
        };
    }, []);

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Parametros del Inventario
            </TitlePage>
            <Divider my="md" />

            <Tabs defaultValue="gallery">
                <Tabs.List grow>
                    <Tabs.Tab
                        value="gallery"
                        leftSection={<IconPhoto style={iconStyle} />}
                    >
                        Categorias
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="messages"
                        leftSection={<IconMessageCircle style={iconStyle} />}
                    >
                        Tipos categorias
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="settings"
                        leftSection={<IconSettings style={iconStyle} />}
                    >
                        Marcas
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="settings"
                        leftSection={<IconSettings style={iconStyle} />}
                    >
                        Estados
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="settings"
                        leftSection={<IconSettings style={iconStyle} />}
                    >
                        Ubicaciones
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery">Table de Categorias</Tabs.Panel>

                <Tabs.Panel value="messages">Table de Tipos categorias</Tabs.Panel>

                <Tabs.Panel value="settings">Table de Marcas</Tabs.Panel>

                <Tabs.Panel value="settings">Table de Estados</Tabs.Panel>

                <Tabs.Panel value="settings">Table de Ubicaciones</Tabs.Panel>


            </Tabs>
        </Container>
    );
};
