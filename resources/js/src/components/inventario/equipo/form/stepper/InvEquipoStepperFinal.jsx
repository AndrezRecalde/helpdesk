import { Table } from "@mantine/core";

export const InvEquipoStepperFinal = ({ equipo }) => {
    return (
        <Table variant="vertical" layout="fixed" withTableBorder>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th w={160}>Modelo</Table.Th>
                    <Table.Td>{equipo.modelo}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>Número de Serie</Table.Th>
                    <Table.Td>{equipo.numero_serie}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>Código Nuevo</Table.Th>
                    <Table.Td>{equipo.codigo_nuevo}</Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>Código Antiguo</Table.Th>
                    <Table.Td>
                        {equipo.codigo_antiguo
                            ? equipo.codigo_antiguo
                            : "SIN CODIGO"}
                    </Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>Fecha de Adquisición</Table.Th>
                    <Table.Td>
                        {new Date(
                            equipo.fecha_adquisicion
                        ).toLocaleDateString()}
                    </Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>Vida Útil</Table.Th>
                    <Table.Td>{equipo.vida_util} año(s)</Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>Descripción</Table.Th>
                    <Table.Td>
                        {equipo.descripcion
                            ? equipo.descripcion
                            : "SIN DESCRIPCION"}
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
};
