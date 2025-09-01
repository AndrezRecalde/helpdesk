import {
    ActionIcon,
    Box,
    Button,
    Group,
    NumberInput,
    Stack,
    Text,
} from "@mantine/core";
import { AlertSection, BtnSubmit } from "../../../components";
import { IconInfoCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { useMarcacionStore, useUiMarcacion } from "../../../hooks";

export const ReporteJustificativoForm = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startExportJustificativo } = useMarcacionStore();
    const { modalActionGenerarReporte } = useUiMarcacion();
    // Agregar fecha
    const handleAddDate = () => {
        if (form.values.fechas.length < 4) {
            form.insertListItem("fechas", null); // agregamos una fecha vacía
        }
    };

    // Eliminar fecha
    const handleRemoveDate = (index) => {
        form.removeListItem("fechas", index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formulario = {
            ...form.getTransformedValues(),
            cdgo_usrio: usuario.cdgo_usrio,
        };
        //console.log(formulario);
        startExportJustificativo(formulario);
        form.reset();
        modalActionGenerarReporte(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <AlertSection
                    variant="light"
                    color="orange"
                    icon={IconInfoCircle}
                    title="Nota"
                >
                    <strong>Importante:</strong> El justificativo de marcación
                    se genera para reportar errores en las marcaciones. Una vez
                    generado, el justificativo debe ser presentado a su
                    supervisor o al área de recursos humanos para su validación
                    y aprobación.
                </AlertSection>
                <NumberInput
                    label="Numero de MEMO"
                    description="Registra el número de MEMO de tu Gestión"
                    placeholder="Ingrese el número de MEMO"
                    allowNegative={false}
                    {...form.getInputProps("numero_memorando")}
                />
                {form.getValues().fechas.map((fecha, index) => (
                    <Group key={index} align="flex-end">
                        <DateInput
                            label={`Fecha ${index + 1}`}
                            valueFormat="YYYY-MM-DD"
                            placeholder="Seleccione una fecha"
                            value={fecha}
                            onChange={(value) =>
                                form.setFieldValue(`fechas.${index}`, value)
                            }
                            withAsterisk
                            style={{ flex: 1 }}
                        />
                        <ActionIcon
                            color="red"
                            variant="light"
                            disabled={index === 0 ? true : false}
                            onClick={() => handleRemoveDate(index)}
                        >
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Group>
                ))}

                {form.values.fechas.length < 4 && (
                    <Button
                        onClick={handleAddDate}
                        variant="light"
                        leftSection={<IconPlus size={16} />}
                    >
                        Agregar fecha
                    </Button>
                )}

                {form.errors.fechas && (
                    <Text c="red" size="sm">
                        {form.errors.fechas}
                    </Text>
                )}
                <BtnSubmit>Generar Documento</BtnSubmit>
            </Stack>
        </Box>
    );
};
