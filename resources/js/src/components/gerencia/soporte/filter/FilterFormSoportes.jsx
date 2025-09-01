import {
    Box,
    Chip,
    Fieldset,
    Group,
    Select,
    SimpleGrid,
    Switch,
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
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

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
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fz={16} fw={500}>
                    Filtrar Soportes
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Group justify="space-between" spacing="md">
                    <Group>
                        <Chip.Group
                            multiple
                            value={form.values.id_estado} // debe ser array de strings
                            onChange={(values) =>
                                form.setFieldValue("id_estado", values)
                            }
                        >
                            {estados.map((estado) => (
                                <Chip
                                    key={estado.id_estado_caso}
                                    value={estado.id_estado_caso.toString()}
                                    variant="light"
                                    size="sm"
                                >
                                    {estado.nombre}
                                </Chip>
                            ))}
                        </Chip.Group>
                    </Group>
                    <Group>
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
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={10}>
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Desde"
                        placeholder="Seleccione fecha inicio"
                        classNames={classes}
                        {...form.getInputProps("fecha_inicio")}
                    />
                    <DateInput
                        clearable
                        valueFormat="YYYY-MM-DD"
                        label="Hasta"
                        placeholder="Seleccione fecha final"
                        classNames={classes}
                        {...form.getInputProps("fecha_fin")}
                    />
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={10}>
                    <Select
                        searchable
                        label="Dirección"
                        placeholder="Elige la dirección"
                        classNames={classes}
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
                        classNames={classes}
                        {...form.getInputProps("numero_sop")}
                        placeholder="Filtrar por soporte"
                    />
                    {/* <Select
                        searchable
                        clearable
                        label="Estado"
                        placeholder="Elige el estado"
                        classNames={classes}
                        {...form.getInputProps("id_estado")}
                        data={estados.map((estado) => {
                            return {
                                value: estado.id_estado_caso.toString(),
                                label: estado.nombre,
                            };
                        })}
                    /> */}
                </SimpleGrid>

                <BtnSubmit IconSection={IconSearch} loading={isLoading}>
                    Buscar
                </BtnSubmit>
            </Box>
        </Fieldset>
    );
};
