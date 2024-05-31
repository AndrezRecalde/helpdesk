import { useEffect } from "react";
import {
    Box,
    Fieldset,
    Select,
    SimpleGrid,
    Text,
    TextInput,
} from "@mantine/core";
import { BtnSubmit } from "../../..";
import { IconSearch } from "@tabler/icons-react";
import { useDireccionStore, useUsersStore } from "../../../../hooks";
import { useForm } from "@mantine/form";

export const FilterFormUsers = () => {
    const { startLoadUsers, clearUsers } = useUsersStore();
    const { startLoadDirecciones, direcciones, clearDirecciones } =
        useDireccionStore();

    const form = useForm({
        initialValues: {
            cdgo_direccion: null,
            nmbre_usrio: "",
            lgin: "",
        },
        transformValues: (values) => ({
            cdgo_direccion: Number(values.cdgo_direccion) || null,
        }),
    });

    useEffect(() => {
        startLoadDirecciones();

        return () => {
            clearDirecciones();
            clearUsers();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        startLoadUsers(form.values);
        //console.log(form.values);
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
                        {...form.getInputProps("cdgo_direccion")}
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
                <BtnSubmit IconSection={IconSearch} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
