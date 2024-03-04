import { useEffect } from "react";
import { ActionIcon, Box, Group, Select, Stack } from "@mantine/core";
import { IconArrowsUpDown, IconRotate } from "@tabler/icons-react";
import { BtnSubmit } from "../../../components";
import { useDirectorStore, useUsersStore } from "../../../hooks";


export const FormDirector = ({ form }) => {
    const { startLoadUsers, users } = useUsersStore();
    const { activateDirector } = useDirectorStore();

    useEffect(() => {
        if (activateDirector !== null) {
            console.log(activateDirector.cdgo_dprtmnto);
            startLoadUsers({ cdgo_direccion: null });
            form.setValues({
                id_jefe:
                    activateDirector.jefe_id.toString() !== null
                        ? activateDirector.jefe_id.toString()
                        : null,
                id_encargado:
                    activateDirector.encargado_id.toString !== null
                        ? activateDirector.encargado_id.toString()
                        : null,
            });
            return;
        }
    }, [activateDirector]);

    const handleChangePosition = (e) => {
        e.preventDefault();
        form.setValues({
            id_encargado:
                activateDirector.jefe_id.toString() !== null
                    ? activateDirector.jefe_id.toString()
                    : null,
            id_jefe:
                activateDirector.encargado_id.toString !== null
                    ? activateDirector.encargado_id.toString()
                    : null,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.values);
    }

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Group justify="center">
                    <ActionIcon
                        variant="light"
                        radius="xl"
                        aria-label="Cambio de roles"
                        onClick={(e) => handleChangePosition(e)}
                    >
                        <IconArrowsUpDown
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
                <Select
                    label="Director/Jefe Inmediato"
                    placeholder="Seleccione director"
                    {...form.getInputProps("id_jefe")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />
                <Select
                    label="Director Encargado"
                    placeholder="Seleccione director encargado"
                    {...form.getInputProps("id_encargado")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />
                <BtnSubmit fontSize={16} IconSection={IconRotate}>Realizar Cambio</BtnSubmit>
            </Stack>
        </Box>
    );
};
