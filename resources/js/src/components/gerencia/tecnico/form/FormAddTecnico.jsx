import { useEffect } from "react";
import {
    Box,
    Select,
    Stack,
    Radio,
    Group,
    MultiSelect,
    Text,
} from "@mantine/core";
import { IconUserBolt } from "@tabler/icons-react";
import {
    useTecnicoStore,
    useUiTecnico,
    useUsersStore,
    useAreaTicStore,
} from "../../../../hooks";
import { BtnSubmit } from "../../..";

export const FormAddTecnico = ({ form }) => {
    const { disabledInput, toggleModalTecnico } = useUiTecnico();
    const { isLoading, startAddUpdateTecnico, activateTecnico } =
        useTecnicoStore();
    const { users } = useUsersStore();
    const { areas, startLoadAreas } = useAreaTicStore();

    useEffect(() => {
        // Cargar áreas TIC activas
        startLoadAreas(true);
    }, []);

    useEffect(() => {
        if (activateTecnico !== null) {
            form.setValues({
                cdgo_usrio: activateTecnico.cdgo_usrio?.toString(),
                roles: activateTecnico.role_id?.toString() || "",
                areas:
                    activateTecnico.areas?.map((a) =>
                        a.id_areas_tic.toString(),
                    ) || [],
                area_principal:
                    activateTecnico.areas
                        ?.find((a) => a.principal)
                        ?.id_areas_tic.toString() || null,
            });
            return;
        }
    }, [activateTecnico]);

    // Limpiar áreas al seleccionar rol Usuario
    useEffect(() => {
        if (form.values.roles === "") {
            form.setFieldValue("areas", []);
            form.setFieldValue("area_principal", null);
        }
    }, [form.values.roles]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddUpdateTecnico(form.getTransformedValues());
        toggleModalTecnico();
        form.reset();
    };

    const areasDisponibles = areas
        .filter((area) => area.activo)
        .map((area) => ({
            value: area.id_areas_tic.toString(),
            label: area.nombre,
        }));

    const areasPrincipales =
        form.values.areas?.map((areaId) => {
            const area = areas.find(
                (a) => a.id_areas_tic.toString() === areaId,
            );
            return {
                value: areaId,
                label: area?.nombre || areaId,
            };
        }) || [];

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
                    description="Seleccione el usuario a gestionar"
                    {...form.getInputProps("cdgo_usrio")}
                    data={users.map((user) => {
                        return {
                            value: user.cdgo_usrio.toString(),
                            label: user.nmbre_usrio,
                        };
                    })}
                />

                <Radio.Group
                    label="Rol del Usuario"
                    description="Selecciona el rol que tendrá este usuario"
                    {...form.getInputProps("roles")}
                >
                    <Group mt="xs">
                        <Radio value="1" label="Gerente" />
                        <Radio value="2" label="Técnico" />
                        <Radio
                            value=""
                            label="Usuario (Sin permisos especiales)"
                        />
                    </Group>
                </Radio.Group>

                {(form.values.roles === "1" || form.values.roles === "2") && (
                    <>
                        <MultiSelect
                            label="Áreas TIC Asignadas"
                            description="Selecciona las áreas donde trabajará este usuario"
                            placeholder="Seleccione las áreas"
                            data={areasDisponibles}
                            searchable
                            clearable
                            {...form.getInputProps("areas")}
                        />

                        {form.values.areas?.length > 0 && (
                            <Select
                                label="Área Principal"
                                description="Selecciona el área principal del usuario (prioridad en asignación automática)"
                                placeholder="Seleccione el área principal"
                                data={areasPrincipales}
                                clearable
                                {...form.getInputProps("area_principal")}
                            />
                        )}
                    </>
                )}

                {form.values.roles === "" && (
                    <Text size="sm" c="dimmed" mt="xs">
                        Al seleccionar "Usuario", se eliminarán todas las áreas
                        asignadas
                    </Text>
                )}

                <BtnSubmit IconSection={IconUserBolt} loading={isLoading}>
                    Realizar Cambio
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
