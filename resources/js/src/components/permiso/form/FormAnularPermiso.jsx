import { Box, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconBan } from "@tabler/icons-react";
import { usePermisoStore, useStorageField, useUiPermiso } from "../../../hooks";

export const FormAnularPermiso = ({ form }) => {
    const { isLoading, startAnularPermiso, setActivatePermiso } = usePermisoStore();
    const { modalActionAnularPermiso } = useUiPermiso();
    const { storagePermisoFields } = useStorageField();

    const handleSubmit = (e) => {
        e.preventDefault();
        startAnularPermiso(form.values, storagePermisoFields);
        //console.log(form.values);
        setActivatePermiso(null);
        modalActionAnularPermiso(0);
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
