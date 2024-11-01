import { Box, Fieldset, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BtnSubmit, TextSection } from "../../../../components";
import { useInvEstadoStore, useInvPerifericoStore, useStorageField } from "../../../../hooks";
import { IconSearch } from "@tabler/icons-react";

export const FilterFormPeriferico = () => {

    const { startLoadInvPerifericos } = useInvPerifericoStore();
    const { invEstados } = useInvEstadoStore();
    const { setStorageFields } = useStorageField();

    const form = useForm({
        initialValues: {
            numero_serie: "",
            estado_id: null,
            codigo_equipo: "",
        },
        transformValues: (values) => ({
            ...values,
            estado_id: Number(values.estado_id) || null,
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startLoadInvPerifericos(form.getTransformedValues());
        setStorageFields(form.getTransformedValues());
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fz={16} fw={500}>
                    Filtrar Componentes
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <SimpleGrid cols={{ base: 1, sm: 1, md: 3, lg: 3 }} mt={10}>
                    <TextInput
                        label="Número de serie"
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
                        data={invEstados.map((estado) => {
                            return {
                                value: estado.id.toString(),
                                label: estado.nombre_estado,
                            };
                        })}
                    />
                    <TextInput
                        label="Código del equipo"
                        placeholder="Digite el codigo nuevo del equipo"
                        {...form.getInputProps("codigo_equipo")}
                    />
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
