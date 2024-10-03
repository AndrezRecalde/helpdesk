import { Box, Fieldset, Select, SimpleGrid, TextInput } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../../components";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

export const FilterFormEquipos = () => {
    const form = useForm({
        initialValues: {
            cdgo_dprtmnto: null,
            cdgo_usrio: null,
            codigo: "",

            categoria_id: null,
            numero_serie: "",
            estado_id: null,
        },
        transformValues: (values) => ({
            ...values,
            cdgo_dprtmnto: Number(values.cdgo_dprtmnto),
            cdgo_usrio: Number(values.cdgo_usrio),
            categoria_id: Number(values.categoria_id),
            estado_id: Number(values.estado_id),
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fz={16} fw={500}>
                    Filtrar Equipos
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1, sm: 1, md: 3, lg: 3 }} mt={10}>
                    <Select
                        searchable
                        clearable
                        label="Dirección"
                        placeholder="Elige la dirección"
                        {...form.getInputProps("cdgo_dprtmnto")}
                        nothingFoundMessage="Nothing found..."
                        data={[]}
                    />
                    <Select
                        searchable
                        clearable
                        label="Usuario"
                        placeholder="Elige el usuario"
                        {...form.getInputProps("cdgo_dprtmnto")}
                        nothingFoundMessage="Nothing found..."
                        data={[]}
                    />
                    <TextInput
                        label="Código"
                        placeholder="Digite el código (nuevo o antiguo)"
                        {...form.getInputProps("codigo")}
                    />
                    <Select
                        searchable
                        clearable
                        label="Categoria"
                        placeholder="Elige la categoria"
                        {...form.getInputProps("categoria_id")}
                        nothingFoundMessage="Nothing found..."
                        data={[]}
                    />
                    <TextInput
                        label="Numero de serie"
                        placeholder="Digite el numero de serie"
                        {...form.getInputProps("numero_serie")}
                    />
                    <Select
                        searchable
                        clearable
                        label="Estado"
                        placeholder="Elige el estado"
                        {...form.getInputProps("estado_id")}
                        nothingFoundMessage="Nothing found..."
                        data={[]}
                    />
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
