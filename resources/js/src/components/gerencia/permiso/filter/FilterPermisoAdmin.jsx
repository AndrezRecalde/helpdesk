import {
    Box,
    Fieldset,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { BtnSubmit, TextSection } from "../../..";
import { IconSearch } from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";
import { useDireccionStore, useUsersStore } from "../../../../hooks";

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
                    <SimpleGrid cols={{ base: 1 }}>
                        <YearPickerInput
                            disabled
                            label="Año"
                            placeholder="Seleccione el año"
                            {...form.getInputProps("anio")}
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 3 }}>
                        <Select
                            searchable
                            clearable
                            label="Dirección"
                            placeholder="Elige la dirección"
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
                            {...form.getInputProps("idper_permisos")}
                        />
                    </SimpleGrid>
                    <BtnSubmit
                        IconSection={IconSearch}
                        heigh={40}
                        fontSize={16}
                        loading={isLoading}
                    >
                        Buscar
                    </BtnSubmit>
                </Stack>
            </Box>
        </Fieldset>
    );
};
