import { useEffect } from "react";
import { Box, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import {
    useInvTipocategoriaStore,
    useInvUiTipocategoria,
} from "../../../../hooks";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const InvTipocategoriaForm = ({ form }) => {
    const {
        startAddTipocategoria,
        activateTipocategoria,
        setActivateTipocategoria,
    } = useInvTipocategoriaStore();
    const { modalActionTipocategoria } = useInvUiTipocategoria();

    useEffect(() => {
        if (activateTipocategoria !== null) {
            form.setValues({ ...activateTipocategoria });
        }
    }, [activateTipocategoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddTipocategoria(form.getValues());
        if (activateTipocategoria !== null) {
            setActivateTipocategoria(null);
        }
        form.reset();
        modalActionTipocategoria(false);
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
                <TextInput
                    label="Tipo categoría"
                    placeholder="Digite el tipo de categoría"
                    {...form.getInputProps("nombre_tipocategoria")}
                    classNames={classes}
                />
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
