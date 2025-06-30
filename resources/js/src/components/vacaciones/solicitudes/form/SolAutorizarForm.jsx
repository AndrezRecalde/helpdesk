import { useForm } from "@mantine/form";
import {
    Group,
    ActionIcon,
    Modal,
    Stack,
    Select,
    NumberInput,
    SimpleGrid,
    Box,
    Table,
    Card,
} from "@mantine/core";
import { BtnSection, BtnSubmit, TextSection } from "../../../../components";
import { randomId } from "@mantine/hooks";
import { IconCubePlus, IconTrash } from "@tabler/icons-react";
import {
    usePeriodoStore,
    useUiVacaciones,
    useVacacionesStore,
} from "../../../../hooks";
import dayjs from "dayjs";

export function SolAutorizarForm() {
    const { isLoading, activateVacacion, setActivateVacacion } =
        useVacacionesStore();
    const { modalActionGestionarVacacion } = useUiVacaciones();
    const { periodos } = usePeriodoStore();
    const form = useForm({
        initialValues: {
            periodos: [
                {
                    periodo_id: null,
                    dias_usados: 0,
                    dias_disponibles: 0,
                    key: randomId(),
                },
            ],
        },
        validate: {
            periodos: (values) => {
                if (values.periodos.length === 0) {
                    return "Debe agregar al menos un periodo";
                }
                for (const periodo of values.periodos) {
                    if (!periodo.periodo_id) {
                        return "Todos los periodos deben tener un ID de periodo";
                    }
                    if (periodo.dias_usados <= 0) {
                        return "Los días usados deben ser mayores a cero";
                    }
                }
                return null;
            },
        },
        transformValues: (values) => ({
            periodos: values.periodos.map((periodo) => ({
                periodo_id: Number(periodo.periodo_id) || null,
                dias_usados: Number(periodo.dias_usados) || 0,
                key: periodo.key,
            })),
        }),
    });

    const fields = form.getValues().periodos.map((item, index) => (
        <div key={item.key}>
            <Group justify="space-between" align="center">
                <TextSection fz={16} fw={500} tt="">
                    Periodo # {index + 1}
                </TextSection>
                <ActionIcon
                    color="red.7"
                    disabled={index === 0 ? true : false}
                    onClick={() => form.removeListItem("periodos", index)}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 3, lg: 3 }} mt="xs">
                <Select
                    required
                    label="Periodo"
                    placeholder="Seleccione un año"
                    nothingFoundMessage="No se encontraron resultados"
                    data={periodos.map((periodo) => ({
                        value: periodo.id.toString(),
                        label: periodo.anio.toString(),
                    }))}
                    {...form.getInputProps(`periodos.${index}.periodo_id`)}
                    onChange={(value) => {
                        const selectedPeriodo = periodos.find(
                            (p) => p.id.toString() === value
                        );
                        form.setFieldValue(
                            `periodos.${index}.periodo_id`,
                            value
                        );
                        form.setFieldValue(
                            `periodos.${index}.dias_disponibles`,
                            selectedPeriodo?.dias_disponibles || 0
                        );
                    }}
                />
                <NumberInput
                    required
                    label="Dias a usar"
                    placeholder="Ingrese los dias a usar"
                    defaultValue={100}
                    {...form.getInputProps(`periodos.${index}.dias_usados`)}
                />
                <NumberInput
                    label="Dias disponibles"
                    placeholder="Ingrese los dias a usar"
                    disabled
                    value={item.dias_disponibles}
                />
            </SimpleGrid>
        </div>
    ));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        setActivateVacacion(null); // Reset the activateVacacion state
        modalActionGestionarVacacion(false);
        form.reset();
    };

    return (
        <Card padding="md">
            <Card.Section withBorder inheritPadding py="xs">
                <TextSection tt="" fs="italic">
                    Codigo de solicitud: {activateVacacion?.codigo_vacacion}
                </TextSection>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Table
                    withColumnBorders
                    style={{ tableLayout: "fixed", width: "100%" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: "34%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    Solicitante
                                </TextSection>
                            </Table.Th>
                            <Table.Th style={{ width: "22%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    Fecha Inicio
                                </TextSection>
                            </Table.Th>
                            <Table.Th style={{ width: "22%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    Fecha Fin
                                </TextSection>
                            </Table.Th>
                            <Table.Th style={{ width: "22%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    Días solicitados
                                </TextSection>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {activateVacacion?.solicitante}
                                </TextSection>
                            </Table.Td>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {dayjs(
                                        activateVacacion?.fecha_inicio
                                    ).format("YYYY-MM-DD")}
                                </TextSection>
                            </Table.Td>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {dayjs(activateVacacion?.fecha_fin).format(
                                        "YYYY-MM-DD"
                                    )}
                                </TextSection>
                            </Table.Td>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {activateVacacion?.dias_solicitados}
                                </TextSection>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <Stack>
                        {fields}
                        <Group justify="center">
                            <BtnSection
                                disabled={
                                    form.values.periodos.length >= 3
                                        ? true
                                        : false
                                }
                                IconSection={IconCubePlus}
                                handleAction={() =>
                                    form.insertListItem("periodos", {
                                        periodo_id: null,
                                        dias_usados: 0,
                                        key: randomId(),
                                    })
                                }
                            >
                                Agregar periodo
                            </BtnSection>
                        </Group>
                        <BtnSubmit>Autorizar Solicitud</BtnSubmit>
                    </Stack>
                </Box>
            </Card.Section>
        </Card>
    );
}
