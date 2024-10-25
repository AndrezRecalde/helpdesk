import { Box, Checkbox, Group, Select, Stack, TextInput } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../../components";
import { IconChecks } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import {
    useInvCategoriaStore,
    useInvEquipoStore,
    useInvEstadoStore,
    useInvMarcaStore,
    useInvPerifericoStore,
    useInvTipocategoriaStore,
    useInvUiPeriferico,
} from "../../../../hooks";
import { useEffect } from "react";

export const InvPerifericoForm = ({ form }) => {
    const { tipocategoria_id } = form.values;
    const { invMarcas } = useInvMarcaStore();
    const { tiposcategorias } = useInvTipocategoriaStore();
    const { categorias, startLoadInvCategorias } = useInvCategoriaStore();
    const { invEquipos } = useInvEquipoStore();
    const { invEstados } = useInvEstadoStore();
    const { activatePeriferico, setActivateInvPeriferico } = useInvPerifericoStore();
    const { modalActionPeriferico } = useInvUiPeriferico();

    useEffect(() => {
        startLoadInvCategorias({
            tipocategoria_id: tipocategoria_id,
            activo: true,
        });
    }, [tipocategoria_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getValues());
        if (activatePeriferico !== null) {
            setActivateInvPeriferico(null);
        }
        form.reset();
        modalActionPeriferico(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <TextInput
                    label="Modelo"
                    placeholder="Digite el modelo"
                    {...form.getInputProps("modelo")}
                />
                <TextInput
                    label="Número de serie"
                    placeholder="Digite el número de serie"
                    {...form.getInputProps("numero_serie")}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione la marca"
                    {...form.getInputProps("marca_id")}
                    data={invMarcas.map((marca) => {
                        return {
                            label: marca.nombre_marca,
                            value: marca.id.toString(),
                        };
                    })}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione el tipo de categoría"
                    {...form.getInputProps("tipocategoria_id")}
                    data={tiposcategorias.map((tipo) => {
                        return {
                            label: tipo.nombre_tipocategoria,
                            value: tipo.id.toString(),
                        };
                    })}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione la categoría"
                    {...form.getInputProps("categoria_id")}
                    data={categorias.map((categoria) => {
                        return {
                            label: categoria.nombre_categoria,
                            value: categoria.id.toString(),
                        };
                    })}
                />
                <DateInput
                    //dateParser={dateParser}
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    label="Fecha adquisición"
                    placeholder="Seleccione fecha de adquisición"
                    {...form.getInputProps("fecha_adquisicion")}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione el equipo (código nuevo)"
                    {...form.getInputProps("equipo_id")}
                    data={invEquipos.map((equipo) => {
                        return {
                            label: `${equipo.modelo} ${equipo.numero_serie}`,
                            value: equipo.id.toString(),
                        };
                    })}
                />
                <Select
                    withAsterisk
                    placeholder="Seleccione el equipo (código nuevo)"
                    {...form.getInputProps("equipo_id")}
                    data={invEstados.map((estado) => {
                        return {
                            label: estado.nombre_estado,
                            value: estado.id.toString(),
                        };
                    })}
                />
                <div>
                    <TextSection fw={500}>Modalidad del bien: </TextSection>
                    <Group>
                        <Checkbox
                            label="Bien adquirido"
                            {...form.getInputProps("es_adquirido", {
                                type: "checkbox",
                            })}
                        />
                        <Checkbox
                            label="Bien donado"
                            {...form.getInputProps("es_donado", {
                                type: "checkbox",
                            })}
                        />
                        <Checkbox
                            label="Bien usado"
                            {...form.getInputProps("es_usado", {
                                type: "checkbox",
                            })}
                        />
                    </Group>
                </div>
                <BtnSubmit fontSize={16} IconSection={IconChecks}>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
