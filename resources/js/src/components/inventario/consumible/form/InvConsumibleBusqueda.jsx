import { useEffect } from "react";
import { Fieldset, Group } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useInvConsumibleStore } from "../../../../hooks";

export const InvConsumibleBusqueda = ({ isOpenModal }) => {
    const { activateConsumible, startLoadHistorialConsumible } =
        useInvConsumibleStore();

    const form = useForm({
        initialValues: {
            anio: new Date(),
        },

        validate: {
            anio: isNotEmpty("Por favor ingresa el año"),
        },
        transformValues: (values) => ({
            anio: values.anio.getFullYear(),
        }),
    });

    const { anio } = form.values;

    useEffect(() => {
        if (isOpenModal) {
            //console.log(anio);
            startLoadHistorialConsumible({
                consumible_id: activateConsumible.id,
                anio: anio.getFullYear(),
            });
        }
    }, [isOpenModal]);

    useEffect(() => {
        startLoadHistorialConsumible({
            consumible_id: activateConsumible.id,
            anio: anio.getFullYear(),
        });
    }, [anio]);

    return (
        <Fieldset legend="Busqueda por año" mb={20}>
            <Group justify="space-between">
                <YearPickerInput withAsterisk {...form.getInputProps("anio")} />
            </Group>
        </Fieldset>
    );
};
