import {
    ActionIcon,
    Box,
    Code,
    Fieldset,
    FileInput,
    Grid,
    rem,
    Stack,
    TextInput,
} from "@mantine/core";
import { AlertSection, BtnSubmit, TextSection } from "../../../../components";
import {
    IconChecks,
    IconCircleDashedCheck,
    IconDevicesDown,
    IconFile3d,
    IconFileTypePdf,
} from "@tabler/icons-react";
import { useInvEquipoStore, useSoporteStore } from "../../../../hooks";
import { useEffect, useState } from "react";

export const InvBajaEquipoForm = ({ form_soporte, form_documento }) => {
    const { numero_sop } = form_soporte.values;
    const { activateInvEquipo } = useInvEquipoStore();
    const { startLoadSoporte, startExportActaPDF, activateSoporte } = useSoporteStore();
    const [btnDisabled, setBtnDisabled] = useState(true);

    const icon = (
        <IconFile3d style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    );

    useEffect(() => {
      if (activateSoporte !== null) {
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
    }

    const handleSubmitDocumento = (e) => {
        e.preventDefault();
        console.log("clic1");
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
                onSubmit={form_soporte.onSubmit((_, e) => handleGenerarActa(e))}
            >
                <Fieldset legend="Información del Soporte">
                    <Grid>
                        <Grid.Col span={10}>
                            <TextInput
                                placeholder="Digite el número de soporte"
                                {...form_soporte.getInputProps("numero_sop")}
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
                        {
                            activateSoporte !== null ? (
                                JSON.stringify({
                                    numero_sop: activateSoporte.numero_sop || "Sin carga...",
                                    solicitante: activateSoporte.solicitante || "Sin solicitante...",
                                    tecnico: activateSoporte.tecnico || "Sin técnico...",
                                    solucion: activateSoporte.solucion || "Sin solución..."
                                }, 4, "\t")
                            ) : null
                        }
                    </Code>
                    <BtnSubmit
                        fontSize={16}
                        IconSection={IconFileTypePdf}
                        disabled={btnDisabled}
                    >
                        Generar Acta
                    </BtnSubmit>
                </Fieldset>
            </Box>
            <Box
                component="form"
                onSubmit={form_documento.onSubmit((_, e) => handleSubmitDocumento(e))}
            >
                <Fieldset legend="Información del documento">
                    <FileInput
                        leftSection={icon}
                        label="Archivo firmado"
                        placeholder="Adjunta el archivo generado con las firmas"
                        leftSectionPointerEvents="none"
                        {...form_documento.getInputProps("documento")}
                    />
                    <BtnSubmit
                        fontSize={16}
                        IconSection={IconChecks}
                        disabled={true}
                    >
                        Guardar
                    </BtnSubmit>
                </Fieldset>
            </Box>
        </Stack>
    );
};
