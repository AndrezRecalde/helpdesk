import { useEffect } from "react";
import { Box, Divider, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { useSoporteStore, useTecnicoStore, useUiSoporte } from "../../../hooks";
import { BtnSubmit } from "../../../components";
import { IconBrandTelegram } from "@tabler/icons-react";

export const FormAsignarSoporte = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { tecnicos } = useTecnicoStore();
    const { isLoading, activateSoporte, startAsignarSoporte } =
        useSoporteStore();
    const { modalActionAsignarSoporte } = useUiSoporte();

    useEffect(() => {
        if (activateSoporte !== null) {
            form.setValues({
                ...activateSoporte,
                id_area_tic: activateSoporte.id_area_tic
                    ? activateSoporte.id_area_tic.toString()
                    : null,
                id_tipo_soporte: activateSoporte.id_tipo_soporte
                    ? activateSoporte.id_tipo_soporte.toString()
                    : null,
                id_usu_tecnico_asig: activateSoporte.id_usu_tecnico_asig
                    ? activateSoporte.id_usu_tecnico_asig.toString()
                    : null,
            });
            return;
        }
    }, [activateSoporte]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAsignarSoporte(form.getTransformedValues(), usuario);
        modalActionAsignarSoporte(0);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Divider size="md" label="Incidencia Soporte" />
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
                    <div>
                        <Text fz="md" fw={500}>
                            {activateSoporte?.usuario_recibe}
                        </Text>
                        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                            Usuario Solicitante
                        </Text>
                    </div>
                    <div>
                        <Text fz="md" fw={500}>
                            {activateSoporte?.incidente}
                        </Text>
                        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                            Incidente
                        </Text>
                    </div>
                </SimpleGrid>
                <Divider size="md" my="md" label="Asignar Técnico" />
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
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
                </SimpleGrid>
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
                <BtnSubmit
                    IconSection={IconBrandTelegram}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Asignar Técnico
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
