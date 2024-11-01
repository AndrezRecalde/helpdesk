import { useEffect, useState } from "react";
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
    Stack,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconCalendarMonth, IconPinEnd } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import {
    useEquipoStore,
    useSoporteStore,
    useStorageField,
    useUiSoporte,
} from "../../../hooks";
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
                <SimpleGrid cols={{ base: 1, sm: 1, md: 3, lg: 3 }} spacing={{ base: 10, md: 'xl' }}>
                    <div>
                        <Text size="xs" c="dimmed">
                            Direccion
                        </Text>
                        <Text fw={500} size="sm">
                            {activateSoporte?.direccion}
                        </Text>
                    </div>
                    <div>
                        <Text size="xs" c="dimmed">
                            Solicitante
                        </Text>
                        <Text fw={500} size="sm">
                            {activateSoporte?.usuario_recibe}
                        </Text>
                    </div>
                    <div>
                        <Text size="xs" c="dimmed">
                            Número de soporte
                        </Text>
                        <Text fw={500} size="sm">
                            {activateSoporte?.numero_sop}
                        </Text>
                    </div>
                </SimpleGrid>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                <Box
                    component="form"
                    onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                >
                    <Stack>
                        <DateTimePicker
                            withAsterisk
                            valueFormat="YYYY-MM-DD hh:mm"
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
                        <BtnSubmit fontSize={16} IconSection={IconPinEnd}>
                            Finalizar soporte
                        </BtnSubmit>
                    </Stack>
                </Box>
            </Card.Section>
        </Card>
    );
};
