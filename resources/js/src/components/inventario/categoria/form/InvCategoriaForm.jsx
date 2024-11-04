import { useEffect } from "react";
import { Box, Select, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import { useInvCategoriaStore, useInvTipocategoriaStore, useInvUiCategoria } from "../../../../hooks";

export const InvCategoriaForm = ({ form }) => {
    const { tiposcategorias } = useInvTipocategoriaStore();
    const { startAddInvCategoria, activateCategoria, setActivateInvCategoria } =
        useInvCategoriaStore();

    const { modalActionCategoria } = useInvUiCategoria();

    useEffect(() => {
        if (activateCategoria !== null) {
            form.setValues({
                ...activateCategoria,
                tipocategoria_id:
                    activateCategoria.tipocategoria_id.toString(),
            });
        }
    }, [activateCategoria]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddInvCategoria(form.getTransformedValues());
        if (activateCategoria !== null) {
            setActivateInvCategoria(null);
        }
        form.reset();
        modalActionCategoria(false);
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
                    withAsterisk
                    label="Tipo de categoría"
                    placeholder="Seleccione el Tipo de categoría"
                    {...form.getInputProps("tipocategoria_id")}
                    data={tiposcategorias.map((tipocategoria) => {
                        return {
                            value: tipocategoria.id.toString(),
                            label: tipocategoria.nombre_tipocategoria,
                        };
                    })}
                />
                <TextInput
                    label="Categoría"
                    placeholder="Digite el nombre de la Categoría"
                    {...form.getInputProps("nombre_categoria")}
                />
                <BtnSubmit>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
