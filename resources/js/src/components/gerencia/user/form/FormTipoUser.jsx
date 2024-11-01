import { Select, SimpleGrid, Stack } from "@mantine/core";
import { useUsersStore } from "../../../../hooks";

export const FormTipoUser = ({ form }) => {
    const { activateResponsable } = useUsersStore();
    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Tecnico"
                    placeholder="¿El usuario es tecnico?"
                    defaultValue="0"
                    {...form.getInputProps("tecnico")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Secretaria"
                    placeholder="¿El usuario es secretario/a?"
                    defaultValue="0"
                    {...form.getInputProps("secretaria_tic")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Super-usuario"
                    placeholder="¿El usuario es superusuario?"
                    defaultValue="0"
                    {...form.getInputProps("super_user")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Interno"
                    placeholder="¿El usuario es interno?"
                    defaultValue="1"
                    {...form.getInputProps("interno")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Estado"
                    placeholder="Estado del usuario"
                    defaultValue="1"
                    {...form.getInputProps("usu_estado")}
                    data={[
                        {
                            value: "1",
                            label: "Activo",
                        },
                        {
                            value: "2",
                            label: "Inactivo",
                        },
                        {
                            value: "4",
                            label: "Ausente por comisión de servicios",
                        },
                        {
                            value: "3",
                            label: "Otro",
                        },
                    ]}
                />
                <Select
                    disabled
                    required
                    searchable
                    clearable
                    label="Creado por"
                    {...form.getInputProps("usu_ing")}
                    data={activateResponsable.map((user) => {
                        return {
                            label: user.nmbre_usrio,
                            value: user.cdgo_usrio.toString(),
                        };
                    })}
                />
            </SimpleGrid>
        </Stack>
    );
};
