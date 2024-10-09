import { useEffect } from "react";
import { Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import {
    useInvCategoriaStore,
    useInvEstadoStore,
    useInvMarcaStore,
    useInvTipocategoriaStore,
    useInvUbicacionStore,
} from "../../../../../hooks";

export const InvEquipoGeneralForm = ({ form }) => {
    const { tipocategoria_id } = form.values;
    const { invUbicaciones } = useInvUbicacionStore();
    const { invMarcas } = useInvMarcaStore();
    const { invEstados } = useInvEstadoStore();
    const { tiposcategorias } = useInvTipocategoriaStore();
    const { startLoadInvCategorias, categorias } = useInvCategoriaStore();

    useEffect(() => {
        startLoadInvCategorias({ tipocategoria_id: tipocategoria_id });
    }, [tipocategoria_id]);

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <Select
                withAsterisk
                label="Ubicación física"
                placeholder="Seleccione la ubicación física del equipo"
                {...form.getInputProps("ubicacion_id")}
                data={invUbicaciones.map((ubicacion) => {
                    return {
                        value: ubicacion.id.toString(),
                        label: ubicacion.nombre_ubicacion,
                    };
                })}
            />
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <Select
                    withAsterisk
                    label="Marca del Equipo"
                    placeholder="Seleccione una marca"
                    {...form.getInputProps("marca_id")}
                    data={invMarcas.map((marca) => {
                        return {
                            value: marca.id.toString(),
                            label: marca.nombre_marca,
                        };
                    })}
                />
                <TextInput
                    withAsterisk
                    label="Modelo"
                    placeholder="Digite el modelo del equipo"
                    {...form.getInputProps("modelo")}
                />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <TextInput
                    label="Código Antiguo"
                    placeholder="Digite el código antiguo"
                    {...form.getInputProps("codigo_antiguo")}
                />
                <TextInput
                    label="Código Nuevo"
                    placeholder="Digite el código nuevo"
                    {...form.getInputProps("codigo_nuevo")}
                />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <TextInput
                    withAsterisk
                    label="Número de serie"
                    placeholder="Digite el número de serie"
                    {...form.getInputProps("numero_serie")}
                />
                <Select
                    withAsterisk
                    label="Estado del equipo"
                    placeholder="Seleccione el estado del equipo"
                    {...form.getInputProps("estado_id")}
                    data={invEstados.map((estado) => {
                        return {
                            value: estado.id.toString(),
                            label: estado.nombre_estado,
                        };
                    })}
                />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <Select
                    withAsterisk
                    label="Tipo Categoría"
                    placeholder="Seleccione un tipo de categoría"
                    {...form.getInputProps("tipocategoria_id")}
                    data={tiposcategorias.map((tipo) => {
                        return {
                            value: tipo.id.toString(),
                            label: tipo.nombre_tipocategoria,
                        };
                    })}
                />
                <Select
                    withAsterisk
                    label="Categoría"
                    placeholder="Seleccione la categoría"
                    {...form.getInputProps("categoria_id")}
                    data={categorias.map((categoria) => {
                        return {
                            value: categoria.id.toString(),
                            label: categoria.nombre_categoria,
                        };
                    })}
                />
            </SimpleGrid>
        </Stack>
    );
};
