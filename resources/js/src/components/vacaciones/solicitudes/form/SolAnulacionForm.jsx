import { Box, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import {
    useStorageField,
    useUiVacaciones,
    useVacacionesStore,
} from "../../../../hooks";
import { IconBan } from "@tabler/icons-react";

export const SolAnulacionForm = ({ form }) => {
    const {
        isLoading,
        setActivateVacacion,
        startSolicitarAnulacionVacaciones,
    } = useVacacionesStore();
    const { modalActionSolAnulacion } = useUiVacaciones();
    const { storageFields } = useStorageField();

    const handleSubmit = (e) => {
        e.preventDefault();
        startSolicitarAnulacionVacaciones(form.values, storageFields);
        setActivateVacacion(null);
        modalActionSolAnulacion(false);
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
                    {...form.getInputProps("observaciones_anulado")}
                />
                <BtnSubmit IconSection={IconBan} loading={isLoading}>
                    Solicitar Anulación
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
