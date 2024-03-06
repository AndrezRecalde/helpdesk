import { useEffect } from "react";
import { Box, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { useSoporteStore } from "../../../hooks";
import { IconProgressX } from "@tabler/icons-react";

export const FormAnularSoporte = ({ form }) => {
    const { activateSoporte } = useSoporteStore();

    useEffect(() => {
        if (activateSoporte !== null) {
            form.setValues({
                ...activateSoporte,
                id_estado: "2"
            });
            return;
        }
    }, [activateSoporte]);

    const handleSubmit = () => {
        console.log(form.values)
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                {/* <Select
                    label="Estado del soporte"
                    placeholder="Seleccione Estado del Soporte"
                    data={[
                        { value: "1", label: "Pendiente" },
                        {
                            value: "2",
                            label: "Anulado",
                        },
                        { value: "3", label: "Atendido" },
                        { value: "4", label: "Finalizado" },
                    ]}
                    {...form.getInputProps("id_estado")}
                    disabled
                /> */}
                <Textarea
                    label="Motivo"
                    placeholder="Describa el motivo de la anulación"
                    autosize
                    minRows={5}
                    maxRows={5}
                    required
                    {...form.getInputProps("obs_anulado")}
                />
                <BtnSubmit fontSize={16} IconSection={IconProgressX}>
                    Anular solicitud
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
