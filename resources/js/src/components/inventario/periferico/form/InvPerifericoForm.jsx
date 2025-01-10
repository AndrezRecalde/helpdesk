import {
    Box,
    Checkbox,
    Group,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../../components";
import { DateInput } from "@mantine/dates";
import {
    useInvCategoriaStore,
    //useInvEquipoStore,
    useInvEstadoStore,
    useInvMarcaStore,
    useInvPerifericoStore,
    useInvTipocategoriaStore,
    useInvUiPeriferico,
    useStorageField,
} from "../../../../hooks";
import { useEffect, useState } from "react";

export const InvPerifericoForm = ({ form }) => {
    const { tipocategoria_id, es_adquirido, es_donado } = form.values;
    const { invMarcas } = useInvMarcaStore();
    const { tiposcategorias } = useInvTipocategoriaStore();
    const { categorias, startLoadInvCategorias } = useInvCategoriaStore();
    //const { invEquipos } = useInvEquipoStore();
    const { invEstados } = useInvEstadoStore();
    const {
        activatePeriferico,
        setActivateInvPeriferico,
        startAddInvPeriferico,
    } = useInvPerifericoStore();
    const { modalActionPeriferico } = useInvUiPeriferico();
    const { storageFields } = useStorageField();
    //const [selDisabled, setSelDisabled] = useState(true);
    const [checkDonado, setCheckDonado] = useState(false);
    const [checkAdq, setCheckAdq] = useState(false);

    useEffect(() => {
        if (es_adquirido) {
            setCheckDonado(true);
        } else {
            setCheckDonado(false);
        }
        if (es_donado) {
            setCheckAdq(true);
        } else {
            setCheckAdq(false);
        }
    }, [es_adquirido, es_donado]);

    useEffect(() => {
        startLoadInvCategorias({
            tipocategoria_id: tipocategoria_id,
            activo: true,
        });
    }, [tipocategoria_id]);

    useEffect(() => {
        if (activatePeriferico !== null) {
            startLoadInvCategorias({
                tipocategoria_id: tipocategoria_id,
                //activo: true,
            });
            form.setValues({
                id: activatePeriferico.id,
                nombre_periferico: activatePeriferico.nombre_periferico,
                marca_id: activatePeriferico.marca_id.toString(),
                tipocategoria_id:
                    activatePeriferico.tipocategoria_id.toString(),
                categoria_id: activatePeriferico.categoria_id.toString(),
                numero_serie: activatePeriferico.numero_serie,
                fecha_adquisicion: new Date(
                    activatePeriferico.fecha_adquisicion
                ),
                es_adquirido: activatePeriferico.es_adquirido ? 1 : 0,
                es_donado: activatePeriferico.es_donado ? 1 : 0,
                es_usado: activatePeriferico.es_usado ? 1 : 0,
                estado_id: activatePeriferico.estado_id.toString(),
            });
            return;
        }
    }, [activatePeriferico]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startAddInvPeriferico(form.getTransformedValues(), storageFields);
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
                <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 2 }}>
                    <TextInput
                        label="Modelo"
                        placeholder="Digite el nombre del periferico"
                        {...form.getInputProps("nombre_periferico")}
                    />
                    <TextInput
                        label="Número de serie"
                        placeholder="Digite el número de serie"
                        {...form.getInputProps("numero_serie")}
                    />
                    <Select
                        withAsterisk
                        label="Marca"
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
                        label="Tipo categoría"
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
                        label="Categoría"
                        placeholder="Seleccione la categoría"
                        defaultValue={activatePeriferico?.categoria_id.toString()}
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
                    {/* <Select
                        withAsterisk
                        placeholder="Seleccione el equipo (código nuevo)"
                        {...form.getInputProps("equipo_id")}
                        data={invEquipos.map((equipo) => {
                            return {
                                label: `${equipo.nombre_periferico} ${equipo.numero_serie}`,
                                value: equipo.id.toString(),
                            };
                        })}
                    /> */}
                    <Select
                        withAsterisk
                        label="Estado"
                        placeholder="Seleccione el equipo (código nuevo)"
                        {...form.getInputProps("estado_id")}
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
                            disabled={checkAdq}
                            {...form.getInputProps("es_adquirido", {
                                type: "checkbox",
                            })}
                        />
                        <Checkbox
                            label="Bien donado"
                            disabled={checkDonado}
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
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
