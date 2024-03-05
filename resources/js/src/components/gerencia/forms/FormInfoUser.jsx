import { Autocomplete, Grid, Select, TextInput } from "@mantine/core";
import { useSexoStore, useUsersStore } from "../../../hooks";
import { useEffect } from "react";

export const FormInfoUser = ({ form }) => {
    const { usu_ci } = form.values;
    const { verifiedUser, userVerified } = useUsersStore();
    const { sexo } = useSexoStore();

    useEffect(() => {
        if (usu_ci !== "") {
            setTimeout(() => {
                console.log("verified");
                verifiedUser(usu_ci);
            }, 2000);
            return;
        }
    }, [usu_ci]);

    useEffect(() => {
        if (userVerified !== null) {
            form.setFieldError("usu_ci", "Usuario ya existe");
        } else {
            form.clearFieldError("usu_ci");
        }
    }, [userVerified]);

    return (
        <Grid>
            <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 12 }}>
                <TextInput
                    label="Numero de cedula"
                    placeholder="Digite la cédula del usuario"
                    {...form.getInputProps("usu_ci")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 3, sm: 3, md: 3, lg: 3 }}>
                <TextInput
                    label="Titulo"
                    placeholder="Sr, Ing, Lic"
                    {...form.getInputProps("titulo")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 9, sm: 9, md: 9, lg: 9 }}>
                <TextInput
                    label="Nombres completos"
                    placeholder="Digite el nombre"
                    {...form.getInputProps("nmbre_usrio")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <TextInput
                    label="Nombre formateado"
                    placeholder="Digite el nombre formateado"
                    {...form.getInputProps("nombre_formateado")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
                <Autocomplete
                    label="Correo institucional"
                    placeholder="Digite el correo"
                    {...form.getInputProps("email")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    searchable
                    clearable
                    label="Sexo"
                    placeholder="Seleccione el sexo"
                    {...form.getInputProps("sexo")}
                    data={sexo.map((s) => {
                        return {
                            value: s.idnom_sexo.toString(),
                            label: s.nom_sexo,
                        };
                    })}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <TextInput
                    label="Usuario login"
                    placeholder="Digite el usuario"
                    {...form.getInputProps("lgin")}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                <Select
                    searchable
                    clearable
                    label="Usuario activo"
                    placeholder="¿Activo para acceder?"
                    {...form.getInputProps("actvo")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "2", label: "No" },
                    ]}
                />
            </Grid.Col>
        </Grid>
    );
};
