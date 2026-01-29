import {
    Box,
    Chip,
    Fieldset,
    Group,
    Select,
    SimpleGrid,
    Switch,
    TextInput,
} from "@mantine/core";
import { BtnSubmit, TextSection } from "../../..";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import {
    useDireccionStore,
    useEstadoStore,
    useSoporteStore,
    useStorageField,
} from "../../../../hooks";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";
import dayjs from "dayjs";

export const FilterFormSoportes = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isLoading, startSearchSoporte } = useSoporteStore();
    const { direcciones } = useDireccionStore();
    const { estados } = useEstadoStore();
    const { setStorageFields } = useStorageField();

    const { switch_role, fecha_inicio } = form.values;

    // Calcular la fecha máxima para fecha_fin (último día del año de fecha_inicio)
    const getMaxDateFin = () => {
        if (!fecha_inicio) return null;
        const anioInicio = dayjs(fecha_inicio).year();
        return dayjs(`${anioInicio}-12-31`).toDate();
    };

    // Calcular la fecha mínima para fecha_fin (igual a fecha_inicio)
    const getMinDateFin = () => {
        if (!fecha_inicio) return null;
        return dayjs(fecha_inicio).toDate();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (switch_role) {
            const { id_usu_tecnico_asig, ...values } =
                form.getTransformedValues();
            startSearchSoporte(values);
            setStorageFields(values);
        } else {
            startSearchSoporte(form.getTransformedValues());
            setStorageFields(form.getTransformedValues());
        }
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fz={16} fw={500}>
                    Filtrar Soportes
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Group justify="space-between" spacing="md">
                    <Group>
                        <Chip.Group
                            multiple
                            value={form.values.id_estado}
                            onChange={(values) =>
                                form.setFieldValue("id_estado", values)
                            }
                        >
                            {estados.map((estado) => (
                                <Chip
                                    key={estado.id_estado_caso}
                                    value={estado.id_estado_caso.toString()}
                                    variant="light"
                                    size="sm"
                                >
                                    {estado.nombre}
                                </Chip>
                            ))}
                        </Chip.Group>
                    </Group>
                    <Group>
                        <YearPickerInput
                            required
                            placeholder="Seleccione el año"
                            {...form.getInputProps("anio")}
                        />
                        <Switch
                            size="xl"
                            onLabel="G"
                            offLabel="T"
                            disabled={usuario?.role_id == 2 ? true : false}
                            {...form.getInputProps("switch_role")}
                        />
                    </Group>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Desde"
                        placeholder="Seleccione fecha inicio"
                        classNames={classes}
                        {...form.getInputProps("fecha_inicio")}
                        onChange={(value) => {
                            form.setFieldValue("fecha_inicio", value);
                            // Limpiar fecha_fin si está fuera del rango permitido
                            if (form.values.fecha_fin && value) {
                                const anioInicio = dayjs(value).year();
                                const anioFin = dayjs(
                                    form.values.fecha_fin,
                                ).year();

                                // Si fecha_fin es de otro año o es anterior a la nueva fecha_inicio, limpiarla
                                if (
                                    anioInicio !== anioFin ||
                                    dayjs(form.values.fecha_fin).isBefore(
                                        dayjs(value),
                                    )
                                ) {
                                    form.setFieldValue("fecha_fin", null);
                                }
                            }
                        }}
                    />
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Hasta"
                        placeholder="Seleccione fecha final"
                        classNames={classes}
                        {...form.getInputProps("fecha_fin")}
                        minDate={getMinDateFin()}
                        maxDate={getMaxDateFin()}
                        disabled={!fecha_inicio}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={10}>
                    <Select
                        clearable
                        searchable
                        label="Dirección"
                        placeholder="Elige la dirección"
                        classNames={classes}
                        {...form.getInputProps("id_direccion")}
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                    <TextInput
                        label="Número de soporte"
                        classNames={classes}
                        {...form.getInputProps("numero_sop")}
                        placeholder="Filtrar por soporte"
                    />
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
