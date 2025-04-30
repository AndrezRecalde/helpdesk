import { useEffect } from "react";
import {
    Box,
    Checkbox,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import { AlertSection, BtnSubmit } from "../../../components";
import { IconBrandTelegram, IconInfoCircle } from "@tabler/icons-react";
import {
    useDireccionStore,
    useSoporteStore,
    useTecnicoStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";

export const FormSolicitudAdminSoporte = ({ form }) => {
    const { can_tecnico, id_usu_recibe } = form.values;
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { tecnicos } = useTecnicoStore();
    const { isLoading, startCreateSolicitudAdmin } = useSoporteStore();
    const { modalActionAddSolicitud } = useUiSoporte();

    useEffect(() => {
        if (id_usu_recibe !== null) {
            const direccion = users.find(
                (user) => user.cdgo_usrio == id_usu_recibe
            );
            form.setFieldValue(
                "id_direccion",
                direccion?.cdgo_dprtmnto.toString()
            );
        } else {
            form.setFieldValue("id_direccion", null);
        }
    }, [id_usu_recibe]);

    const handleSubmit = () => {
        //console.log(form.getTransformedValues());
        startCreateSolicitudAdmin(form.getTransformedValues());
        form.reset();
        modalActionAddSolicitud(0);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="xs"
            >
                <TextInput
                    label="Escrito: "
                    placeholder="Digite el escrito del documento (Opcional)"
                    {...form.getInputProps("numero_escrito")}
                />
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
                    <Select
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
                            {
                                value: "5",
                                label: "SOPORTE TÉCNICO",
                            },
                        ]}
                    />
                    <Select
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
                            {
                                value: "3",
                                label: "SOPORTE A USUARIOS",
                            },
                            {
                                value: "4",
                                label: "PRESTAMO DE EQUIPO",
                            },
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
                <Select
                    searchable
                    clearable
                    label="Usuario solicitante"
                    placeholder="Seleccione al usuario solicitante"
                    {...form.getInputProps("id_usu_recibe")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />

                <Select
                    disabled
                    label="Dirección"
                    placeholder="Elige la dirección del usuario solicitante"
                    {...form.getInputProps("id_direccion")}
                    data={direcciones.map((direccion) => {
                        return {
                            value: direccion.cdgo_dprtmnto.toString(),
                            label: direccion.nmbre_dprtmnto,
                        };
                    })}
                />
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
                    <Checkbox
                        description="Es opcional agregar un técnico en este momento"
                        color="teal.4"
                        iconColor="dark.8"
                        size="md"
                        label="¿Desea agregar técnico en este momento?"
                        {...form.getInputProps("can_tecnico", {
                            type: "checkbox",
                        })}
                    />

                    {can_tecnico ? (
                        <Select
                            withAsterisk
                            searchable
                            clearable
                            label="Técnico"
                            placeholder="Seleccione técnico"
                            {...form.getInputProps("id_usu_tecnico_asig")}
                            data={tecnicos.map((tecnico) => {
                                return {
                                    value: tecnico.cdgo_usrio.toString(),
                                    label: tecnico.nmbre_usrio,
                                };
                            })}
                        />
                    ) : null}
                </SimpleGrid>
                <Textarea
                    withAsterisk
                    label="Incidente"
                    description="Digite la incidencia del usuario"
                    autosize
                    minRows={5}
                    maxRows={5}
                    {...form.getInputProps("incidente")}
                />
                <BtnSubmit
                    IconSection={IconBrandTelegram}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Crear solicitud
                </BtnSubmit>
                {!can_tecnico ? (
                    <AlertSection
                        variant="light"
                        color="yellow"
                        radius="md"
                        title="Información"
                        icon={IconInfoCircle}
                    >
                        Después de crear la solicitud, posteriormente se debe
                        asignar al técnico.
                    </AlertSection>
                ) : null}
            </Stack>
        </Box>
    );
};
