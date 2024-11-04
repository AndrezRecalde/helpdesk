import { useEffect, useState } from "react";
import {
    ActionIcon,
    Box,
    Code,
    Fieldset,
    Grid,
    MultiSelect,
    rem,
    Stack,
    TextInput,
} from "@mantine/core";
import { AlertSection, BtnSubmit, TextSection } from "../../../../components";
import {
    IconCircleDashedCheck,
    IconDevicesDown,
    IconFile3d,
} from "@tabler/icons-react";
import { useInvEquipoStore, useSoporteStore } from "../../../../hooks";
import { DateInput } from "@mantine/dates";

export const InvBajaEquipoForm = ({ form }) => {
    const { numero_sop } = form.values;
    const { activateInvEquipo } = useInvEquipoStore();
    const { startLoadSoporte, startExportActaPDF, activateSoporte } =
        useSoporteStore();
    const [btnDisabled, setBtnDisabled] = useState(true);

    const { perifericos = [] } = activateInvEquipo || {};

    const icon = (
        <IconFile3d style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    );

    useEffect(() => {
        if (activateSoporte !== null && activateInvEquipo?.solucion === null) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [activateSoporte]);

    const handleSubmitCheckSoporte = (e) => {
        e.preventDefault();
        startLoadSoporte({ numero_sop });
    };

    const handleGenerarActa = (e) => {
        e.preventDefault();
        startExportActaPDF(activateInvEquipo);
    };

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <AlertSection
                variant="light"
                color="teal.5"
                title="Información"
                icon={IconDevicesDown}
            >
                Para confirmar la baja del equipo, debe primero generar un
                soporte técnico y comprobar su activación.
            </AlertSection>
            <div>
                <TextSection tt="" ta="center" fw={500}>
                    Usted dará de baja al equipo:{" "}
                    {activateInvEquipo?.nombre_marca +
                        " " +
                        activateInvEquipo?.modelo}
                </TextSection>
                <TextSection tt="" ta="center" fw={500} fs="italic">
                    {activateInvEquipo?.numero_serie}
                </TextSection>
            </div>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleGenerarActa(e))}
            >
                <Fieldset legend="Información adicional">
                    <Grid>
                        <Grid.Col span={12}>
                            <DateInput
                                clearable
                                valueFormat="YYYY-MM-DD"
                                label="Fecha de baja"
                                placeholder="Seleccione fecha de baja"
                                {...form.getInputProps("fecha_baja")}
                            />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <MultiSelect
                                label="Perifericos/Componentes"
                                placeholder="Selecciona perifericos u componentes"
                                data={perifericos.map((periferico) => {
                                    return {
                                        label: `${periferico.modelo} ${periferico.numero_serie}`,
                                        value: periferico.id.toString(),
                                    };
                                })}
                                {...form.getInputProps("perifericos")}
                            />
                        </Grid.Col>
                        <Grid.Col span={10}>
                            <TextInput
                                placeholder="Digite el número de soporte"
                                {...form.getInputProps("numero_sop")}
                            />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <ActionIcon
                                variant="filled"
                                color="teal.5"
                                size="input-sm"
                                //aria-label="Check soporte"
                                onClick={(e) => handleSubmitCheckSoporte(e)}
                            >
                                <IconCircleDashedCheck
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                    <Code>
                        {activateSoporte !== null
                            ? JSON.stringify(
                                  {
                                      numero_sop:
                                          activateSoporte.numero_sop ||
                                          "Sin carga...",
                                      solicitante:
                                          activateSoporte.solicitante ||
                                          "Sin solicitante...",
                                      tecnico:
                                          activateSoporte.tecnico ||
                                          "Sin técnico...",
                                      solucion:
                                          activateSoporte.solucion ||
                                          "Sin solución...",
                                  },
                                  4,
                                  "\t"
                              )
                            : null}
                    </Code>
                    <BtnSubmit disabled={btnDisabled}>Dar baja</BtnSubmit>
                </Fieldset>
            </Box>
        </Stack>
    );
};
