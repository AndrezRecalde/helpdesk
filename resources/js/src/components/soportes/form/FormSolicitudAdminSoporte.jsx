import {
    Alert,
    Box,
    Checkbox,
    Grid,
    Select,
    TextInput,
    Textarea,
} from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconInfoCircle, IconSend } from "@tabler/icons-react";
import {
    useDireccionStore,
    useSoporteStore,
    useTecnicoStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";

export const FormSolicitudAdminSoporte = ({ form }) => {
    const { can_tecnico } = form.values;
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { tecnicos } = useTecnicoStore();
    const { startCreateSolicitudAdmin } = useSoporteStore();
    const { modalActionAddSolicitud } = useUiSoporte();

    const icon = <IconInfoCircle />;

    const handleSubmit = () => {
        console.log(form.values);
        startCreateSolicitudAdmin(form.getTransformedValues());
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
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Checkbox
                        description="Es opcional agregar un técnico en este momento"
                        color="blue.4"
                        iconColor="dark.8"
                        size="md"
                        label="¿Desea agregar técnico en este momento?"
                        {...form.getInputProps("can_tecnico", {
                            type: "checkbox",
                        })}
                    />
                </Grid.Col>
                {can_tecnico ? (
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
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
                    </Grid.Col>
                ) : null}
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
            {!can_tecnico ? (
                <Alert
                    variant="light"
                    color="yellow"
                    radius="md"
                    title="Información"
                    icon={icon}
                >
                    Después de crear la solicitud, posteriormente se debe
                    asignar al técnico.
                </Alert>
            ) : null}
        </Box>
    );
};
