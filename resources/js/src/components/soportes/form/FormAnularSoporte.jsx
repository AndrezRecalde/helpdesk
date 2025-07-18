import { useEffect } from "react";
import { Box, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import { IconProgressX } from "@tabler/icons-react";

export const FormAnularSoporte = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startAnularSoporte, activateSoporte } = useSoporteStore();
    const { modalActionAnularSoporte } = useUiSoporte();

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
        //console.log(form.values);
        startAnularSoporte(form.values);
        startLoadSoportesActualesUsuarios(usuario.cdgo_usrio);
        form.reset();
        modalActionAnularSoporte(0);
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
                <BtnSubmit IconSection={IconProgressX}>
                    Anular solicitud
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
