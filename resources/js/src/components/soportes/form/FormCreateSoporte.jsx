import { Box, Checkbox, Grid, Select, TextInput, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { BtnSubmit } from "../../../components";
import { useDireccionStore, useUsersStore } from "../../../hooks";
import { IconSend } from "@tabler/icons-react";

export const FormCreateSoporte = ({ form }) => {
    const { users } = useUsersStore();
    const { direcciones } = useDireccionStore();
    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={6}>
                    <Select
                        withAsterisk
                        label="Tipo de solicitud"
                        placeholder="Seleccione tipo de solicitud"
                        {...form.getInputProps("id_tipo_solicitud")}
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
                <Grid.Col span={6}>
                    <TextInput
                        label="Escrito: "
                        placeholder="Digite el escrito del documento (Opcional)"
                        {...form.getInputProps("numero_escrito")}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <DateTimePicker
                        withAsterisk
                        valueFormat="YYYY-MM-DD HH:m"
                        label="Fecha de solicitud"
                        placeholder="Seleccione fecha de solicitud"
                        {...form.getInputProps("fecha_ini")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 6 }}>
                    <Select
                        required
                        searchable
                        clearable
                        label="Dirección"
                        placeholder="Seleccione la dirección/gestión"
                        {...form.getInputProps("id_direccion")}
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                    <Select
                        searchable
                        label="Usuario solicitante"
                        placeholder="Seleccione el solicitante"
                        {...form.getInputProps("id_usu_recibe")}
                        data={users.map((user) => {
                            return {
                                value: user.cdgo_usrio.toString(),
                                label: user.nmbre_usrio,
                            };
                        })}
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
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        withAsterisk
                        label="Incidente"
                        description="Digite la incidencia del usuario"
                        autosize
                        minRows={5}
                        maxRows={5}
                        {...form.getInputProps("incidente")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Checkbox
                        defaultChecked
                        color="blue.4"
                        iconColor="dark.8"
                        size="md"
                        label="¿Soporte terminado?"
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit fontSize={16} IconSection={IconSend}>
                Asignar Técnico
            </BtnSubmit>
        </Box>
    );
};
