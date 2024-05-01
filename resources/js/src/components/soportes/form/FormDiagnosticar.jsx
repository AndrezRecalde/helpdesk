import { useEffect } from "react";
import {
    Card,
    Text,
    Group,
    rem,
    Textarea,
    Select,
    SimpleGrid,
    Checkbox,
    Grid,
    Box,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconCalendarMonth, IconPinEnd } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import { useEquipoStore, useSoporteStore, useStorageField, useUiSoporte } from "../../../hooks";
import classes from "../../../assets/styles/modules/soporte/CardDiagnostico.module.css";
import dayjs from "dayjs";

export const FormDiagnosticar = ({ form, option }) => {
    const { activo_informatico, id_tipo_soporte } = form.values;
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
        if (id_tipo_soporte == 1) {
            form.setFieldValue("activo_informatico", true);
        } else {
            form.setFieldValue("activo_informatico", false);
        }
    }, [id_tipo_soporte]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        if (option === 2) {
            startDiagnosticarSoporte(form.getTransformedValues(), option, storageFields);
            modalActionDiagnosticar(0);
            form.reset();
            return;
        }
            startDiagnosticarSoporte(form.getTransformedValues(), option);
            modalActionDiagnosticar(0);
            form.reset();
    };

    return (
        <Card withBorder padding="lg" className={classes.card}>
            <Group justify="space-between">
                <Text fz="sm" fw={700} className={classes.title}>
                    Incidencia del usuario:
                </Text>
                <Group gap={5}>
                    <Text fz="sm" c="dimmed">
                        {dayjs(activateSoporte?.fecha_ini).format("YYYY-MM-DD")}
                    </Text>
                    <IconCalendarMonth
                        style={{ width: rem(20), height: rem(20) }}
                    />
                </Group>
            </Group>
            <Text mt="sm" mb="md" c="dimmed" fz="xs">
                {activateSoporte?.incidente}
            </Text>
            <Card.Section withBorder inheritPadding py="xs">
                <Grid>
                    <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
                        <Text size="xs" c="dimmed">
                            Direccion
                        </Text>
                        <Text fw={500} size="sm">
                            {activateSoporte?.direccion}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                        <Text size="xs" c="dimmed">
                            Solicitante
                        </Text>
                        <Text fw={500} size="sm">
                            {activateSoporte?.usuario_recibe}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                        <Text size="xs" c="dimmed">
                            Número de soporte
                        </Text>
                        <Text fw={500} size="sm">
                            {activateSoporte?.numero_sop}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <SimpleGrid cols={1}>
                        <DateTimePicker
                            withAsterisk
                            valueFormat="YYYY-MM-DD hh:mm"
                            label="Fecha de finalización"
                            placeholder="Seleccione fecha de finalización"
                            {...form.getInputProps("fecha_fin")}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={2} mt="sm">
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
                                { value: "1", label: "SOPORTE EN HARDWARE" },
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
                    <SimpleGrid cols={1} mt="sm">
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
                                limit={5}
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
                    </SimpleGrid>
                    <BtnSubmit fontSize={16} IconSection={IconPinEnd}>
                        Finalizar soporte
                    </BtnSubmit>
                </Box>
            </Card.Section>
        </Card>
    );
};
