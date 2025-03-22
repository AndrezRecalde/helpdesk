import { useEffect } from "react";
import { Box, NumberInput, Stack } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvConsumibleStore, useUiInvConsumible } from "../../../../hooks";

export const InvStockConsumibleForm = ({ form }) => {
    const {
        activateConsumible,
        startAddConsumible,
        setActivateInvConsumible,
    } = useInvConsumibleStore();
    const { modalActionStockConsumible } = useUiInvConsumible();

    useEffect(() => {
        if (activateConsumible !== null) {
            //console.log(activateConsumible);
            form.setValues({
                id: activateConsumible.id,
                ...activateConsumible,
            });
        }
    }, [activateConsumible]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        startAddConsumible(form.getTransformedValues());
        if (activateConsumible !== null) {
            setActivateInvConsumible(null);
        }
        form.reset();
        modalActionStockConsumible(false);
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
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
