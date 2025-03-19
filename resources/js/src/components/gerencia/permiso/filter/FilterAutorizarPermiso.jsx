import { Box, Fieldset, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { IconSearch } from "@tabler/icons-react";

export const FilterAutorizarPermiso = () => {
    return (
        <Fieldset legend="Filtrar Permiso">
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
                        label="Número de Permiso"
                        placeholder="Ingrese el numero de permiso"
                    />
                    <BtnSubmit IconSection={IconSearch} loading={false}>
                        Buscar
                    </BtnSubmit>
                </Stack>
            </Box>
        </Fieldset>
    );
};
