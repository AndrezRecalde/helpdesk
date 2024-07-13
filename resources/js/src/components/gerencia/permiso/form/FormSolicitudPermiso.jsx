import { useEffect, useRef } from "react";
import {
    ActionIcon,
    Box,
    Grid,
    LoadingOverlay,
    Select,
    Textarea,
    rem,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { BtnSubmit } from "../../..";
import { IconChecks, IconClock } from "@tabler/icons-react";
import {
    useDireccionStore,
    usePermisoStore,
    useStorageField,
    useUsersStore,
} from "../../../../hooks";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const FormSolicitudPermiso = ({ form, disabled }) => {
    const { hora_1, hora_2, fecha } = form.values;
    const ref_1 = useRef(null);
    const ref_2 = useRef(null);
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { isLoading, message, errores, startAddPermiso, startCardPermiso } = usePermisoStore();
    const { setStoragePermisoFields } = useStorageField();

    const pickerControl_1 = (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref_1.current?.showPicker()}
        >
            <IconClock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
            />
        </ActionIcon>
    );

    const pickerControl_2 = (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref_2.current?.showPicker()}
        >
            <IconClock
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
            />
        </ActionIcon>
    );

    useEffect(() => {
        if (message !== undefined) {
            setStoragePermisoFields(message);
            Swal.fire({
                text: `${message.msg}, ¿Deseas imprimir el permiso?`,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, imprimir!",
            }).then((result) => {
                if (result.isConfirmed) {
                    startCardPermiso(message.idper_permisos);
                    //console.log(message.idper_permisos)
                }
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                text: errores,
                showConfirmButton: true,
            });
            return;
        }
    }, [errores]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("clic");
        //console.log(form.getTransformedValues());
        Swal.fire({
            title: "¿Estas seguro?",
            text: "¿Confirmas en crear este permiso?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#20c997",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, confirmo!",
        }).then((result) => {
            if (result.isConfirmed) {
                startAddPermiso(form.getTransformedValues());
                form.setFieldValue('fecha', '');
                form.setFieldValue('hora_1', '');
                form.setFieldValue('hora_2', '');
                form.setFieldValue('per_observaciones', '');
                form.resetDirty(['fecha', 'id_jefe_inmediato', 'hora_1', 'hora_2', 'per_observaciones']);
            }
        });
    };

    useEffect(() => {
        form.setFieldValue(
            "per_fecha_salida",
            dayjs(fecha).format("YYYY-MM-DD") + " " + hora_1
        );
    }, [hora_1]);

    useEffect(() => {
        form.setFieldValue(
            "per_fecha_llegada",
            dayjs(fecha).format("YYYY-MM-DD") + " " + hora_2
        );
    }, [hora_2]);

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Select
                        withAsterisk
                        clearable
                        searchable
                        disabled={disabled}
                        label="Departamento del solicitante"
                        placeholder="Seleccione el departamento del solicitante"
                        nothingFoundMessage="Nothing found..."
                        {...form.getInputProps("id_direccion_pide")}
                        data={direcciones.map((direccion) => {
                            return {
                                label: direccion.nmbre_dprtmnto,
                                value: direccion.cdgo_dprtmnto.toString(),
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Select
                        withAsterisk
                        clearable
                        searchable
                        disabled={disabled}
                        label="Solicitante"
                        placeholder="Seleccione el usuario solicitante"
                        nothingFoundMessage="Nothing found..."
                        {...form.getInputProps("id_usu_pide")}
                        data={users.map((user) => {
                            return {
                                label: user.nmbre_usrio,
                                value: user.cdgo_usrio.toString(),
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Select
                        withAsterisk
                        searchable
                        label="Jefe inmediato"
                        placeholder="Seleccione el jefe inmediato del solicitante"
                        {...form.getInputProps("id_jefe_inmediato")}
                        nothingFoundMessage="Nothing found..."
                        data={users.map((director) => {
                            return {
                                label: director.nmbre_usrio,
                                value: director.cdgo_usrio.toString(),
                            };
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Select
                        withAsterisk
                        label="Motivo"
                        placeholder="Seleccione el motivo"
                        {...form.getInputProps("id_tipo_motivo")}
                        data={[
                            {
                                value: "1",
                                label: "PERSONAL",
                            },
                            {
                                value: "2",
                                label: "ENFERMEDAD",
                            },
                            { value: "3", label: "OFICIAL" },
                            { value: "4", label: "CAL. DOMESTICA" },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <DateInput
                        withAsterisk
                        //maxDate={dayjs(new Date()).add(1, "month").toDate()}
                        valueFormat="YYYY-MM-DD"
                        label="Fecha de la actividad"
                        placeholder="Registra la fecha"
                        {...form.getInputProps("fecha")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                    <TimeInput
                        withAsterisk
                        label="Hora desde:"
                        ref={ref_1}
                        rightSection={pickerControl_1}
                        {...form.getInputProps("hora_1")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
                    <TimeInput
                        withAsterisk
                        label="Hora hasta:"
                        ref={ref_2}
                        rightSection={pickerControl_2}
                        {...form.getInputProps("hora_2")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                    <Textarea
                        label="Observación"
                        withAsterisk
                        description="Si el permiso es personal no es necesario registrar tu observación"
                        autosize
                        minRows={6}
                        maxRows={8}
                        {...form.getInputProps("per_observaciones")}
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit
                fontSize={16}
                IconSection={IconChecks}
                //loading={isLoading}
            >
                Registrar permiso
            </BtnSubmit>
        </Box>
    );
};
