import { Table } from "@mantine/core";
import { useInvEquipoStore } from "../../../../../../hooks";

export const InvTabUbicacionEquipo = () => {
    const { activateInvEquipo } = useInvEquipoStore();

    const ubicaciones = [
        {
            caracteristica: "NOMBRE DE EDIFICIO",
            value: activateInvEquipo?.nombre_edificio,
        },
        {
            caracteristica: "UBICACIÓN FÍSICA",
            value: activateInvEquipo?.nombre_ubicacion,
        },
    ];

    const ubicacion = ubicaciones.map((element) => (
        <Table.Tr key={element.caracteristica}>
            <Table.Td>{element.caracteristica}</Table.Td>
            <Table.Td>{element.value}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table mt={20} withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Caracteristicas</Table.Th>
                    <Table.Th>Descripción</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{ubicacion}</Table.Tbody>
        </Table>
    );
};
