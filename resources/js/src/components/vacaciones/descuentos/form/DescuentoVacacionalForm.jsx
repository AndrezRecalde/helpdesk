import { Box, NumberInput, Select, Stack, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import {
    usePeriodoStore,
    useUiDescuento,
    useUsersStore,
} from "../../../../hooks";

export const DescuentoVacacionalForm = ({ form }) => {
    const { modalActionDescuento } = useUiDescuento();
    const { users } = useUsersStore();
    const { periodos } = usePeriodoStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getValues());
        form.reset();
        modalActionDescuento(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <Select
                    clearable
                    required
                    label="Usuario"
                    placeholder="Seleccione el usuario"
                    data={users.map((user) => ({
                        value: user.cdgo_usrio.toString(),
                        label: user.nmbre_usrio,
                    }))}
                    {...form.getInputProps("usuario_id")}
                    nothingFoundMessage="Nada encontrado..."
                />
                <Select
                    clearable
                    required
                    label="Periodo"
                    placeholder="Seleccione un periodo"
                    data={periodos.map((periodo) => ({
                        value: periodo.id.toString(),
                        label: periodo.anio,
                    }))}
                    {...form.getInputProps("nom_periodo_id")}
                    nothingFoundMessage="Nada encontrado..."
                />
                <NumberInput
                    label="Dias de descuento"
                    placeholder="Ingrese los días de descuento"
                    {...form.getInputProps("dias_descuento")}
                />
                <Textarea
                    label="Motivo"
                    placeholder="Ingrese el motivo del descuento"
                    autosize
                    minRows={4}
                    maxRows={8}
                    {...form.getInputProps("motivo")}
                />
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
