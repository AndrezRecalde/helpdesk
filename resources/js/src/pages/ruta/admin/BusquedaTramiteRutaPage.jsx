import {
    Card,
    Paper,
    TextInput,
    Grid,
    Stack,
    Group,
    Title,
    Fieldset,
    SimpleGrid,
    ActionIcon,
    Switch,
} from "@mantine/core";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { BtnSubmit } from "../../../components";
import { IconRotateClockwise, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import classes from "../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

const BusquedaTramiteRutaPage = () => {
    const form = useForm({
        initialValues: {
            anio: null,
            numero_ruta: "",
            numero_oficio: "",
            fechaElabInicio: null,
            fechaElabFin: null,
            fechaRecInicio: null,
            fechaRecFin: null,
            remitente: "",
            asunto: "",
        },

        validate: {
            fechaElabFin: (value, values) =>
                value &&
                values.fechaElabInicio &&
                value < values.fechaElabInicio
                    ? "La fecha final no puede ser menor a la inicial"
                    : null,
            fechaRecFin: (value, values) =>
                value && values.fechaRecInicio && value < values.fechaRecInicio
                    ? "La fecha final no puede ser menor a la inicial"
                    : null,
        },
    });

    const handleBuscar = (values) => {
        // Validar que al menos un filtro esté lleno
        const algunFiltroLleno = Object.values(values).some(
            (val) => val !== "" && val !== null
        );

        if (!algunFiltroLleno) {
            form.setErrors({
                numero_ruta: "Debe ingresar al menos un filtro",
            });
            return;
        }

        console.log("Filtros aplicados:", values);
        // Aquí podrías hacer la llamada a la API o filtrar datos
    };

    return (
        <Grid gutter="lg">
            {/* Columna filtros */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper shadow="sm" p="md" radius="sm" withBorder>
                    <Group justify="space-between">
                        <Title order={4} mb="md">
                            Filtros de búsqueda
                        </Title>
                        <ActionIcon
                            variant="transparent"
                            aria-label="Limpiar-filtros"
                            size={40}
                        >
                            <IconRotateClockwise size={22} color="gray" />
                        </ActionIcon>
                    </Group>

                    <form onSubmit={form.onSubmit(handleBuscar)}>
                        <Stack gap="md">
                            <Fieldset legend="Filtrar por Número de Ruta">
                                <Stack>
                                    <YearPickerInput
                                        clearable
                                        label="Año de la Ruta - Trámite"
                                        placeholder="Seleccione el año"
                                        classNames={classes}
                                        value={new Date()}
                                        {...form.getInputProps("anio")}
                                    />
                                    <TextInput
                                        label="Número Ruta"
                                        placeholder="Ej: 12345"
                                        classNames={classes}
                                        {...form.getInputProps("numero_ruta")}
                                    />
                                </Stack>
                            </Fieldset>
                            <Switch
                                label="Filtrar por otros campos"
                            />

                            <TextInput
                                label="Número Oficio"
                                placeholder="Ej: OF-6789"
                                classNames={classes}
                                {...form.getInputProps("numero_oficio")}
                            />

                            <Fieldset legend="Fecha de Elaboración">
                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                                    <DateInput
                                        clearable
                                        label="Fecha Inicio"
                                        classNames={classes}
                                        {...form.getInputProps(
                                            "fechaElabInicio"
                                        )}
                                    />
                                    <DateInput
                                        clearable
                                        label=" Fecha Fin"
                                        classNames={classes}
                                        {...form.getInputProps("fechaElabFin")}
                                    />
                                </SimpleGrid>
                            </Fieldset>

                            <Fieldset legend="Fecha de Recepción">
                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                                    <DateInput
                                        clearable
                                        label="Fecha Inicio"
                                        classNames={classes}
                                        {...form.getInputProps(
                                            "fechaRecInicio"
                                        )}
                                    />
                                    <DateInput
                                        clearable
                                        label="Fecha Fin"
                                        classNames={classes}
                                        {...form.getInputProps("fechaRecFin")}
                                    />
                                </SimpleGrid>
                            </Fieldset>

                            <TextInput
                                label="Remitente"
                                placeholder="Ej: Juan Pérez"
                                classNames={classes}
                                {...form.getInputProps("remitente")}
                            />
                            <TextInput
                                label="Asunto"
                                placeholder="Ej: Solicitud de información"
                                classNames={classes}
                                {...form.getInputProps("asunto")}
                            />

                            <BtnSubmit IconSection={IconSearch}>
                                Buscar
                            </BtnSubmit>
                        </Stack>
                    </form>
                </Paper>
            </Grid.Col>

            {/* Columna resultados */}
            <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" p="lg" radius="sm" withBorder>
                    <Title order={4} mb="md">
                        Resultado de la búsqueda
                    </Title>
                    <p>Aquí se mostrarán los resultados filtrados...</p>
                </Card>
            </Grid.Col>
        </Grid>
    );
};

export default BusquedaTramiteRutaPage;
