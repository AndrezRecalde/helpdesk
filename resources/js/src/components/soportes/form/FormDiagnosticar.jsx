import { useEffect, useState } from "react";
import {
    Card,
    Group,
    rem,
    Textarea,
    Select,
    SimpleGrid,
    Checkbox,
    Box,
    Stack,
    Table,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { BtnSubmit, TextSection } from "../../../components";
import {
    useEquipoStore,
    useSoporteStore,
    useStorageField,
    useUiSoporte,
} from "../../../hooks";
import {
    IconCalendarMonth,
    IconRosetteDiscountCheck,
} from "@tabler/icons-react";
import classes from "../../../assets/styles/modules/soporte/CardDiagnostico.module.css";
import dayjs from "dayjs";

export const FormDiagnosticar = ({ form, option }) => {
    const { activo_informatico, id_tipo_soporte } = form.values;
    const [checkEstado, setCheckEstado] = useState(false);
    const { equipos } = useEquipoStore();
    const { modalActionDiagnosticar } = useUiSoporte();
    const { activateSoporte, startDiagnosticarSoporte } = useSoporteStore();
    const { storageFields } = useStorageField();

    useEffect(() => {
        if (activateSoporte !== null) {
            form.setFieldValue("id_sop", activateSoporte?.id_sop);
            form.setFieldValue(
                "id_area_tic",
                activateSoporte?.id_area_tic.toString() ?? null
            );
            form.setFieldValue(
                "id_area_tic",
                activateSoporte?.id_area_tic.toString() ?? null
            );
            form.setFieldValue(
                "id_tipo_soporte",
                activateSoporte?.id_tipo_soporte.toString() ?? null
            );
            return;
        }
    }, [activateSoporte]);

    useEffect(() => {
        if (
            id_tipo_soporte == 1 ||
            id_tipo_soporte == 4 ||
            id_tipo_soporte == 5 ||
            id_tipo_soporte == 6
        ) {
            form.setFieldValue("activo_informatico", true);
            setCheckEstado(true);
        } else {
            form.setFieldValue("activo_informatico", false);
            setCheckEstado(false);
        }
    }, [id_tipo_soporte]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        if (option === 2) {
            startDiagnosticarSoporte(
                form.getTransformedValues(),
                option,
                storageFields
            );
            form.reset();
            modalActionDiagnosticar(0);
            return;
        }
        startDiagnosticarSoporte(form.getTransformedValues(), option);
        form.reset();
        modalActionDiagnosticar(0);
    };

    return (
        <Card withBorder padding="lg" className={classes.card}>
            <Card.Section withBorder inheritPadding py="xs">
                <Table
                    withColumnBorders
                    style={{ tableLayout: "fixed", width: "100%" }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: "38.33%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    Dirección
                                </TextSection>
                            </Table.Th>
                            <Table.Th style={{ width: "33.33%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    Solicitante
                                </TextSection>
                            </Table.Th>
                            <Table.Th style={{ width: "28.33%" }}>
                                <TextSection
                                    fw={500}
                                    fz={12}
                                    tt=""
                                    color="dimmed"
                                >
                                    No. Soporte
                                </TextSection>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {activateSoporte?.direccion}
                                </TextSection>
                            </Table.Td>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {activateSoporte?.usuario_recibe}
                                </TextSection>
                            </Table.Td>
                            <Table.Td>
                                <TextSection fw={400} fz={13}>
                                    {" "}
                                    {activateSoporte?.numero_sop}
                                </TextSection>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <TextSection fz={14} fw={700} tt="">
                        Incidencia del usuario:
                    </TextSection>
                    <Group gap={5}>
                        <TextSection tt="" fz={14} color="dimmed">
                            {dayjs(activateSoporte?.fecha_ini).format(
                                "YYYY-MM-DD HH:mm"
                            )}
                        </TextSection>
                        <IconCalendarMonth
                            style={{ width: rem(20), height: rem(20) }}
                        />
                    </Group>
                </Group>
                <TextSection mt="xs" mb="xs" color="black" fz={13}>
                    {activateSoporte?.incidente}
                </TextSection>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <Stack>
                        <DateTimePicker
                            withAsterisk
                            valueFormat="YYYY-MM-DD HH:mm"
                            label="Fecha de finalización"
                            placeholder="Seleccione fecha de finalización"
                            {...form.getInputProps("fecha_fin")}
                        />
                        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
                            <Select
                                withAsterisk
                                label="Área del soporte"
                                placeholder="Seleccione el área"
                                {...form.getInputProps("id_area_tic")}
                                data={[
                                    {
                                        value: "1",
                                        label: "SISTEMAS Y APLICACIONES",
                                    },
                                    {
                                        value: "2",
                                        label: "INFRAESTRUCTURA TECNOLÓGICA",
                                    },
                                    { value: "5", label: "SOPORTE TÉCNICO" },
                                ]}
                            />
                            <Select
                                withAsterisk
                                label="Tipo Soporte"
                                placeholder="Seleccione Tipo Soporte"
                                {...form.getInputProps("id_tipo_soporte")}
                                data={[
                                    {
                                        value: "1",
                                        label: "SOPORTE EN HARDWARE",
                                    },
                                    {
                                        value: "2",
                                        label: "SOPORTE EN SOFTWARE",
                                    },
                                    { value: "3", label: "SOPORTE A USUARIOS" },
                                    { value: "4", label: "PRESTAMO DE EQUIPO" },
                                    {
                                        value: "5",
                                        label: "MANTENIMIENTO PREVENTIVO",
                                    },
                                    {
                                        value: "6",
                                        label: "MANTENIMIENTO CORRECTIVO",
                                    },
                                ]}
                            />
                        </SimpleGrid>
                        <Textarea
                            withAsterisk
                            label="Solución"
                            description="Digite como solucionó el incidente"
                            autosize
                            minRows={3}
                            maxRows={3}
                            {...form.getInputProps("solucion")}
                        />
                        <Checkbox
                            disabled={checkEstado}
                            color="teal.4"
                            iconColor="dark.8"
                            size="sm"
                            label="¿Aplica un activo informático?"
                            {...form.getInputProps("activo_informatico", {
                                type: "checkbox",
                            })}
                        />
                        {activo_informatico ? (
                            <Select
                                searchable
                                clearable
                                label="Activo Informatico"
                                placeholder="Seleccione el activo informatico"
                                {...form.getInputProps("id_equipo")}
                                data={equipos.map((equipo) => {
                                    return {
                                        group: equipo.sop_tipo_equipo_nombre,
                                        items: equipo.equipos.map((eq) => {
                                            return {
                                                value: eq.idsop_equipo.toString(),
                                                label: `${
                                                    eq.sop_equipo_codigo
                                                } ${eq.sop_equipo_serie ?? ""}`,
                                            };
                                        }),
                                    };
                                })}
                            />
                        ) : null}
                        <BtnSubmit IconSection={IconRosetteDiscountCheck}>
                            Finalizar soporte
                        </BtnSubmit>
                    </Stack>
                </Box>
            </Card.Section>
        </Card>
    );
};
