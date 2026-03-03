import { useEffect } from "react";
import {
    Box,
    Checkbox,
    SimpleGrid,
    Stack,
    TextInput,
    ActionIcon,
    Group,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, isNotEmpty } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { BtnSection, BtnSubmit } from "../../../components";
import { useContratoStore, useUiContrato } from "../../../hooks";
import classess from "../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FormContrato = () => {
    const { activeContrato, startCreateContrato, startUpdateContrato } =
        useContratoStore();

    const { modalActionContrato } = useUiContrato();

    const form = useForm({
        initialValues: {
            id_contrato: null,
            codigo_contrato: "",
            activo: false,
            licencias: [
                { nombre: "Microsoft Office 365", fecha_vencimiento: null },
                { nombre: "Antivirus", fecha_vencimiento: null },
            ],
        },
        validate: {
            codigo_contrato: isNotEmpty("El código de contrato es requerido"),
            licencias: {
                nombre: isNotEmpty("Requerido"),
                fecha_vencimiento: isNotEmpty("Requerida"),
            },
        },
    });

    useEffect(() => {
        if (activeContrato !== null) {
            form.setValues({
                id_contrato: activeContrato.id_contrato,
                codigo_contrato: activeContrato.codigo_contrato,
                activo:
                    activeContrato.activo === 1 ||
                    activeContrato.activo === true,
                licencias: activeContrato.licencias.map((lic) => ({
                    nombre: lic.nombre,
                    fecha_vencimiento: lic.fecha_vencimiento
                        ? new Date(lic.fecha_vencimiento)
                        : null,
                })),
            });
        }
    }, [activeContrato]);

    const handleSubmit = async (values) => {
        const formattedValues = {
            ...values,
            licencias: values.licencias.map((lic) => ({
                ...lic,
                fecha_vencimiento: lic.fecha_vencimiento
                    .toISOString()
                    .split("T")[0],
            })),
        };

        if (activeContrato !== null) {
            await startUpdateContrato(formattedValues);
        } else {
            await startCreateContrato(formattedValues);
        }
        modalActionContrato(0);
        form.reset();
    };

    const addLicencia = () => {
        form.insertListItem("licencias", {
            nombre: "",
            fecha_vencimiento: null,
        });
    };

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="sm">
                <SimpleGrid cols={1}>
                    <TextInput
                        label="Código Contrato"
                        withAsterisk
                        placeholder="Ej. CONTRATO-MAX-001"
                        {...form.getInputProps("codigo_contrato")}
                        classNames={classess}
                    />
                    <Checkbox
                        label="Marcar como Activo (Opcional)"
                        color="teal"
                        {...form.getInputProps("activo", {
                            type: "checkbox",
                        })}
                    />
                </SimpleGrid>

                <Box mt="md">
                    <Group justify="space-between" mb="sm">
                        <div style={{ fontWeight: 600 }}>
                            Licencias del Contrato
                        </div>
                        <BtnSection
                            handleAction={addLicencia}
                            IconSection={IconPlus}
                            heigh={30}
                            fontSize={12}
                        >
                            Agregar Otra
                        </BtnSection>
                    </Group>

                    {form.values.licencias.map((item, index) => (
                        <Group key={index} mt="xs" align="flex-start">
                            <TextInput
                                style={{ flex: 1 }}
                                label="Nombre de Licencia"
                                {...form.getInputProps(
                                    `licencias.${index}.nombre`,
                                )}
                                classNames={classess}
                            />
                            <DateInput
                                style={{ flex: 1 }}
                                label="Fecha Vencimiento"
                                valueFormat="DD/MM/YYYY"
                                clearable
                                {...form.getInputProps(
                                    `licencias.${index}.fecha_vencimiento`,
                                )}
                                classNames={classess}
                            />
                            <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() =>
                                    form.removeListItem("licencias", index)
                                }
                                mt={4}
                            >
                                <IconTrash size={18} />
                            </ActionIcon>
                        </Group>
                    ))}
                    {form.errors.licencias && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "5px",
                            }}
                        >
                            {typeof form.errors.licencias === "string"
                                ? form.errors.licencias
                                : "Hay errores en las licencias"}
                        </div>
                    )}
                </Box>

                <BtnSubmit>
                    {activeContrato ? "ACTUALIZAR CONTRATO" : "CREAR CONTRATO"}
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
