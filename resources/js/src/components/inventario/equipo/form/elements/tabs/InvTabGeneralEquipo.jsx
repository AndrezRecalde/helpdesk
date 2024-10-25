import { Table } from "@mantine/core";
import { useInvEquipoStore } from "../../../../../../hooks";
import dayjs from "dayjs";



export const InvTabGeneralEquipo = () => {
    const { activateInvEquipo } = useInvEquipoStore();

    const elements = [
        { caracteristica: "ESTADO", value: activateInvEquipo?.nombre_estado || "Cargando..." },
        { caracteristica: "MARCA", value: activateInvEquipo?.nombre_marca || "Cargando..." },
        { caracteristica: "MODELO", value: activateInvEquipo?.modelo || "Cargando..." },
        { caracteristica: "NÚMERO SERIE", value: activateInvEquipo?.numero_serie || "Cargando..." },
        { caracteristica: "FECHA DE ADQUISICIÓN", value: dayjs(activateInvEquipo?.fecha_adquisicion).format("YYYY-MM-DD") || "Cargando..." },
        { caracteristica: "FECHA DE AMORTIZACIÓN", value: dayjs(activateInvEquipo?.fecha_amortizacion).format("YYYY-MM-DD") || "No Registra..." },
        { caracteristica: "VIDA ÚTIL (EN AÑOS)", value: activateInvEquipo?.vida_util || "Cargando..." },
        { caracteristica: "BIEN ADQUIRIDO", value: activateInvEquipo?.bien_adquirido === true ? "Sí" : "No" || "Cargando..." },
        { caracteristica: "BIEN DONADO", value: activateInvEquipo?.bien_donado === true ? "Sí" : "No" || "Cargando..." },
        { caracteristica: "BIEN USADO", value: activateInvEquipo?.bien_usado === true ? "Sí" : "No" || "Cargando..." },
        { caracteristica: "UBICACIÓN FÍSICA", value: activateInvEquipo?.nombre_ubicacion || "Cargando..." },
        { caracteristica: "NOMBRE DE EDIFICIO", value: activateInvEquipo?.nombre_edificio || "Cargando..." },

    ];

    const rows = elements.map((element) => (
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
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
};
