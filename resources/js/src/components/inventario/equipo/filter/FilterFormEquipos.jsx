import { Box, Fieldset, Select, SimpleGrid, TextInput } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../../components";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
    useDireccionStore,
    useInvCategoriaStore,
    useInvEquipoStore,
    useInvEstadoStore,
    useUsersStore,
} from "../../../../hooks";

export const FilterFormEquipos = () => {
    const { startLoadInvEquipos } = useInvEquipoStore();
    const { direcciones } = useDireccionStore();
    const { users } = useUsersStore();
    const { categorias } = useInvCategoriaStore();
    const { invEstados } = useInvEstadoStore();

    const form = useForm({
        initialValues: {
            direccion_id: null,
            usuario_id: null,
            codigo: "",
            categoria_id: null,
            numero_serie: "",
            estado_id: null,
        },
        transformValues: (values) => ({
            ...values,
            direccion_id: Number(values.direccion_id) || null,
            usuario_id: Number(values.usuario_id) || null,
            categoria_id: Number(values.categoria_id) || null,
            estado_id: Number(values.estado_id) || null,
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startLoadInvEquipos(form.getTransformedValues());
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
                        {...form.getInputProps("direccion_id")}
                        nothingFoundMessage="Nothing found..."
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                    <Select
                        searchable
                        clearable
                        label="Usuario"
                        placeholder="Elige el usuario"
                        {...form.getInputProps("usuario_id")}
                        nothingFoundMessage="Nothing found..."
                        data={users.map((usuario) => {
                            return {
                                value: usuario.cdgo_usrio.toString(),
                                label: usuario.nmbre_usrio,
                            };
                        })}
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
                        data={categorias.map((categoria) => {
                            return {
                                value: categoria.id.toString(),
                                label: categoria.nombre_categoria,
                            };
                        })}
                    />
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
                </SimpleGrid>
                <BtnSubmit IconSection={IconSearch} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
