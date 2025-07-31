import {
    Box,
    Fieldset,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { BtnSubmit, TextSection } from "../../../../components";
import { useDireccionStore, useUsersStore } from "../../../../hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FilterPermisoAdmin = ({
    title = "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={500} fz={16}>
                    {title}
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Stack
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="center"
                    gap="md"
                >
                    <SimpleGrid cols={{ base: 1, sm: 1, md: 3, lg: 3 }}>
                        <YearPickerInput
                            //disabled
                            label="Año"
                            placeholder="Seleccione el año"
                            classNames={classes}
                            {...form.getInputProps("anio")}
                        />
                        <DateInput
                            clearable
                            valueFormat="YYYY-MM-DD"
                            label="Desde"
                            placeholder="Seleccione fecha inicio"
                            classNames={classes}
                            {...form.getInputProps("fecha_inicio")}
                        />
                        <DateInput
                            clearable
                            valueFormat="YYYY-MM-DD"
                            label="Hasta"
                            placeholder="Seleccione fecha final"
                            classNames={classes}
                            {...form.getInputProps("fecha_fin")}
                        />
                        <Select
                            searchable
                            clearable
                            label="Dirección"
                            placeholder="Elige la dirección"
                            classNames={classes}
                            {...form.getInputProps("id_direccion_pide")}
                            data={direcciones.map((direccion) => {
                                return {
                                    label: direccion.nmbre_dprtmnto,
                                    value: direccion.cdgo_dprtmnto.toString(),
                                };
                            })}
                        />
                        <Select
                            searchable
                            clearable
                            label="Usuario"
                            placeholder="Elige el usuario"
                            classNames={classes}
                            {...form.getInputProps("id_usu_pide")}
                            data={users.map((user) => {
                                return {
                                    label: user.nmbre_usrio,
                                    value: user.cdgo_usrio.toString(),
                                };
                            })}
                        />
                        <TextInput
                            label="Número de permiso"
                            placeholder="Digita el número de soporte"
                            classNames={classes}
                            {...form.getInputProps("idper_permisos")}
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
