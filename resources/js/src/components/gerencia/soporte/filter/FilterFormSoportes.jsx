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
import { BtnSubmit, TextSection } from "../../..";
import { DateInput, YearPickerInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import {
    useDireccionStore,
    useEstadoStore,
    useSoporteStore,
    useStorageField,
} from "../../../../hooks";

export const FilterFormSoportes = ({ form }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { isLoading, startSearchSoporte } = useSoporteStore();
    const { direcciones } = useDireccionStore();
    const { estados } = useEstadoStore();
    const { setStorageFields } = useStorageField();

    const { switch_role } = form.values;

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(switch_role);
        if (switch_role) {
            // console.log("aki");
            const { id_usu_tecnico_asig, ...values } =
                form.getTransformedValues();
            //console.log(values);
            startSearchSoporte(values);
            setStorageFields(values);
            //console.log(values);
        } else {
            //console.log("aki2");

            //console.log(form.getTransformedValues());
            startSearchSoporte(form.getTransformedValues());
            setStorageFields(form.getTransformedValues());
        }
        //console.log(form.values);
    };

    return (
        <Fieldset mt={20} legend={<TextSection tt="" fz={16} fw={700}>Filtrar Soportes</TextSection>}>
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Group justify="flex-end">
                    <YearPickerInput
                        required
                        placeholder="Seleccione el año"
                        {...form.getInputProps("anio")}
                    />
                    <Switch
                        size="xl"
                        onLabel="G"
                        offLabel="T"
                        disabled={usuario?.role_id == 2 ? true : false} //Tiene que ser tecnico para que sea true
                        {...form.getInputProps("switch_role")}
                    />
                </Group>
                <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Desde"
                        placeholder="Seleccione fecha inicio"
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Hasta"
                        placeholder="Seleccione fecha final"
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 3, md: 3, lg: 3 }} mt={10}>
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
                    <Select
                        searchable
                        clearable
                        label="Estado"
                        placeholder="Elige el estado"
                        {...form.getInputProps("id_estado")}
                        data={estados.map((estado) => {
                            return {
                                value: estado.id_estado_caso.toString(),
                                label: estado.nombre,
                            };
                        })}
                    />
                </SimpleGrid>

                <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
