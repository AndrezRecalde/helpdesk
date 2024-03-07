import { Alert, Box, Grid, Select, TextInput, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconInfoCircle, IconSend } from "@tabler/icons-react";
import { useDireccionStore, useSoporteStore, useUiSoporte, useUsersStore } from "../../../hooks";

export const FormSolicitudAdminSoporte = ({ form }) => {
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { startCreateSolicitudAdmin } = useSoporteStore();
    const { modalActionAddSolicitud } = useUiSoporte();

    const icon = <IconInfoCircle />;

    const handleSubmit = () => {
        console.log(form.values);
        startCreateSolicitudAdmin(form.values);
        modalActionAddSolicitud(0);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <TextInput
                        label="Escrito: "
                        placeholder="Digite el escrito del documento (Opcional)"
                        {...form.getInputProps("numero_escrito")}
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
                        searchable
                        clearable
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
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
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
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        withAsterisk
                        label="Incidente"
                        description="Digite la incidencia del usuario"
                        autosize
                        minRows={7}
                        maxRows={7}
                        {...form.getInputProps("incidente")}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit fontSize={16} IconSection={IconSend}>
                Crear solicitud
            </BtnSubmit>
            <Alert
                variant="light"
                color="yellow"
                radius="md"
                title="Información"
                icon={icon}
            >
                Después de crear la solicitud, posteriormente se debe asignar al
                técnico.
            </Alert>
        </Box>
    );
};
