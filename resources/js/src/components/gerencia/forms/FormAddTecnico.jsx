import { Box, Select, Stack } from "@mantine/core";
import { IconUserBolt } from "@tabler/icons-react";
import { useTecnicoStore, useUiTecnico, useUsersStore } from "../../../hooks";
import { BtnSubmit } from "../../../components";
import { useEffect } from "react";

export const FormAddTecnico = ({ form }) => {
    const { disabledInput, modalActionTecnico } = useUiTecnico();
    const { isLoading, startAddUpdateTecnico, activateTecnico } =
        useTecnicoStore();
    const { users } = useUsersStore();

    useEffect(() => {
        if (activateTecnico !== null) {
            form.setValues({
                cdgo_usrio: activateTecnico.cdgo_usrio?.toString(),
                roles: activateTecnico.role_id?.toString(),
            });
            return;
        }
    }, [activateTecnico]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.getTransformedValues());
        startAddUpdateTecnico(form.getTransformedValues());
        modalActionTecnico(0);
        form.reset();
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Select
                    disabled={disabledInput}
                    searchable
                    label="Usuarios"
                    placeholder="Seleccione el usuario"
                    description="Seleccione el usuario a ingresar o anular permisos de técnico"
                    {...form.getInputProps("cdgo_usrio")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />
                <Select
                    searchable
                    clearable
                    label="Roles"
                    placeholder="Seleccione el role"
                    {...form.getInputProps("roles")}
                    data={[
                        { value: "1", label: "GERENTE" },
                        { value: "2", label: "TÉCNICO" },
                        { value: "", label: "USUARIO" },
                    ]}
                />
                <BtnSubmit
                    fontSize={16}
                    IconSection={IconUserBolt}
                    loading={isLoading}
                >
                    Realizar Cambio
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
