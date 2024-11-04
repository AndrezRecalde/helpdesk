import { useEffect } from "react";
import { Box, Fieldset, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BtnSubmit, TextSection } from "../../../../components";
import {
    useDireccionStore,
    useStorageField,
    useUsersStore,
} from "../../../../hooks";
import { IconSearch } from "@tabler/icons-react";

export const FilterFormUsers = () => {
    const { startLoadUsers, clearUsers } = useUsersStore();
    const { startLoadDirecciones, direcciones, clearDirecciones } =
        useDireccionStore();
    const { setStorageUserFields } = useStorageField();

    const form = useForm({
        initialValues: {
            cdgo_direccion: "",
            nmbre_usrio: "",
            lgin: "",
        },
        transformValues: (values) => ({
            cdgo_direccion: Number(values.cdgo_direccion) || null,
            nmbre_usrio: values.nmbre_usrio,
            lgin: values.lgin,
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
        setStorageUserFields(form.getTransformedValues());
        startLoadUsers(form.getTransformedValues());
        //console.log(form.getTransformedValues());
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={<TextSection tt="" fw={500} fz={16}>Filtrar usuarios</TextSection>}
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
                <BtnSubmit IconSection={IconSearch}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
