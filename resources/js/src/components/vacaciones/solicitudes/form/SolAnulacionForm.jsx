import { Box, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useUiVacaciones, useVacacionesStore } from "../../../../hooks";

export const SolAnulacionForm = ({ form }) => {
    const {
        isLoading,
        setActivateVacacion,
        startSolicitarAnulacionVacaciones,
    } = useVacacionesStore();
    const { modalActionSolAnulacion } = useUiVacaciones();

    const handleSubmit = (e) => {
        e.preventDefault();
        startSolicitarAnulacionVacaciones(form.values);
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
                    required
                    label="Motivo de anulación"
                    placeholder="Describa su motivo"
                    {...form.getInputProps("observaciones_anulado")}
                />
                <BtnSubmit loading={isLoading}>Solicitar Anulación</BtnSubmit>
            </Stack>
        </Box>
    );
};
