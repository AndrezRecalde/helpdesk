import { useEffect } from "react";
import { ActionIcon, Box, Group, Select, Stack } from "@mantine/core";
import { IconArrowsUpDown, IconRotate } from "@tabler/icons-react";
import { BtnSubmit } from "../../..";
import {
    useDirectorStore,
    useUiDirector,
    useUsersStore,
} from "../../../../hooks";

export const FormDirector = ({ form }) => {
    const { users } = useUsersStore();
    const { isLoading, activateDirector, startUpdateDirector } =
        useDirectorStore();
    const { modalActionDirector } = useUiDirector();

    useEffect(() => {
        if (activateDirector !== null) {
            form.setValues({
                ...activateDirector,
                id_jefe:
                    activateDirector.id_jefe.toString() !== null
                        ? activateDirector.id_jefe.toString()
                        : null,
                id_encargado:
                    activateDirector.id_encargado.toString !== null
                        ? activateDirector.id_encargado.toString()
                        : null,
            });
            return;
        }
    }, [activateDirector]);

    const handleChangePositionDownUp = (e) => {
        e.preventDefault();
        form.setValues({
            ...activateDirector,
            id_encargado:
                activateDirector.id_jefe.toString() !== null
                    ? activateDirector.id_jefe.toString()
                    : null,
            id_jefe:
                activateDirector.id_encargado.toString !== null
                    ? activateDirector.id_encargado.toString()
                    : null,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.values);
        startUpdateDirector(form.values);
        modalActionDirector(0);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Group justify="center">
                    <ActionIcon
                        size={42}
                        variant="default"
                        aria-label="Cambio de roles"
                        onClick={(e) => handleChangePositionDownUp(e)}
                    >
                        <IconArrowsUpDown
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
                <Select
                    searchable
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
                    searchable
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
                <BtnSubmit
                    fontSize={16}
                    IconSection={IconRotate}
                    loading={isLoading}
                >
                    Realizar Cambio
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
