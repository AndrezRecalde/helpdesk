import {
    Box,
    Fieldset,
    Select,
    SimpleGrid,
    Text,
    TextInput,
} from "@mantine/core";
import { BtnSubmit } from "../..";
import { IconSearch } from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";
import { useDireccionStore, useUsersStore } from "../../../hooks";

export const FilterPermisoAdmin = ({
    title = "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    return (
        <Fieldset mt={20} legend={<Text>{title}</Text>}>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1 }} mt={10}>
                    <YearPickerInput
                        required
                        disabled
                        label="Año"
                        placeholder="Seleccione el año"
                        {...form.getInputProps("anio")}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 3 }} mt={10}>
                    <Select
                        searchable
                        clearable
                        label="Dirección"
                        placeholder="Elige la dirección"
                        {...form.getInputProps("id_direccion_pide")}
                        data={direcciones.map(direccion => {
                            return {
                                label: direccion.nmbre_dprtmnto,
                                value: direccion.cdgo_dprtmnto.toString()
                            }
                        })}
                    />
                    <Select
                        searchable
                        clearable
                        label="Usuario"
                        placeholder="Elige el usuario"
                        {...form.getInputProps("id_usu_pide")}
                        data={users.map(user => {
                            return {
                                label: user.nmbre_usrio,
                                value: user.cdgo_usrio.toString()
                            }
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
            </Box>
        </Fieldset>
    );
};
