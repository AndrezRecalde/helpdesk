import { Box, Fieldset, SimpleGrid, Text, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconSearch } from "@tabler/icons-react";

export const FilterPermiso = ({
    title = "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
    return (
        <Fieldset mt={20} legend={<Text>{title}</Text>}>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1 }} mt={10}>
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
