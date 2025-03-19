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
    InvUbicacionPage,
    InvConceptoPage,
} from "../../pages";
import { useNavigate, useParams } from "react-router-dom";
import { useTitlePage } from "../../hooks";

const ConfigInventarioPage = () => {
    useTitlePage("Helpdesk | Config. Inv.");
    const iconStyle = { width: rem(18), height: rem(18) };

    const navigate = useNavigate();
    const { tabValue } = useParams();

    return (
        <Container size="xl">
            <TitlePage order={2}>Parametros del Inventario</TitlePage>
            <Divider my="md" />

            <Tabs
                defaultValue="categorias"
                value={tabValue}
                onChange={(value) =>
                    navigate(`/helpdesk/gerencia/configuracion-inventario/${value}`)
                }
            >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="categorias"
                        leftSection={<IconCategoryPlus style={iconStyle} />}
                    >
                        Categorias
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="marcas"
                        leftSection={<IconBrandDatabricks style={iconStyle} />}
                    >
                        Marcas
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="estados"
                        leftSection={<IconAdjustments style={iconStyle} />}
                    >
                        Estados
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="ubicaciones"
                        leftSection={<IconMapPins style={iconStyle} />}
                    >
                        Ubicaciones
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="categorias">
                    <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={20}>
                        <InvTipocategoriasPage tabValue={tabValue} />
                        <InvCategoriasPage tabValue={tabValue} />
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="marcas">
                    <SimpleGrid cols={1} mt={20}>
                        <InvMarcaPage tabValue={tabValue} />
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="estados">
                    <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={20}>
                        <InvEstadoPage tabValue={tabValue} />
                        <InvConceptoPage tabValue={tabValue} />
                    </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel value="ubicaciones">
                    <SimpleGrid cols={1} mt={20}>
                        <InvUbicacionPage tabValue={tabValue} />
                    </SimpleGrid>
                </Tabs.Panel>
            </Tabs>
            {/* <Routes>
                <Route path="categoria" element={<InvCategoriasPage />} />
                <Route path="marca" element={<InvMarcaPage />} />
            </Routes> */}
        </Container>
    );
};

export default ConfigInventarioPage;
