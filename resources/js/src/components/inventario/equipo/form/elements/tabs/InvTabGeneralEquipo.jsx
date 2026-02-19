import { Table } from "@mantine/core";
import { useInvEquipoStore } from "../../../../../../hooks";
import dayjs from "dayjs";

export const InvTabGeneralEquipo = () => {
    const { activateInvEquipo } = useInvEquipoStore();

    const elements = [
        {
            caracteristica: "CÓDIGO NUEVO",
            value: activateInvEquipo?.codigo_nuevo
                ? activateInvEquipo?.codigo_nuevo.toUpperCase()
                : "SIN CÓDIGO NUEVO",
        },
        {
            caracteristica: "CÓDIGO ANTIGUO",
            value: activateInvEquipo?.codigo_antiguo
                ? activateInvEquipo?.codigo_antiguo.toUpperCase()
                : "SIN CÓDIGO ANTIGUO",
        },
        {
            caracteristica: "TIPO DE CATEGORÍA",
            value: activateInvEquipo?.nombre_tipocategoria
                ? activateInvEquipo?.nombre_tipocategoria.toUpperCase()
                : "SIN TIPO DE CATEGORÍA",
        },
        {
            caracteristica: "CATEGORÍA",
            value: activateInvEquipo?.nombre_categoria
                ? activateInvEquipo?.nombre_categoria.toUpperCase()
                : "SIN CATEGORÍA",
        },
        {
            caracteristica: "CUSTODIO",
            value: activateInvEquipo?.responsable
                ? activateInvEquipo?.responsable.toUpperCase()
                : "SIN CUSTODIO",
        },
        {
            caracteristica: "DIRECCIÓN",
            value: activateInvEquipo?.direccion
                ? activateInvEquipo?.direccion.toUpperCase()
                : "SIN DIRECCIÓN",
        },
        {
            caracteristica: "ESTADO",
            value: activateInvEquipo?.nombre_estado
                ? activateInvEquipo?.nombre_estado.toUpperCase()
                : "SIN DATOS",
        },
        {
            caracteristica: "MARCA",
            value: activateInvEquipo?.nombre_marca
                ? activateInvEquipo?.nombre_marca.toUpperCase()
                : "SIN DATOS",
        },
        {
            caracteristica: "MODELO",
            value: activateInvEquipo?.modelo
                ? activateInvEquipo?.modelo.toUpperCase()
                : "SIN DATOS",
        },
        {
            caracteristica: "NÚMERO SERIE",
            value: activateInvEquipo?.numero_serie
                ? activateInvEquipo?.numero_serie.toUpperCase()
                : "SIN DATOS",
        },
        {
            caracteristica: "FECHA DE ADQUISICIÓN",
            value: dayjs(activateInvEquipo?.fecha_adquisicion).isValid()
                ? dayjs(activateInvEquipo?.fecha_adquisicion).format(
                      "YYYY-MM-DD",
                  )
                : "SIN DATOS",
        },
        //{ caracteristica: "FECHA DE AMORTIZACIÓN", value: dayjs(activateInvEquipo?.fecha_amortizacion).format("YYYY-MM-DD") || "No Registra..." },
        {
            caracteristica: "VIDA ÚTIL (EN AÑOS)",
            value: activateInvEquipo?.vida_util
                ? activateInvEquipo?.vida_util
                : "SIN DATOS",
        },
        {
            caracteristica: "BIEN ADQUIRIDO",
            value:
                activateInvEquipo?.bien_adquirido === true
                    ? "SI"
                    : "NO" || "SIN DATOS",
        },
        {
            caracteristica: "BIEN DONADO",
            value:
                activateInvEquipo?.bien_donado === true
                    ? "SI"
                    : "NO" || "SIN DATOS",
        },
        {
            caracteristica: "BIEN USADO",
            value:
                activateInvEquipo?.bien_usado === true
                    ? "SI"
                    : "NO" || "SIN DATOS",
        },
        {
            caracteristica: "UBICACIÓN FÍSICA",
            value: activateInvEquipo?.nombre_ubicacion
                ? activateInvEquipo?.nombre_ubicacion
                : "En Bodega",
        },
        {
            caracteristica: "NOMBRE DE EDIFICIO",
            value: activateInvEquipo?.nombre_edificio
                ? activateInvEquipo?.nombre_edificio
                : "SIN DATOS",
        },
        {
            caracteristica: "DESCRIPCIÓN",
            value: activateInvEquipo?.descripcion
                ? activateInvEquipo?.descripcion
                : "SIN DESCRIPCIÓN",
        },
    ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.caracteristica}>
            <Table.Th>{element.caracteristica}</Table.Th>
            <Table.Td>{element.value}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table mt={20} variant="vertical" layout="fixed" withTableBorder>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
};
