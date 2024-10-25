import {
    ActionIcon,
    Box,
    Button,
    Checkbox,
    Group,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { IconChecks, IconTrash } from "@tabler/icons-react";
import { BtnSubmit, TextSection } from "../../../../components";
import { randomId } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { useInvCategoriaStore, useInvEquipoStore, useInvEstadoStore, useInvMarcaStore, useInvUiEquipo } from "../../../../hooks";

export const InvEquipoComponenteForm = ({ form }) => {
    const { invMarcas } = useInvMarcaStore();
    const { categorias } = useInvCategoriaStore();
    const { invEstados } = useInvEstadoStore();
    const { startAssignComponente, activateInvEquipo } = useInvEquipoStore();
    const { modalActionAssignPeriferico } = useInvUiEquipo();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startAssignComponente(form.getTransformedValues(), activateInvEquipo);
        form.reset();
        modalActionAssignPeriferico(false);
    };

    const fields = form.getValues().perifericos.map((item, index) => (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
            key={item.key}
        >
            <Group justify="space-between" mt={20}>
                <TextSection fw={500}>Componente {index}</TextSection>
                <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem("perifericos", index)}
                >
                    <IconTrash size="1rem" />
                </ActionIcon>
            </Group>
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }}>
                <TextInput
                    withAsterisk
                    placeholder="Digite el modelo del equipo"
                    key={form.key(`perifericos.${index}.modelo`)}
                    {...form.getInputProps(`perifericos.${index}.modelo`)}
                />
                <TextInput
                    withAsterisk
                    placeholder="Digite el número serie"
                    key={form.key(`perifericos.${index}.numero_serie`)}
                    {...form.getInputProps(`perifericos.${index}.numero_serie`)}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione la categoría"
                    key={form.key(`perifericos.${index}.categoria_id`)}
                    {...form.getInputProps(`perifericos.${index}.categoria_id`)}
                    data={categorias.map((categoria) => {
                        return {
                            label: categoria.nombre_categoria,
                            value: categoria.id.toString(),
                        };
                    })}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione la marca"
                    key={form.key(`perifericos.${index}.marca_id`)}
                    {...form.getInputProps(`perifericos.${index}.marca_id`)}
                    data={invMarcas.map((marca) => {
                        return {
                            label: marca.nombre_marca,
                            value: marca.id.toString(),
                        };
                    })}
                />
                <DateInput
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    placeholder="Fecha de adquisión"
                    key={form.key(`perifericos.${index}.fecha_adquisicion`)}
                    {...form.getInputProps(
                        `perifericos.${index}.fecha_adquisicion`
                    )}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione el estado"
                    key={form.key(`perifericos.${index}.estado_id`)}
                    {...form.getInputProps(`perifericos.${index}.estado_id`)}
                    data={invEstados.map((estado) => {
                        return {
                            label: estado.nombre_estado,
                            value: estado.id.toString(),
                        };
                    })}
                />
            </SimpleGrid>

            <div>
                <TextSection fw={500}>Modalidad del bien: </TextSection>
                <Group>
                    <Checkbox
                        label="Bien adquirido"
                        key={form.key(`perifericos.${index}.es_adquirido`)}
                        {...form.getInputProps(
                            `perifericos.${index}.es_adquirido`,
                            {
                                type: "checkbox",
                            }
                        )}
                    />
                    <Checkbox
                        label="Bien donado"
                        key={form.key(`perifericos.${index}.es_donado`)}
                        {...form.getInputProps(
                            `perifericos.${index}.es_donado`,
                            {
                                type: "checkbox",
                            }
                        )}
                    />
                    <Checkbox
                        label="Bien usado"
                        key={form.key(`perifericos.${index}.es_usado`)}
                        {...form.getInputProps(
                            `perifericos.${index}.es_usado`,
                            {
                                type: "checkbox",
                            }
                        )}
                    />
                </Group>
            </div>
        </Stack>
    ));

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            {fields.length <= 0 ?? (
                <Text c="dimmed" ta="center">
                    No one here...
                </Text>
            )}

            {fields}

            <Group justify="center" mt="md">
                <Button
                    onClick={() =>
                        form.insertListItem("perifericos", {
                            key: randomId(),
                            modelo: "",
                            numero_serie: "",
                            marca_id: null,
                            categoria_id: null,
                            fecha_adquisicion: new Date(),
                            es_adquirido: false,
                            es_donado: false,
                            es_usado: false,
                        })
                    }
                >
                    Agregar componente
                </Button>
            </Group>
            <BtnSubmit IconSection={IconChecks}>
                Agregar Componente(s)
            </BtnSubmit>
        </Box>
    );
};
