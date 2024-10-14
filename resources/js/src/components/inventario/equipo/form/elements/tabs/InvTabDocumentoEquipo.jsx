import { Table } from "@mantine/core";

const archivos = [
    { documento: "REASIGNACION DE EQUIPOS", name: "documento.pdf" },
    { documento: "BAJA DEL EQUIPO", name: "documento.pdf" },
];

export const InvTabDocumentoEquipo = () => {

    const documento = archivos.map((element) => (
        <Table.Tr key={element.documento}>
            <Table.Td>{element.documento}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table mt={20} withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Documento</Table.Th>
                    <Table.Th>Archivo PDF</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{documento}</Table.Tbody>
        </Table>
    );
};
