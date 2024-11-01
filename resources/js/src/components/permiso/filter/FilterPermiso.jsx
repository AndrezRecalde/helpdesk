import { Box, Fieldset, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../components";
import { IconSearch } from "@tabler/icons-react";

export const FilterPermiso = ({
    title = "",
    form,
    handleSubmit,
    isLoading = false,
}) => {
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
                    <TextInput
                        label="Número de permiso"
                        placeholder="Digita el número de soporte"
                        {...form.getInputProps("idper_permisos")}
                    />
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
