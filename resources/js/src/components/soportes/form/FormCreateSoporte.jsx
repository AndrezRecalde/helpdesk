import { useEffect } from "react";
import {
    Box,
    Checkbox,
    Grid,
    Select,
    Stack,
    TextInput,
    Textarea,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { BtnSubmit } from "../../../components";
import {
    useDireccionStore,
    useEquipoStore,
    useEstadoStore,
    useSoporteStore,
    useStorageField,
    useTecnicoStore,
    useTipoSolicitudStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import { IconSend } from "@tabler/icons-react";

export const FormCreateSoporte = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { id_tipo_solicitud, activo_informatico, id_tipo_soporte } =
        form.values;
    const { estados } = useEstadoStore();
    const { users } = useUsersStore();
    const { tecnicos } = useTecnicoStore();
    const { direcciones } = useDireccionStore();
    const { tiposSolicitudes } = useTipoSolicitudStore();
    const { equipos } = useEquipoStore();
    const { startCreateSoporte, activateSoporte } = useSoporteStore();
    const { modalActionCreateSoporte } = useUiSoporte();
    const { storageFields } = useStorageField();


    useEffect(() => {
        if (activo_informatico || id_tipo_soporte == 1) {
            form.setFieldValue("activo_informatico", true);
            form.setFieldValue(
                "id_equipo",
                activateSoporte?.id_equipo
                    ? activateSoporte?.id_equipo.toString()
                    : null
            );
        }
        if (id_tipo_soporte != 1) {
            form.setFieldValue("activo_informatico", false);
        }
        form.setFieldValue(
            "id_estado",
            activateSoporte?.id_estado
                ? activateSoporte?.id_estado.toString()
                : "3"
        );
        form.setFieldValue(
            "solucion",
            activateSoporte?.solucion ? activateSoporte?.solucion : ""
        );
        form.setFieldValue(
            "fecha_fin",
            activateSoporte?.fecha_fin
                ? new Date(activateSoporte?.fecha_fin)
                : new Date()
        );
    }, [activo_informatico, id_tipo_soporte]);

    useEffect(() => {
        if (id_tipo_solicitud == 7) {
            form.setFieldValue("activo_informatico", false);
            form.setFieldValue("id_estado", "4");
            form.setFieldValue(
                "solucion",
                activateSoporte?.solucion ? activateSoporte?.solucion : ""
            );
            form.setFieldValue(
                "id_equipo",
                activateSoporte?.id_equipo
                    ? activateSoporte?.id_equipo.toString()
                    : null
            );
            form.setFieldValue(
                "fecha_fin",
                activateSoporte?.fecha_fin
                    ? new Date(activateSoporte?.fecha_fin)
                    : new Date()
            );
            return;
        }
        form.setFieldValue(
            "id_estado",
            activateSoporte?.id_estado
                ? activateSoporte?.id_estado.toString()
                : "3"
        );
    }, [id_tipo_solicitud]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        startCreateSoporte(form.getTransformedValues(), storageFields);
        modalActionCreateSoporte(0);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Grid>
                <Grid.Col span={6}>
                    <Select
                        withAsterisk
                        disabled
                        label="Estado de la solicitud"
                        placeholder="Seleccione el estado de la solicitud"
                        {...form.getInputProps("id_estado")}
                        data={estados.map((estado) => {
                            return {
                                value: estado.id_estado_caso.toString(),
                                label: estado.nombre,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <DateTimePicker
                        withAsterisk
                        valueFormat="YYYY-MM-DD hh:mm"
                        label="Fecha de solicitud"
                        placeholder="Seleccione fecha de solicitud"
                        {...form.getInputProps("fecha_ini")}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        withAsterisk
                        label="Tipo de solicitud"
                        placeholder="Seleccione tipo de solicitud"
                        {...form.getInputProps("id_tipo_solicitud")}
                        data={tiposSolicitudes.map((tipoSolicitud) => {
                            return {
                                value: tipoSolicitud.id_tipo_solic.toString(),
                                label: tipoSolicitud.nombre,
                            };
                        })}
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
                    <Select
                        withAsterisk
                        searchable
                        clearable
                        label="Técnico"
                        placeholder="Seleccione técnico"
                        {...form.getInputProps("id_usu_tecnico_asig")}
                        disabled={usuario?.role_id == 2 ? true : false}
                        data={tecnicos.map((tecnico) => {
                            return {
                                value: tecnico.cdgo_usrio.toString(),
                                label: tecnico.nmbre_usrio,
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        withAsterisk
                        searchable
                        clearable
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
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        withAsterisk
                        disabled
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
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Select
                        withAsterisk
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
                        withAsterisk
                        label="Tipo Soporte"
                        placeholder="Seleccione Tipo Soporte"
                        {...form.getInputProps("id_tipo_soporte")}
                        data={[
                            { value: "1", label: "SOPORTE EN HARDWARE" },
                            { value: "2", label: "SOPORTE EN SOFTWARE" },
                            { value: "3", label: "SOPORTE A USUARIOS" },
                            { value: "4", label: "PRESTAMO DE EQUIPO" },
                            { value: "5", label: "MANTENIMIENTO PREVENTIVO" },
                            { value: "6", label: "MANTENIMIENTO CORRECTIVO" },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        withAsterisk
                        disabled={activateSoporte !== null ? true : false}
                        label="Incidente"
                        description="Digite la incidencia del usuario"
                        autosize
                        minRows={3}
                        maxRows={3}
                        {...form.getInputProps("incidente")}
                    />
                </Grid.Col>
            </Grid>
            <Stack mt={20}>
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
                    size="md"
                    label="¿Ingresar activo informático?"
                    disabled={id_tipo_solicitud == 7 ? true : false}
                    {...form.getInputProps("activo_informatico", {
                        type: "checkbox",
                    })}
                />
                {/* <MultiSelect
                        searchable
                        label="Diagnostico"
                        placeholder="Seleccione el/los diagnosticos"
                        maxValues={4}
                        //{...form.getInputProps("")}
                        data={diagnosticos.map((diagnostico) => {
                            return {
                                value: diagnostico.id_diagnostico.toString(),
                                label: diagnostico.diagnostico,
                            };
                        })}
                    /> */}
                {activo_informatico || id_tipo_soporte == 1 ? (
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
                                        label: `${eq.sop_equipo_codigo} ${
                                            eq.sop_equipo_serie ?? ""
                                        }`,
                                    };
                                }),
                            };
                        })}
                    />
                ) : null}
                <DateTimePicker
                    withAsterisk
                    valueFormat="YYYY-MM-DD hh:mm"
                    label="Fecha de finalización"
                    placeholder="Seleccione fecha de finalización"
                    {...form.getInputProps("fecha_fin")}
                />
            </Stack>

            <BtnSubmit fontSize={16} IconSection={IconSend}>
                Crear el soporte
            </BtnSubmit>
        </Box>
    );
};
