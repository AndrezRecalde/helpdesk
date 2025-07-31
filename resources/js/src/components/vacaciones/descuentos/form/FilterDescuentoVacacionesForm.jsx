import { Box, Fieldset, Group, Stack, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { YearPickerInput } from "@mantine/dates";
import { BtnSubmit, TextSection } from "../../../../components";
import { useDescuentoStore } from "../../../../hooks";
import { IconSearch } from "@tabler/icons-react";
import { Roles } from "../../../../helpers/dictionary";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FilterDescuentoVacacionesForm = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startLoadDescuentos } = useDescuentoStore();
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
        if (switch_role) {
            startLoadDescuentos({
                usuario_id: null,
                anio: form.getTransformedValues(),
            });
        }
        startLoadDescuentos({
            usuario_id: usuario.cdgo_usuario,
            anio: form.getTransformedValues(),
        });
        console.log(form.getTransformedValues());
        form.reset();
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
