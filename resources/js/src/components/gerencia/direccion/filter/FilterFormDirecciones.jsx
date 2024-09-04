import { Box, Fieldset, Select, SimpleGrid, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { BtnSubmit } from "../../..";
import { useDireccionStore, useDirectorStore } from "../../../../hooks";
import { useEffect } from "react";
import { useForm } from "@mantine/form";

export const FilterFormDirecciones = () => {
    const { startLoadDirecciones, direcciones, clearDirecciones } =
        useDireccionStore();
        const { startLoadDirectores } = useDirectorStore();

    const form = useForm({
        initialValues: {
            cdgo_dprtmnto: null,
        },
        /* transformValues: (values) => ({
            cdgo_dprtmnto: Number(values.cdgo_dprtmnto) || ""
        }) */
    })

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadDirectores(form.getValues());
        //console.log(form.getValues());
    }

    return (
        <Fieldset mt={20} legend={<Text>Filtrar dirección</Text>}>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1 }} mt={10}>
                    <Select
                        searchable
                        clearable
                        label="Dirección"
                        placeholder="Elige la dirección"
                        {...form.getInputProps("cdgo_dprtmnto")}
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
