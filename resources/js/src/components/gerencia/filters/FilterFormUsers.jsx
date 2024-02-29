import { useEffect } from "react";
import {
    Box,
    Fieldset,
    Select,
    SimpleGrid,
    Text,
    TextInput,
} from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { IconSearch } from "@tabler/icons-react";
import { useDireccionStore } from "../../../hooks";
import { useForm } from "@mantine/form";

export const FilterFormUsers = () => {
    const { startLoadDirecciones, direcciones, clearDirecciones } =
        useDireccionStore();

    const form = useForm({
        initialValues: {
            cdgo_dprtmnto: null,
            nmbre_usrio: "",
            lgin: "",
        },
        transformValues: (values) => ({
            cdgo_dprtmnto: Number(values.cdgo_dprtmnto) || null,
        }),
    });

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.values);
    };

    return (
        <Fieldset mt={20} legend={<Text>Filtrar usuarios</Text>}>
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
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                    <TextInput
                        label="Nombres"
                        placeholder="Filtrar por nombres"
                        {...form.getInputProps("nmbre_usrio")}
                    />
                    <TextInput
                        label="Usuario"
                        placeholder="Filtrar por usuario"
                        {...form.getInputProps("lgin")}
                    />
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch} heigh={40} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
