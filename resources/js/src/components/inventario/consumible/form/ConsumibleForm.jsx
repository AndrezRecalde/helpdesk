import { Box, Select, Stack, TextInput } from "@mantine/core";
import { BtnSubmit } from "../../../../components";
import {
    useInvCategoriaStore,
    useInvConsumibleStore,
    useUiInvConsumible,
} from "../../../../hooks";
import { useEffect } from "react";

export const ConsumibleForm = ({ form }) => {
    const { categorias } = useInvCategoriaStore();
    const { startAddConsumible, activateConsumible, setActivateInvConsumible } =
        useInvConsumibleStore();

    const { modalActionConsumible } = useUiInvConsumible();

    useEffect(() => {
        if (activateConsumible !== null) {
            form.setValues({
                ...activateConsumible,
                categoria_id: activateConsumible?.categoria_id?.toString(),
            });
        }
    }, [activateConsumible]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddConsumible(form.getTransformedValues());
        if (activateConsumible !== null) {
            setActivateInvConsumible(null);
        }
        form.reset();
        modalActionConsumible(false);
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
                {/* <Select
                    disabled
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
                /> */}
                <Select
                    withAsterisk
                    label="Categoría"
                    placeholder="Seleccione la Categoría"
                    {...form.getInputProps("categoria_id")}
                    data={categorias.map((categoria) => {
                        return {
                            value: categoria.id.toString(),
                            label: categoria.nombre_categoria,
                        };
                    })}
                />
                <TextInput
                    label="Código"
                    placeholder="Digite el código del consumible"
                    {...form.getInputProps("codigo")}
                />
                <TextInput
                    label="Consumible"
                    placeholder="Digite el nombre del consumible"
                    {...form.getInputProps("nombre_consumible")}
                />
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
