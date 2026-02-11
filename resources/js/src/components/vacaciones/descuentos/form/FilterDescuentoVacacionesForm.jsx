import { Box, Fieldset, Group, Stack, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { YearPickerInput } from "@mantine/dates";
import { BtnSubmit, TextSection } from "../../../../components";
import { IconSearch } from "@tabler/icons-react";
import { Roles } from "../../../../helpers/dictionary";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FilterDescuentoVacacionesForm = ({ startLoadDescuentos }) => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const form = useForm({
        initialValues: {
            switch_role: false,
            anio: new Date(),
        },
        validate: {
            anio: (value) => (value ? null : "Por favor ingresar el año"),
        },
        transformValues: (values) => ({
            anio: values.anio.getFullYear(),
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { switch_role } = form.values;
        const { anio } = form.getTransformedValues();
        console.log(switch_role);
        if (switch_role) {
            startLoadDescuentos({
                usuario_id: null,
                anio: anio,
            });
        } else {
            startLoadDescuentos({
                usuario_id: usuario.cdgo_usrio,
                anio: anio,
            });
        }
        //console.log(form.getTransformedValues());
        //form.reset();
    };

    return (
        <Fieldset
            mt={20}
            mb={20}
            legend={
                <TextSection tt="" fw={500} fz={16}>
                    Filtrar Descuentos
                </TextSection>
            }
        >
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Stack>
                    <Group justify="flex-end">
                        {usuario.role === Roles.NOM_VACACIONES && (
                            <Group justify="flex-end">
                                <Switch
                                    size="xl"
                                    onLabel="G"
                                    offLabel="U"
                                    {...form.getInputProps("switch_role")}
                                />
                            </Group>
                        )}
                    </Group>
                    <YearPickerInput
                        //disabled
                        label="Año"
                        placeholder="Seleccione el año"
                        classNames={classes}
                        {...form.getInputProps("anio")}
                    />
                    <BtnSubmit IconSection={IconSearch}>Buscar</BtnSubmit>
                </Stack>
            </Box>
        </Fieldset>
    );
};
