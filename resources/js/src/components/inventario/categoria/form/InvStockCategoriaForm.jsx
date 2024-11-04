import { useEffect } from "react";
import { Box, NumberInput, Stack } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvCategoriaStore, useInvUiCategoria } from "../../../../hooks";

export const InvStockCategoriaForm = ({ form }) => {
    const { activateCategoria, startAddIncrementarStock, setActivateInvCategoria } =
        useInvCategoriaStore();
    const { modalActionStockCategoria } = useInvUiCategoria();

    useEffect(() => {
        if (activateCategoria !== null) {
            form.setValues({
                id: activateCategoria.id,
            });
        }
    }, [activateCategoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startAddIncrementarStock(form.getTransformedValues());
        if (activateCategoria !== null) {
            setActivateInvCategoria(null);
        }
        form.reset();
        modalActionStockCategoria(false);
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
                <NumberInput
                    required
                    label="Stock"
                    placeholder="Digite el stock"
                    allowNegative={false}
                    {...form.getInputProps("stock")}
                />
                <BtnSubmit>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
