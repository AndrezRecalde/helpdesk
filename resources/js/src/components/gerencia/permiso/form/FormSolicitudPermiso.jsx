import { useEffect, useRef, useMemo, useCallback } from "react";
import {
    ActionIcon,
    Box,
    LoadingOverlay,
    Select,
    SimpleGrid,
    Stack,
    Textarea,
    rem,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { BtnSubmit } from "../../..";
import {
    useDireccionStore,
    usePermisoStore,
    useUsersStore,
} from "../../../../hooks";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FormSolicitudPermiso = ({ form, disabled }) => {
    const { hora_1, hora_2, fecha, id_tipo_motivo } = form.values;
    const ref_1 = useRef(null);
    const ref_2 = useRef(null);

    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { isLoading, startAddPermiso } = usePermisoStore();

    // Memoizar las opciones de motivos
    const motivosOptions = useMemo(
        () => [
            { value: "1", label: "PERSONAL" },
            { value: "2", label: "ENFERMEDAD" },
            { value: "3", label: "OFICIAL" },
            { value: "4", label: "CAL. DOMÉSTICA" },
        ],
        []
    );

    // Memoizar las direcciones transformadas
    const direccionesData = useMemo(
        () =>
            direcciones.map((direccion) => ({
                label: direccion.nmbre_dprtmnto,
                value: direccion.cdgo_dprtmnto.toString(),
            })),
        [direcciones]
    );

    // Memoizar los usuarios transformados
    const usersData = useMemo(
        () =>
            users.map((user) => ({
                label: user.nmbre_usrio,
                value: user.cdgo_usrio.toString(),
            })),
        [users]
    );

    // Memoizar las fechas mínima y máxima
    const dateRange = useMemo(
        () => ({
            minDate: dayjs(new Date()).add(-12, "day").toDate(),
            maxDate: dayjs(new Date()).add(1, "month").toDate(),
        }),
        []
    );

    // Determinar si las observaciones son obligatorias
    const isObservacionRequired = useMemo(
        () => Number(id_tipo_motivo) === 3,
        [id_tipo_motivo]
    );

    // Descripción dinámica del campo de observaciones
    const observacionDescription = useMemo(() => {
        if (isObservacionRequired) {
            return "⚠️ Las observaciones son OBLIGATORIAS para permisos de tipo OFICIAL";
        }
        return "Si el permiso es PERSONAL no es necesario registrar tu observación";
    }, [isObservacionRequired]);

    // Memoizar los controles de los time pickers
    const pickerControl_1 = useMemo(
        () => (
            <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => ref_1.current?.showPicker()}
                aria-label="Seleccionar hora de inicio"
            >
                <IconClock
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                />
            </ActionIcon>
        ),
        []
    );

    const pickerControl_2 = useMemo(
        () => (
            <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => ref_2.current?.showPicker()}
                aria-label="Seleccionar hora de fin"
            >
                <IconClock
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                />
            </ActionIcon>
        ),
        []
    );

    // Actualizar fecha de salida cuando cambia hora_1
    useEffect(() => {
        if (fecha && hora_1) {
            const fechaSalida = `${dayjs(fecha).format(
                "YYYY-MM-DD"
            )} ${hora_1}`;
            form.setFieldValue("per_fecha_salida", fechaSalida);
        }
    }, [hora_1, fecha]);

    // Actualizar fecha de llegada cuando cambia hora_2
    useEffect(() => {
        if (fecha && hora_2) {
            const fechaLlegada = `${dayjs(fecha).format(
                "YYYY-MM-DD"
            )} ${hora_2}`;
            form.setFieldValue("per_fecha_llegada", fechaLlegada);
        }
    }, [hora_2, fecha]);

    // Limpiar observaciones si cambia de tipo de motivo y no es obligatorio
    /* useEffect(() => {
        const tipoMotivo = Number(id_tipo_motivo);
        // Si cambia a un tipo que NO requiere observaciones y hay texto, advertir
        if (tipoMotivo !== 3 && form.values.per_observaciones) {
            // Opcional: podrías limpiar automáticamente o solo dejar el campo
            // form.setFieldValue("per_observaciones", "");
        }
    }, [id_tipo_motivo]); */

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Confirmas la creación de este permiso?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#20c997",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, confirmar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    const transformedValues = form.getTransformedValues();
                    startAddPermiso(transformedValues);

                    // Resetear campos después de enviar
                    form.setValues({
                        ...form.values,
                        fecha: new Date(),
                        hora_1: "",
                        hora_2: "",
                        per_observaciones: "",
                    });

                    form.resetDirty([
                        "fecha",
                        "id_jefe_inmediato",
                        "hora_1",
                        "hora_2",
                        "per_observaciones",
                    ]);
                }
            });
        },
        [form, startAddPermiso]
    );

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

            <Stack align="stretch" justify="center" gap="md">
                <Select
                    withAsterisk
                    clearable
                    searchable
                    disabled={disabled}
                    label="Departamento del solicitante"
                    placeholder="Seleccione el departamento del solicitante"
                    nothingFoundMessage="No se encontraron resultados"
                    classNames={classes}
                    {...form.getInputProps("id_direccion_pide")}
                    data={direccionesData}
                />

                <Select
                    withAsterisk
                    clearable
                    searchable
                    disabled={disabled}
                    label="Solicitante"
                    placeholder="Seleccione el usuario solicitante"
                    nothingFoundMessage="No se encontraron resultados"
                    classNames={classes}
                    {...form.getInputProps("id_usu_pide")}
                    data={usersData}
                />

                <Select
                    withAsterisk
                    searchable
                    clearable
                    label="Jefe inmediato"
                    placeholder="Seleccione el jefe inmediato del solicitante"
                    nothingFoundMessage="No se encontraron resultados"
                    classNames={classes}
                    {...form.getInputProps("id_jefe_inmediato")}
                    data={usersData}
                />

                <Select
                    withAsterisk
                    label="Motivo"
                    placeholder="Seleccione el motivo"
                    classNames={classes}
                    {...form.getInputProps("id_tipo_motivo")}
                    data={motivosOptions}
                />

                <DateInput
                    withAsterisk
                    classNames={classes}
                    minDate={dateRange.minDate}
                    maxDate={dateRange.maxDate}
                    valueFormat="YYYY-MM-DD"
                    label="Fecha del permiso"
                    placeholder="Registra la fecha"
                    {...form.getInputProps("fecha")}
                />

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <TimeInput
                        withAsterisk
                        label="Hora desde:"
                        ref={ref_1}
                        rightSection={pickerControl_1}
                        classNames={classes}
                        {...form.getInputProps("hora_1")}
                    />
                    <TimeInput
                        withAsterisk
                        label="Hora hasta:"
                        ref={ref_2}
                        rightSection={pickerControl_2}
                        classNames={classes}
                        {...form.getInputProps("hora_2")}
                    />
                </SimpleGrid>

                <Textarea
                    withAsterisk={isObservacionRequired}
                    label={`Observación (350 caracteres MAX)${
                        isObservacionRequired ? " *" : ""
                    }`}
                    description={observacionDescription}
                    placeholder={
                        isObservacionRequired
                            ? "Escriba las observaciones del permiso oficial..."
                            : "Observaciones adicionales (opcional)"
                    }
                    autosize
                    minRows={5}
                    maxRows={8}
                    {...form.getInputProps("per_observaciones")}
                />

                <BtnSubmit>Registrar permiso</BtnSubmit>
            </Stack>
        </Box>
    );
};
