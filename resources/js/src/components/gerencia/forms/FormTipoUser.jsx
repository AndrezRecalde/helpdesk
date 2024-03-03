import { Grid, Select, TextInput } from "@mantine/core";

export const FormTipoUser = () => {
    return (
        <Grid>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    searchable
                    clearable
                    label="Tecnico"
                    placeholder="¿El usuario es tecnico?"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    searchable
                    clearable
                    label="Secretaria"
                    placeholder="¿El usuario es secretario/a?"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    searchable
                    clearable
                    label="Super-usuario"
                    placeholder="¿El usuario es superusuario?"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Interno"
                    placeholder="¿El usuario es interno?"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Select
                    searchable
                    clearable
                    label="Estado"
                    placeholder="Estado del usuario"
                    data={[]}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <TextInput
                    label="Alias"
                    placeholder="Digite el alias del usuario"
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <TextInput
                    label="Creado por"
                    placeholder="Paola Constantini"
                    disabled
                />
            </Grid.Col>
        </Grid>
    );
};
