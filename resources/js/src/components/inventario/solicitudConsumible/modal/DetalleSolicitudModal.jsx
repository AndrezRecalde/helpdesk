import {
    Modal,
    Stack,
    Text,
    Badge,
    Table,
    Group,
    Divider,
} from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";
import dayjs from "dayjs";

export const DetalleSolicitudModal = ({ opened, onClose, solicitud }) => {
    if (!solicitud) return null;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group>
                    <IconPackage size={24} />
                    <Text fw={600}>Detalle de Solicitud</Text>
                </Group>
            }
            size="lg"
        >
            <Stack gap="md">
                {/* Información General */}
                <Group justify="space-between">
                    <div>
                        <Text size="xs" c="dimmed">
                            N° Solicitud
                        </Text>
                        <Text fw={600} size="lg">
                            {solicitud.numero_solicitud}
                        </Text>
                    </div>
                    <div>
                        <Text size="xs" c="dimmed">
                            Fecha
                        </Text>
                        <Text fw={500}>
                            {dayjs(solicitud.created_at).format(
                                "DD/MM/YYYY HH:mm",
                            )}
                        </Text>
                    </div>
                </Group>

                <Divider />

                {/* Información de Usuarios y Departamento */}
                <Stack gap="xs">
                    <Group>
                        <Text size="sm" fw={500} w={120}>
                            Departamento:
                        </Text>
                        <Badge variant="light" size="lg">
                            {solicitud.departamento?.nmbre_dprtmnto || "N/A"}
                        </Badge>
                    </Group>
                    <Group>
                        <Text size="sm" fw={500} w={120}>
                            Solicitante:
                        </Text>
                        <Text size="sm">
                            {solicitud.usuario_solicita?.nmbre_usrio || "N/A"}
                        </Text>
                    </Group>
                    <Group>
                        <Text size="sm" fw={500} w={120}>
                            Autorizador:
                        </Text>
                        <Text size="sm">
                            {solicitud.usuario_autoriza?.nmbre_usrio || "N/A"}
                        </Text>
                    </Group>
                </Stack>

                {solicitud.observaciones && (
                    <>
                        <Divider />
                        <div>
                            <Text size="sm" fw={500} mb="xs">
                                Observaciones:
                            </Text>
                            <Text size="sm" c="dimmed">
                                {solicitud.observaciones}
                            </Text>
                        </div>
                    </>
                )}

                <Divider />

                {/* Consumibles */}
                <div>
                    <Text size="sm" fw={600} mb="sm">
                        Consumibles Solicitados (
                        {solicitud.consumibles?.length || 0})
                    </Text>
                    <Table striped withTableBorder>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Consumible</Table.Th>
                                <Table.Th>Código</Table.Th>
                                <Table.Th style={{ textAlign: "right" }}>
                                    Cantidad
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {solicitud.consumibles?.map((consumible) => (
                                <Table.Tr key={consumible.id}>
                                    <Table.Td>
                                        {consumible.nombre_consumible}
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge variant="outline" size="sm">
                                            {consumible.codigo || "N/A"}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: "right" }}>
                                        <Badge color="blue" variant="light">
                                            {consumible.pivot
                                                ?.cantidad_solicitada || 0}
                                        </Badge>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </div>
            </Stack>
        </Modal>
    );
};
