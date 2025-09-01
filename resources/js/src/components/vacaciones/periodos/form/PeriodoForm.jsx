import { useEffect, useState } from "react";
import { Box, Select, Stack, Switch, Table } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { AlertSection, BtnSubmit } from "../../../../components";
import {
    usePeriodoStore,
    useUiPeriodo,
    useUsersStore,
} from "../../../../hooks";
import { IconAlertCircle } from "@tabler/icons-react";

export const PeriodoForm = ({ form }) => {
    const { is_multiple_anio, anios } = form.getValues();
    const { users } = useUsersStore();
    const {
        startAddPeriodo,
        calcularDias,
        startClearCalculoDias,
        tableCalculoDias,
    } = usePeriodoStore();
    const { modalActionAddPeriodo } = useUiPeriodo();
    const [nombreRegimen, setNombreRegimen] = useState("");

    const handleChange = (value) => {
        // Si está permitido múltiple, aceptar todos
        if (is_multiple_anio) {
            form.setFieldValue("anios", value);
        } else {
            // Si no se permite múltiple, tomar solo el primer valor (último seleccionado)
            const ultimo = Array.isArray(value) ? value.slice(-1) : [value];
            form.setFieldValue("anios", ultimo);
        }
    };

    useEffect(() => {
        if (!is_multiple_anio) {
            form.setFieldValue("anios", []);
        }
    }, [is_multiple_anio]);

    useEffect(() => {
        if (anios && anios.length > 0) {
            const { cdgo_usrio, regimen_laboral_id } = form.getValues();
            if (cdgo_usrio && regimen_laboral_id) {
                calcularDias({ cdgo_usrio, regimen_laboral_id, anios });
            }
        }

        return () => {
            startClearCalculoDias();
        };
    }, [anios]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        startAddPeriodo(form.getTransformedValues());
        form.reset();
        setNombreRegimen("");
        modalActionAddPeriodo(false);
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
                gap="lg"
            >
                <Switch
                    size="md"
                    mb="md"
                    label="¿Agregar más de un período?"
                    {...form.getInputProps("is_multiple_anio")}
                />
                <Select
                    searchable
                    clearable
                    withAsterisk
                    label="Usuario"
                    placeholder="Seleccione el usuario"
                    //{...form.getInputProps("cdgo_usrio")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                    onChange={(selectedValue) => {
                        // Establece el valor en el formulario
                        form.setFieldValue("cdgo_usrio", selectedValue);

                        // Busca y actualiza el nombre del régimen
                        const selectedUser = users.find(
                            (user) =>
                                user.cdgo_usrio.toString() === selectedValue
                        );

                        if (selectedUser) {
                            setNombreRegimen(selectedUser.nombre_regimen || "");
                            form.setFieldValue(
                                "regimen_laboral_id",
                                selectedUser.regimen_laboral_id || null
                            );
                        } else {
                            setNombreRegimen("");
                            form.setFieldValue("regimen_laboral_id", null);
                        }
                    }}
                />
                <YearPickerInput
                    clearable
                    label="Año"
                    placeholder="Seleccione el año"
                    type="multiple"
                    {...form.getInputProps("anios")}
                    onChange={handleChange}
                />
                {nombreRegimen && (
                    <AlertSection
                        mt={0}
                        mb={0}
                        variant="light"
                        color="blue.7"
                        title="Información"
                        icon={IconAlertCircle}
                    >
                        Régimen laboral: <strong>{nombreRegimen}</strong>
                        <br />
                        {["LOSEP", "ELECCION POPULAR"].includes(
                            nombreRegimen.toUpperCase()
                        ) ? (
                            <>
                                Por su régimen laboral se asignarán{" "}
                                <strong>30 días</strong> disponibles por
                                periodo.
                            </>
                        ) : nombreRegimen.toUpperCase() ===
                          "CODIGO DE TRABAJO" ? (
                            <>
                                Por su régimen laboral se asignarán{" "}
                                <strong>15 días</strong> disponibles por
                                periodo.
                            </>
                        ) : (
                            <>
                                Este régimen laboral no tiene asignación
                                automática de días.
                            </>
                        )}
                    </AlertSection>
                )}
                {tableCalculoDias?.length > 0 ? (
                    <Table striped withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Año</Table.Th>
                                <Table.Th>Días Asignados</Table.Th>
                                <Table.Th>Días Total</Table.Th>
                                <Table.Th>Observacion</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {tableCalculoDias.map((row) => (
                                <Table.Tr key={row?.anio}>
                                    <Table.Td>{new Date(row?.anio).getFullYear()}</Table.Td>
                                    <Table.Td>{row?.dias_total}</Table.Td>
                                    <Table.Td>{row?.dias_total}</Table.Td>
                                    <Table.Td>{row?.observacion}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                ) : null}
                <BtnSubmit>Guardar Periodo</BtnSubmit>
            </Stack>
        </Box>
    );
};
