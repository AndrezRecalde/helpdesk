import { Grid, Select, TextInput } from "@mantine/core";
import { useUsersStore } from "../../../../hooks";

export const FormTipoUser = ({ form }) => {
    const { activateResponsable } = useUsersStore();
    return (
        <Grid>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Tecnico"
                    placeholder="¿El usuario es tecnico?"
                    {...form.getInputProps("tecnico")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Secretaria"
                    placeholder="¿El usuario es secretario/a?"
                    {...form.getInputProps("secretaria_tic")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Super-usuario"
                    placeholder="¿El usuario es superusuario?"
                    {...form.getInputProps("super_user")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Interno"
                    placeholder="¿El usuario es interno?"
                    {...form.getInputProps("interno")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "0", label: "No" },
                    ]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Select
                    required
                    searchable
                    clearable
                    label="Estado"
                    placeholder="Estado del usuario"
                    {...form.getInputProps("usu_estado")}
                    data={[
                        { value: "1", label: "Activo" },
                        {
                            value: "2",
                            label: "Inactivo",
                        },
                        {
                            value: "4",
                            label: "Ausente por comisión de servicios",
                        },
                        { value: "3", label: "Otro" },
                    ]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <TextInput
                    required
                    label="Alias"
                    placeholder="Digite el alias del usuario"
                    {...form.getInputProps("usu_alias")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
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
            </Grid.Col>
        </Grid>
    );
};
