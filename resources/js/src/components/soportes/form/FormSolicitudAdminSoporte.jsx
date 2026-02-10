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
    useAreaTicStore,
    useDireccionStore,
    useSoporteStore,
    useTecnicoStore,
    useUiSoporte,
    useUsersStore,
} from "../../../hooks";
import classes from "../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FormSolicitudAdminSoporte = ({ form }) => {
    const { can_tecnico, id_usu_recibe, id_usu_tecnico_asig } = form.values;
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { tecnicos, loadEstadisticas } = useTecnicoStore();
    const { areas, startLoadAreas } = useAreaTicStore();
    const { isLoading, startCreateSolicitudAdmin } = useSoporteStore();
    const { modalActionAddSolicitud } = useUiSoporte();

    // Cargar áreas TIC activas
    useEffect(() => {
        startLoadAreas(true); // true = cargar todas las áreas
    }, []);

    useEffect(() => {
        if (id_usu_recibe !== null) {
            const direccion = users.find(
                (user) => user.cdgo_usrio == id_usu_recibe,
            );
            form.setFieldValue(
                "id_direccion",
                direccion?.cdgo_dprtmnto.toString(),
            );
        } else {
            form.setFieldValue("id_direccion", null);
        }
    }, [id_usu_recibe]);

    // Auto-seleccionar área principal del técnico
    useEffect(() => {
        if (id_usu_tecnico_asig !== null && tecnicos.length > 0) {
            const tecnicoSeleccionado = tecnicos.find(
                (tecnico) => tecnico.cdgo_usrio == id_usu_tecnico_asig,
            );

            if (
                tecnicoSeleccionado?.areas &&
                tecnicoSeleccionado.areas.length > 0
            ) {
                // Buscar área principal
                const areaPrincipal = tecnicoSeleccionado.areas.find(
                    (area) => area.principal === true || area.principal === 1,
                );

                // Si tiene área principal, seleccionarla; sino, seleccionar la primera
                const areaASeleccionar =
                    areaPrincipal || tecnicoSeleccionado.areas[0];

                if (areaASeleccionar) {
                    form.setFieldValue(
                        "id_area_tic",
                        areaASeleccionar.id_areas_tic.toString(),
                    );
                }
            }
        }
    }, [id_usu_tecnico_asig, tecnicos]);

    const handleSubmit = () => {
        //console.log(form.getTransformedValues());
        startCreateSolicitudAdmin(form.getTransformedValues());
        loadEstadisticas();
        form.reset();
        modalActionAddSolicitud(0);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <TextInput
                    label="Escrito: "
                    placeholder="Digite el escrito del documento (Opcional)"
                    {...form.getInputProps("numero_escrito")}
                    classNames={classes}
                />
                <SimpleGrid cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
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
                            classNames={classes}
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
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
                    <Select
                        withAsterisk
                        label="Área del soporte"
                        placeholder="Seleccione el área"
                        classNames={classes}
                        {...form.getInputProps("id_area_tic")}
                        data={areas
                            .filter((area) => area.activo)
                            .map((area) => ({
                                value: area.id_areas_tic.toString(),
                                label: area.nombre,
                            }))}
                    />
                    <Select
                        withAsterisk
                        label="Tipo Soporte"
                        placeholder="Seleccione Tipo Soporte"
                        classNames={classes}
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
                    withAsterisk
                    searchable
                    clearable
                    label="Usuario solicitante"
                    placeholder="Seleccione al usuario solicitante"
                    classNames={classes}
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
                    placeholder="Elige la dirección del usuario solicitante"
                    classNames={classes}
                    {...form.getInputProps("id_direccion")}
                    data={direcciones.map((direccion) => {
                        return {
                            value: direccion.cdgo_dprtmnto.toString(),
                            label: direccion.nmbre_dprtmnto,
                        };
                    })}
                />

                <Textarea
                    withAsterisk
                    label="Incidente"
                    description="Describa la incidencia o problema técnico que tiene el usuario"
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
