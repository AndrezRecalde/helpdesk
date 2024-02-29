import { Box, Grid, Select, TextInput } from "@mantine/core";
import { useUiUser } from "../../../hooks";
import { DateInput } from "@mantine/dates";
import { BtnSubmit } from "../../../components";
import { IconChevronsRight } from "@tabler/icons-react";

export const FormUser = () => {
    const { modalActionUser } = useUiUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        modalActionUser(0);
    };
    return (
        <Box
            component="form"
            mx="auto"
            style={{
                padding: "var(--mantine-spacing-md)",
            }}
            onSubmit={() => console.log('clic')} //form.onSubmit((_, e) => handleSubmit(e))
        >
            <Grid>
                <Grid.Col span={{ base: 3, sm: 3, md: 3, lg: 3 }}>
                    <TextInput label="Titulo" placeholder="Sr, Ing, Lic" />
                </Grid.Col>
                <Grid.Col span={{ base: 9, sm: 9, md: 9, lg: 9 }}>
                    <TextInput
                        label="Nombres completos"
                        placeholder="Digite el nombre"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <TextInput
                        label="Nombre formateado"
                        placeholder="Digite el nombre formateado"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Empresa"
                        placeholder="Elige la empresa"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Cargo"
                        placeholder="Elige el cargo"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Usuario activo"
                        placeholder="Elige el status"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <TextInput
                        label="Usuario login"
                        placeholder="Digite el usuario"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <TextInput
                        label="Usuario login"
                        placeholder="Digite el usuario"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <TextInput label="Email" placeholder="Digite el email" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Departamento"
                        placeholder="Departamento"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Sexo"
                        placeholder="Seleccione el sexo"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="¿Es técnico?"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="¿Es Secretaria TIC?"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="¿Super-usuario?"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Interno"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Contrato fecha vencimiento"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <DateInput
                        label="Fecha de finalización"
                        placeholder="Digite la fecha"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Estado"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Tipo de usuario"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <Select
                        searchable
                        clearable
                        label="Tipo de contrato"
                        placeholder="Seleccione"
                        data={[]}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <TextInput
                        label="Alias"
                        placeholder="Digite el alias"
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                    <TextInput
                        label="Creado por"
                    />
                </Grid.Col>
            </Grid>
            <BtnSubmit IconSection={IconChevronsRight}>Agregar usuario</BtnSubmit>
        </Box>
    );
};
