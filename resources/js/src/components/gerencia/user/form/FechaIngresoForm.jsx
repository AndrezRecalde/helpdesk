import { Box, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { BtnSubmit } from "../../../../components";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { useEffect } from "react";
import dayjs from "dayjs";

export const FechaIngresoForm = ({ form }) => {
    const { activateUser, startUpdateFechaIngreso } = useUsersStore();
    const { modalActionUser } = useUiUser();

    useEffect(() => {
        if (activateUser !== null) {
            const fecha = dayjs(activateUser.fecha_ingreso);
            form.setValues({
                usu_fi_institucion: fecha.isValid() ? fecha.toDate() : null,
            });
        }
    }, [activateUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startUpdateFechaIngreso(activateUser, form.getTransformedValues());
        console.log(form.getTransformedValues());
        modalActionUser(0);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <DateInput
                    withAsterisk
                    valueFormat="YYYY-MM-DD"
                    label="Fecha de ingreso a la institución"
                    placeholder="Registra la fecha"
                    {...form.getInputProps("usu_fi_institucion")}
                />
                <BtnSubmit>Guardar</BtnSubmit>
            </Stack>
        </Box>
    );
};
