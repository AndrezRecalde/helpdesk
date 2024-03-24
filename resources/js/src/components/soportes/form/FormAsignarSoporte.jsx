import { useEffect } from "react";
import { Box, Divider, Grid, Select, Text } from "@mantine/core";
import { useSoporteStore, useTecnicoStore, useUiSoporte } from "../../../hooks";
import { BtnSubmit } from "../../../components";
import { IconSend } from "@tabler/icons-react";

export const FormAsignarSoporte = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { tecnicos } = useTecnicoStore();
    const { isLoading, activateSoporte, startAsignarSoporte } = useSoporteStore();
    const { modalActionAsignarSoporte } = useUiSoporte();

    useEffect(() => {
        if (activateSoporte !== null) {
            form.setValues({
                ...activateSoporte,
                id_area_tic: activateSoporte.id_area_tic ? activateSoporte.id_area_tic.toString() : null,
                id_tipo_soporte: activateSoporte.id_tipo_soporte ? activateSoporte.id_tipo_soporte.toString() : null,
                id_usu_tecnico_asig: activateSoporte.id_usu_tecnico_asig ? activateSoporte.id_usu_tecnico_asig.toString() : null
            });
            return;
        }
    }, [activateSoporte]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAsignarSoporte(form.getTransformedValues(), usuario);
        modalActionAsignarSoporte(0);
        form.reset();
        //console.log(form.values);
        //console.log("aki");
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={6}>
                    <Text fz="md" fw={500}>
                        {activateSoporte?.usuario_recibe}
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Usuario Solicitante
                    </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fz="md" fw={500}>
                        {activateSoporte?.incidente}
                    </Text>
                    <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                        Incidente
                    </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Divider size="md" my="md" label="Asignar Técnico" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Select
                        label="Área del soporte"
                        placeholder="Seleccione el área"
                        {...form.getInputProps("id_area_tic")}
                        data={[
                            { value: "1", label: "SISTEMAS Y APLICACIONES" },
                            {
                                value: "2",
                                label: "INFRAESTRUCTURA TECNOLÓGICA",
                            },
                            { value: "5", label: "SOPORTE TÉCNICO" },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Select
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
                            { value: "5", label: "MANTENIMIENTO PREVENTIVO" },
                            { value: "6", label: "MANTENIMIENTO CORRECTIVO" },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        label="Seleccione Técnico"
                        placeholder="Seleccione el técnico"
                        {...form.getInputProps("id_usu_tecnico_asig")}
                        data={tecnicos.map((tecnico) => {
                            return {
                                value: tecnico.cdgo_usrio.toString(),
                                label: tecnico.nmbre_usrio,
                            };
                        })}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit fontSize={16} IconSection={IconSend} loading={isLoading} disabled={isLoading}>
                Asignar Técnico
            </BtnSubmit>
        </Box>
    );
};
