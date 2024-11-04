import { Box, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconBan } from "@tabler/icons-react";
import { usePermisoStore, useUiPermiso } from "../../../hooks";

export const FormAnularPermiso = ({ form }) => {
    const { isLoading, startAnularPermiso } = usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();

    const handleSubmit = (e) => {
        e.preventDefault();
        modalActionAnularPermiso(0);
        startAnularPermiso(form.values);
        //console.log(form.values);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Textarea
                    label="Motivo de anulación"
                    placeholder="Describa su motivo"
                    {...form.getInputProps("per_observacion_anulado")}
                />
                <BtnSubmit IconSection={IconBan} loading={isLoading}>
                    Anular permiso
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
