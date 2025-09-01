import {
    Box,
    Fieldset,
    Group,
    SimpleGrid,
    Stack,
    Switch,
    TextInput,
} from "@mantine/core";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { BtnSubmit, TextSection } from "../../../../components";
import { useStorageField, useVacacionesStore } from "../../../../hooks";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";
import { Roles } from "../../../../helpers/dictionary";

export const FilterVacacionesForm = ({ usuario }) => {
    const { isLoading, startLoadSolicitudesVacaciones } = useVacacionesStore();
    const { setStorageFields } = useStorageField();

    const form = useForm({
        initialValues: {
            switch_role: false,
            anio: new Date(),
            fecha_inicio: null,
            fecha_fin: null,
            codigo: "",
        },
        validate: {
            anio: (value) => (value ? null : "Por favor ingresar el año"),
        },
        transformValues: (values) => ({
            ...values,
            anio: values.anio.getFullYear(),
            fecha_inicio: values.fecha_inicio
                ? dayjs(values.fecha_inicio).format("YYYY-MM-DD")
                : null,
            fecha_fin: values.fecha_fin
                ? dayjs(values.fecha_fin).format("YYYY-MM-DD")
                : null,
        }),
    });

    const { switch_role } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (switch_role) {
            //console.log(form.getTransformedValues());
            startLoadSolicitudesVacaciones(form.getTransformedValues());
            setStorageFields(form.getTransformedValues());
        } else {
            //console.log(form.getTransformedValues());
            startLoadSolicitudesVacaciones({
                ...form.getTransformedValues(),
                cdgo_usrio: JSON.parse(localStorage.getItem("service_user"))
                    .cdgo_usrio,
            });
            setStorageFields({
                ...form.getTransformedValues(),
                cdgo_usrio: JSON.parse(localStorage.getItem("service_user"))
                    .cdgo_usrio,
            });
        }
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={500} fz={16}>
                    Filtrar Solicitudes
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                {usuario.role === Roles.NOM_VACACIONES && (
                    <Group justify="flex-end" mb={10}>
                        <Switch
                            size="xl"
                            onLabel="G"
                            offLabel="U"
                            disabled={false}
                            {...form.getInputProps("switch_role")}
                        />
                    </Group>
                )}
                <Stack
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="center"
                    gap="md"
                >
                    <SimpleGrid cols={{ base: 1, sm: 1, md: 4, lg: 4 }}>
                        <YearPickerInput
                            label="Año"
                            placeholder="Seleccione el año"
                            classNames={classes}
                            {...form.getInputProps("anio")}
                        />
                        <TextInput
                            label="Codigo"
                            placeholder="Digite el codigo"
                            classNames={classes}
                            {...form.getInputProps("codigo")}
                        />
                        <DateInput
                            label="Fecha de Inicio"
                            placeholder="Seleccione la fecha de inicio"
                            classNames={classes}
                            {...form.getInputProps("fecha_inicio")}
                        />
                        <DateInput
                            label="Fecha de Fin"
                            placeholder="Seleccione la fecha de fin"
                            classNames={classes}
                            {...form.getInputProps("fecha_fin")}
                        />
                    </SimpleGrid>
                    <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                        Buscar
                    </BtnSubmit>
                </Stack>
            </Box>
        </Fieldset>
    );
};
