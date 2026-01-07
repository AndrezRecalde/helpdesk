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
    Table,
    Badge,
    Text,
    Loader,
    Center,
    Alert,
    NumberInput,
} from "@mantine/core";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { BtnSubmit } from "../../../components";
import {
    IconRotateClockwise,
    IconSearch,
    IconAlertCircle,
    IconFileDescription,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import classes from "../../../assets/styles/modules/layout/input/LabelsInputs.module.css";
import { useRutaStore } from "../../../hooks";

const BusquedaTramiteRutaPage = () => {
    const {
        isLoadingIngreso,
        ingreso: fichas,
        startBuscarFichasIngresos,
    } = useRutaStore();

    // Obtener datos del store de Redux

    const form = useForm({
        initialValues: {
            anio: new Date(), // Año actual por defecto
            numero_ruta: "",
            filtrar_otros_campos: false,
            numero_oficio: "",
            fechaElabInicio: null,
            fechaElabFin: null,
            fechaRecInicio: null,
            fechaRecFin: null,
            remitente: "",
            asunto: "",
        },

        validate: {
            // Validar que si hay numero_ruta, también haya año
            numero_ruta: (value, values) => {
                if (value && !values.anio && !values.filtrar_otros_campos) {
                    return "El año es requerido cuando se ingresa el número de ruta";
                }
                return null;
            },
            // Validar que si hay año, también haya numero_ruta
            anio: (value, values) => {
                if (
                    value &&
                    !values.numero_ruta &&
                    !values.filtrar_otros_campos
                ) {
                    return "El número de ruta es requerido cuando se ingresa el año";
                }
                return null;
            },
            // Validar fechas de elaboración
            fechaElabFin: (value, values) =>
                value &&
                values.fechaElabInicio &&
                dayjs(value).isBefore(dayjs(values.fechaElabInicio))
                    ? "La fecha final no puede ser menor a la inicial"
                    : null,
            // Validar fechas de recepción
            fechaRecFin: (value, values) =>
                value &&
                values.fechaRecInicio &&
                dayjs(value).isBefore(dayjs(values.fechaRecInicio))
                    ? "La fecha final no puede ser menor a la inicial"
                    : null,
        },
    });

    const { filtrar_otros_campos } = form.values;

    const handleBuscar = async (values) => {
        // Preparar datos para enviar al backend
        const formData = {};

        if (values.filtrar_otros_campos) {
            // Búsqueda por otros campos
            if (values.numero_oficio)
                formData.numero_oficio = values.numero_oficio;
            if (values.fechaElabInicio) {
                formData.fechaElabInicio = dayjs(values.fechaElabInicio).format(
                    "YYYY-MM-DD"
                );
            }
            if (values.fechaElabFin) {
                formData.fechaElabFin = dayjs(values.fechaElabFin).format(
                    "YYYY-MM-DD"
                );
            }
            if (values.fechaRecInicio) {
                formData.fechaRecInicio = dayjs(values.fechaRecInicio).format(
                    "YYYY-MM-DD"
                );
            }
            if (values.fechaRecFin) {
                formData.fechaRecFin = dayjs(values.fechaRecFin).format(
                    "YYYY-MM-DD"
                );
            }
            if (values.remitente) formData.remitente = values.remitente;
            if (values.asunto) formData.asunto = values.asunto;
        } else {
            // Búsqueda por año y número de ruta
            if (values.anio && values.numero_ruta) {
                formData.anio = dayjs(values.anio).year();
                formData.numero_ruta = parseInt(values.numero_ruta, 10);
            }
        }

        // Validar que haya al menos un criterio de búsqueda
        if (Object.keys(formData).length === 0) {
            form.setErrors({
                numero_ruta: "Debe ingresar al menos un criterio de búsqueda",
            });
            return;
        }

        // Llamar a la función del store
        await startBuscarFichasIngresos(formData);
    };

    const handleLimpiar = () => {
        form.reset();
    };

    // Función para formatear fechas
    const formatDate = (date) => {
        return date ? dayjs(date).format("DD/MM/YYYY") : "N/A";
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
                            onClick={handleLimpiar}
                            title="Limpiar filtros"
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
                                        maxDate={new Date()} // No permitir años futuros
                                        minDate={new Date(2000, 0, 1)} // Desde año 2000
                                        {...form.getInputProps("anio")}
                                        disabled={filtrar_otros_campos}
                                    />
                                    <NumberInput
                                        label="Número Ruta"
                                        placeholder="Ej: 12345"
                                        classNames={classes}
                                        min={1}
                                        max={999999}
                                        allowNegative={false}
                                        allowDecimal={false}
                                        hideControls={true} // ✅ Oculta botones +/-
                                        {...form.getInputProps("numero_ruta")}
                                        disabled={filtrar_otros_campos}
                                    />
                                </Stack>
                            </Fieldset>

                            <Switch
                                label="Filtrar por otros campos"
                                description="Active para buscar por oficio, fechas, remitente, etc."
                                {...form.getInputProps("filtrar_otros_campos", {
                                    type: "checkbox",
                                })}
                            />

                            <TextInput
                                label="Número Oficio"
                                placeholder="Ej: OF-6789"
                                classNames={classes}
                                {...form.getInputProps("numero_oficio")}
                                disabled={!filtrar_otros_campos}
                            />

                            <Fieldset legend="Fecha de Elaboración">
                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                                    <DateInput
                                        clearable
                                        label="Fecha Inicio"
                                        classNames={classes}
                                        maxDate={new Date()}
                                        {...form.getInputProps(
                                            "fechaElabInicio"
                                        )}
                                        disabled={!filtrar_otros_campos}
                                    />
                                    <DateInput
                                        clearable
                                        label="Fecha Fin"
                                        classNames={classes}
                                        maxDate={new Date()}
                                        {...form.getInputProps("fechaElabFin")}
                                        disabled={!filtrar_otros_campos}
                                    />
                                </SimpleGrid>
                            </Fieldset>

                            <Fieldset legend="Fecha de Recepción">
                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
                                    <DateInput
                                        clearable
                                        label="Fecha Inicio"
                                        classNames={classes}
                                        maxDate={new Date()}
                                        {...form.getInputProps(
                                            "fechaRecInicio"
                                        )}
                                        disabled={!filtrar_otros_campos}
                                    />
                                    <DateInput
                                        clearable
                                        label="Fecha Fin"
                                        classNames={classes}
                                        maxDate={new Date()}
                                        {...form.getInputProps("fechaRecFin")}
                                        disabled={!filtrar_otros_campos}
                                    />
                                </SimpleGrid>
                            </Fieldset>

                            <TextInput
                                label="Remitente"
                                placeholder="Ej: Juan Pérez"
                                classNames={classes}
                                {...form.getInputProps("remitente")}
                                disabled={!filtrar_otros_campos}
                            />

                            <TextInput
                                label="Asunto"
                                placeholder="Ej: Solicitud de información"
                                classNames={classes}
                                {...form.getInputProps("asunto")}
                                disabled={!filtrar_otros_campos}
                            />

                            <BtnSubmit
                                IconSection={IconSearch}
                                loading={isLoadingIngreso}
                            >
                                Buscar Trámite
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

                    {/* Estado de carga */}
                    {isLoadingIngreso && (
                        <Center py="xl">
                            <Stack align="center" gap="md">
                                <Loader size="lg" />
                                <Text size="sm" c="dimmed">
                                    Buscando trámites...
                                </Text>
                            </Stack>
                        </Center>
                    )}

                    {/* Sin resultados */}
                    {!isLoadingIngreso && fichas && fichas.length === 0 && (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Sin resultados"
                            color="blue"
                        >
                            No se encontraron trámites con los criterios
                            especificados. Intente con otros filtros.
                        </Alert>
                    )}

                    {/* Tabla de resultados */}
                    {!isLoadingIngreso && fichas && fichas.length > 0 && (
                        <>
                            <Text size="sm" c="dimmed" mb="md">
                                Se encontraron {fichas.length} trámite(s)
                            </Text>
                            <Table striped highlightOnHover withTableBorder>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>N° Ruta</Table.Th>
                                        <Table.Th>N° Oficio</Table.Th>
                                        <Table.Th>Fecha Recepción</Table.Th>
                                        <Table.Th>Remitente</Table.Th>
                                        <Table.Th>Estado</Table.Th>
                                        <Table.Th>Despachos</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {fichas.map((ficha, index) => (
                                        <Table.Tr key={index}>
                                            <Table.Td>
                                                <Group gap="xs">
                                                    <IconFileDescription
                                                        size={16}
                                                    />
                                                    <Text size="sm" fw={500}>
                                                        {ficha.cnsctvo_rta}
                                                    </Text>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm">
                                                    {ficha.numero_oficio ||
                                                        "N/A"}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm">
                                                    {formatDate(
                                                        ficha.fecha_recepcion
                                                    )}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" lineClamp={1}>
                                                    {ficha.remitente}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge
                                                    color={
                                                        ficha.detalle_largo ===
                                                        "En proceso"
                                                            ? "blue"
                                                            : "green"
                                                    }
                                                    variant="light"
                                                >
                                                    {ficha.detalle_largo}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge
                                                    color="gray"
                                                    variant="filled"
                                                >
                                                    {ficha.total_despachos}
                                                </Badge>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </>
                    )}

                    {/* Estado inicial (sin búsqueda aún) */}
                    {!isLoadingIngreso && !fichas && (
                        <Center py="xl">
                            <Stack align="center" gap="md">
                                <IconSearch size={48} color="gray" />
                                <Text size="sm" c="dimmed" ta="center">
                                    Utilice los filtros de la izquierda para
                                    buscar trámites
                                </Text>
                            </Stack>
                        </Center>
                    )}
                </Card>
            </Grid.Col>
        </Grid>
    );
};

export default BusquedaTramiteRutaPage;
