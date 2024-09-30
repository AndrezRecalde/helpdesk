import { Container, Divider, rem, SimpleGrid, Tabs } from "@mantine/core";
import { TitlePage } from "../../components";
import {
    IconAdjustments,
    IconBrandDatabricks,
    IconCategoryPlus,
    IconMapPins,
} from "@tabler/icons-react";
import {
    InvTipocategoriasPage,
    InvCategoriasPage,
    InvMarcaPage,
    InvEstadoPage,
} from "../../pages";

export const ConfigInventarioPage = () => {
    const iconStyle = { width: rem(18), height: rem(18) };

    return (
        <Container size="xxl">
            <TitlePage order={2} size="h2">
                Parametros del Inventario
            </TitlePage>
            <Divider my="md" />

            <Tabs defaultValue="categoria">
                <Tabs.List grow>
                    <Tabs.Tab
                        value="categoria"
                        leftSection={<IconCategoryPlus style={iconStyle} />}
                    >
                        Categorias
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="marca"
                        leftSection={<IconBrandDatabricks style={iconStyle} />}
                    >
                        Marcas
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="estado"
                        leftSection={<IconAdjustments style={iconStyle} />}
                    >
                        Estados
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="ubicacion"
                        leftSection={<IconMapPins style={iconStyle} />}
                    >
                        Ubicaciones
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="categoria">
                    <SimpleGrid
                        cols={{ base: 1, sm: 1, md: 2, lg: 2 }}
                    >
                        <InvTipocategoriasPage />
                        <InvCategoriasPage />
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="marca">
                    <SimpleGrid cols={1} mt={20}>
                        <InvMarcaPage />
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="estado">
                    <SimpleGrid cols={1} mt={20}>
                        <InvEstadoPage />
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="ubicacion">Table de Ubicaciones</Tabs.Panel>
            </Tabs>
        </Container>
    );
};
