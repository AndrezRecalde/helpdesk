import { Box, NumberInput, Stack, Table, Textarea } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import {
    useDescuentoStore,
    usePeriodoStore,
    useUiDescuento,
} from "../../../../hooks";

export const DescuentoVacacionalForm = ({ form }) => {
    const { modalActionDescuento } = useUiDescuento();
    const { startAddDescuento } = useDescuentoStore();
    const { startLoadPeriodos, activatePeriodo } = usePeriodoStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = form.getTransformedValues();
        const formulario = {
            ...values,
            usuario_id: activatePeriodo.cdgo_usrio,
            nom_periodo_vacacional_id: activatePeriodo.id,
        };
        //console.log(formulario);
        form.reset();
        await startAddDescuento(formulario);
        await startLoadPeriodos({});
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
                <Table withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Servidor</Table.Th>
                            <Table.Th>Periodo</Table.Th>
                            <Table.Th>Disponibilidad</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                {activatePeriodo?.nmbre_usrio.toUpperCase()}
                            </Table.Td>
                            <Table.Td>{activatePeriodo?.anio}</Table.Td>
                            <Table.Td>
                                {activatePeriodo?.disponibilidad_vacaciones.toFixed(2)}
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
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
