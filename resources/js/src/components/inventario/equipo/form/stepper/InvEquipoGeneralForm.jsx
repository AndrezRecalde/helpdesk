import { Select, SimpleGrid, Stack, TextInput } from "@mantine/core";

export const InvEquipoGeneralForm = ({ form }) => {
    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <TextInput
                label="Nombre del Equipo"
                placeholder="Digite el nombre el nombre del equipo"
                {...form.getInputProps("nombre_equipo")}
            />
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
                    label="Modelo"
                    placeholder="Digite el modelo del equipo"
                    {...form.getInputProps("modelo")}
                />
                <TextInput
                    label="Número de serie"
                    placeholder="Digite el número de serie"
                    {...form.getInputProps("modelo")}
                />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <Select
                    withAsterisk
                    label="Marca del Equipo"
                    placeholder="Seleccione una marca"
                    {...form.getInputProps("tipocategoria_id")}
                    data={[]}
                />
                <Select
                    withAsterisk
                    label="Estado del equipo"
                    placeholder="Seleccione el estado del equipo"
                    {...form.getInputProps("estado_id")}
                    data={[]}
                />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <Select
                    withAsterisk
                    label="Tipo Categoría"
                    placeholder="Seleccione un tipo de categoría"
                    {...form.getInputProps("tipocategoria_id")}
                    data={[]}
                />
                <Select
                    withAsterisk
                    label="Categoría"
                    placeholder="Seleccione la categoría"
                    {...form.getInputProps("categoria_id")}
                    data={[]}
                />
            </SimpleGrid>
        </Stack>
    );
};
