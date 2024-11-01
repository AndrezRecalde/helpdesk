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
import { IconBrandTelegram } from "@tabler/icons-react";

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
    const { storageFields = {} } = useStorageField();

    useEffect(() => {
        if (
            id_tipo_soporte == 1 ||
            id_tipo_soporte == 4 ||
            id_tipo_soporte == 5 ||
            id_tipo_soporte == 6
        ) {
            //console.log(id_tipo_soporte)
            form.setFieldValue("activo_informatico", true);
            form.setFieldValue(
                "id_equipo",
                activateSoporte?.id_equipo
                    ? activateSoporte?.id_equipo.toString()
                    : null
            );
        }
        if (id_tipo_soporte == 2 || id_tipo_soporte == 3) {
            //console.log('aquii')
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
    }, [id_tipo_soporte]);

    useEffect(() => {
        if (!activo_informatico) {
            form.setFieldValue("id_equipo", null);
        }
    }, [activo_informatico]);

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
        startCreateSoporte(form.getTransformedValues(), storageFields);
        modalActionCreateSoporte(0);
        form.reset();
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
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
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
                    <DateTimePicker
                        withAsterisk
                        valueFormat="YYYY-MM-DD HH:mm"
                        label="Fecha de solicitud"
                        placeholder="Seleccione fecha de solicitud"
                        {...form.getInputProps("fecha_ini")}
                    />
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
                    <TextInput
                        label="Escrito: "
                        placeholder="Digite el escrito del documento (Opcional)"
                        {...form.getInputProps("numero_escrito")}
                    />
                </SimpleGrid>
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
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
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
                </SimpleGrid>
                <Textarea
                    withAsterisk
                    //disabled={activateSoporte !== null ? true : false}
                    label="Incidente"
                    description="Digite la incidencia del usuario"
                    autosize
                    minRows={3}
                    maxRows={3}
                    {...form.getInputProps("incidente")}
                />
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
                    valueFormat="YYYY-MM-DD HH:mm"
                    label="Fecha de finalización"
                    placeholder="Seleccione fecha de finalización"
                    {...form.getInputProps("fecha_fin")}
                />
                <BtnSubmit fontSize={16} IconSection={IconBrandTelegram}>
                    Crear el soporte
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
