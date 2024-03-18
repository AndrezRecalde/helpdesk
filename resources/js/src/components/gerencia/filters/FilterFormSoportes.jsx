import {
    Box,
    Fieldset,
    Group,
    Select,
    SimpleGrid,
    Switch,
    Text,
    TextInput,
} from "@mantine/core";
import { BtnSubmit } from "../../../components";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useDireccionStore, useSoporteStore } from "../../../hooks";

export const FilterFormSoportes = ({ role }) => {
    const user = JSON.parse(localStorage.getItem("service_user"));
    const { startSearchSoporte } = useSoporteStore();
    const { direcciones } = useDireccionStore();
    const form = useForm({
        initialValues: {
            fecha_inicio: "",
            fecha_fin: "",
            anio: dayjs(),
            id_direccion: null,
            numero_sop: "",
            switch_role: role,
            id_usu_tecnico_asig: user.cdgo_usrio,
        },
        validate: {
            anio: isNotEmpty("Por favor ingresar el año"),
        },
        transformValues: (values) => ({
            ...values,
            id_direccion: Number(values.id_direccion) || null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
        }),
    });

    const { switch_role } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (switch_role) {
            console.log(form.getTransformedValues())
            startSearchSoporte(form.getTransformedValues());
        } else {
            const { id_usu_tecnico_asig, ...values } =
                form.getTransformedValues();
            console.log(values);
            startSearchSoporte(values);
        }
        //console.log(form.values);
    };

    return (
        <Fieldset mt={20} legend={<Text>Filtrar Soportes</Text>}>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Group justify="end">
                    <Switch
                        size="xl"
                        onLabel="G"
                        offLabel="T"
                        disabled={role}
                        {...form.getInputProps("switch_role")}
                    />
                </Group>
                <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        clearable
                        valueFormat="DD/MM/YYYY"
                        label="Desde"
                        placeholder="Seleccione fecha inicio"
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        clearable
                        valueFormat="DD/MM/YYYY"
                        label="Hasta"
                        placeholder="Seleccione fecha final"
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3, md: 3, lg: 3 }} mt={10}>
                    <YearPickerInput
                        required
                        label="Año"
                        placeholder="Seleccione el año"
                        {...form.getInputProps("anio")}
                    />
                    <Select
                        searchable
                        label="Dirección"
                        placeholder="Elige la dirección"
                        {...form.getInputProps("id_direccion")}
                        data={direcciones.map((direccion) => {
                            return {
                                value: direccion.cdgo_dprtmnto.toString(),
                                label: direccion.nmbre_dprtmnto,
                            };
                        })}
                    />
                    <TextInput
                        label="Número de soporte"
                        {...form.getInputProps("numero_sop")}
                        placeholder="Filtrar por soporte"
                    />
                </SimpleGrid>

                <BtnSubmit IconSection={IconSearch} heigh={40} fontSize={16}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
