import { Badge, Table, ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconEye, IconFileText } from "@tabler/icons-react";
import { useDenunciaStore, useUiDenuncia } from "../../../hooks";

const getEstadoColor = (estado) => {
    const colors = {
        PENDIENTE: "yellow",
        EN_PROCESO: "blue",
        RESUELTO: "green",
        RECHAZADO: "red",
    };
    return colors[estado] || "gray";
};

const getEstadoLabel = (estado) => {
    const labels = {
        PENDIENTE: "Pendiente",
        EN_PROCESO: "En Proceso",
        RESUELTO: "Resuelto",
        RECHAZADO: "Rechazado",
    };
    return labels[estado] || estado;
};

const getTipoLabel = (tipo) => {
    const labels = {
        ACOSO: "Acoso",
        ABUSO: "Abuso de Autoridad",
        CORRUPCION: "Corrupción",
        OTRO: "Otro",
    };
    return labels[tipo] || tipo;
};

export const MisDenunciasTable = () => {
    const { misDenuncias, isLoading, startLoadMiDenuncia } = useDenunciaStore();
    const { handleOpenModalDetalleDenuncia } = useUiDenuncia();

    const handleVerDetalle = async (numeroDenuncia) => {
        await startLoadMiDenuncia(numeroDenuncia);
        handleOpenModalDetalleDenuncia();
    };

    if (isLoading) {
        return (
            <Text ta="center" c="dimmed">
                Cargando...
            </Text>
        );
    }

    if (!misDenuncias || misDenuncias.length === 0) {
        return (
            <Text ta="center" c="dimmed" py="xl">
                No tienes denuncias registradas
            </Text>
        );
    }

    const rows = misDenuncias.map((denuncia) => (
        <Table.Tr key={denuncia.id}>
            <Table.Td>
                <Text size="sm" fw={500}>
                    {denuncia.numero_denuncia}
                </Text>
            </Table.Td>
            <Table.Td>
                <Badge size="sm" variant="light">
                    {getTipoLabel(denuncia.tipo_denuncia)}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge
                    size="sm"
                    variant="dot"
                    color={getEstadoColor(denuncia.estado)}
                >
                    {getEstadoLabel(denuncia.estado)}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text size="sm">
                    {new Date(denuncia.fecha_creacion).toLocaleDateString(
                        "es-EC",
                    )}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <Badge
                        size="sm"
                        variant="dot"
                        color={denuncia.archivos_count > 0 ? "blue" : "gray"}
                    >
                        {denuncia.archivos_count} archivo(s)
                    </Badge>
                </Group>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <Tooltip label="Ver Detalle">
                        <ActionIcon
                            variant="light"
                            onClick={() =>
                                handleVerDetalle(denuncia.numero_denuncia)
                            }
                        >
                            <IconEye size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Número</Table.Th>
                    <Table.Th>Tipo</Table.Th>
                    <Table.Th>Estado</Table.Th>
                    <Table.Th>Fecha</Table.Th>
                    <Table.Th>Archivos</Table.Th>
                    <Table.Th>Acciones</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
};
