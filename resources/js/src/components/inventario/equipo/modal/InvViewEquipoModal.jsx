import {
    Card,
    Divider,
    Drawer,
    rem,
    Stack,
    Table,
    Tabs,
    Text,
} from "@mantine/core";
import { useInvUiEquipo } from "../../../../hooks";
import { InvEquipoResponsablesTable, TitlePage } from "../../../../components";
import {
    IconAdjustments,
    IconFiles,
    IconMapPin,
    IconUserCheck,
} from "@tabler/icons-react";

const elements = [
    { symbol: "BUENO", name: "ESTADO" },
    { symbol: "DELL INSPIRON", name: "MARCA" },
    { symbol: "3520", name: "MODELO" },
    { symbol: "001-007-526", name: "NÚMERO SERIE" },
    { symbol: "20/06/2023", name: "FECHA DE ADQUISICIÓN" },
    { symbol: "NO REGISTRA", name: "FECHA DE AMORTIZACIÓN" },
    { symbol: "5", name: "VIDA ÚTIL (EN AÑOS)" },
    { symbol: "SÍ", name: "BIEN ADQUIRIDO" },
    { symbol: "NO", name: "BIEN DONADO" },
    { symbol: "NO", name: "BIEN USADO" },
];
const ubicaciones = [
    { symbol: "TALLERES DE SAN MATEO", name: "NOMBRE DE EDIFICIO" },
    { symbol: "SAN MATEO", name: "UBICACIÓN FÍSICA" },
];

const archivos = [
    { documento: "REASIGNACION DE EQUIPOS", name: "documento.pdf" },
    { documento: "BAJA DEL EQUIPO", name: "documento.pdf" },
];

export const InvViewEquipoModal = () => {
    const iconStyle = { width: rem(18), height: rem(18) };
    const { isOpenModalViewEquipo, modalActionViewEquipo } = useInvUiEquipo();

    const handleCloseModal = () => {
        modalActionViewEquipo(false);
    };

    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
        </Table.Tr>
    ));

    const ubicacion = ubicaciones.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.descripcion}</Table.Td>
        </Table.Tr>
    ));

    const documento = archivos.map((element) => (
        <Table.Tr key={element.documento}>
            <Table.Td>{element.documento}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Drawer
            position="right"
            size="50rem"
            opened={isOpenModalViewEquipo}
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
                        Codigo Nuevo
                    </Text>
                </div>
                <div>
                    <Text fz="md" fw={300}>
                        001663
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Codigo Antiguo
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
                <Tabs.List grow>
                    <Tabs.Tab
                        value="general"
                        leftSection={<IconAdjustments style={iconStyle} />}
                    >
                        General
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="ubicacion"
                        leftSection={<IconMapPin style={iconStyle} />}
                    >
                        Ubicación Física
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="responsable"
                        leftSection={<IconUserCheck style={iconStyle} />}
                    >
                        Responsable
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="documentos"
                        leftSection={<IconFiles style={iconStyle} />}
                    >
                        Doc. de Respaldo
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="general">
                    <Table mt={20} withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Caracteristicas</Table.Th>
                                <Table.Th>Descripción</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Tabs.Panel>

                <Tabs.Panel value="ubicacion">
                    <Table mt={20} withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Caracteristicas</Table.Th>
                                <Table.Th>Descripción</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{ubicacion}</Table.Tbody>
                    </Table>
                </Tabs.Panel>
                <Tabs.Panel value="responsable">
                    <InvEquipoResponsablesTable />
                </Tabs.Panel>
                <Tabs.Panel value="documentos">
                    <Table mt={20} withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Documento</Table.Th>
                                <Table.Th>Archivo PDF</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{documento}</Table.Tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>
        </Drawer>
    );
};
