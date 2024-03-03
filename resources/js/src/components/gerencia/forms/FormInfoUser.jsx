import { Autocomplete, Grid, Loader, Select, TextInput } from "@mantine/core";
import { useUiUser } from "../../../hooks";
import { useRef, useState } from "react";

export const FormInfoUser = ({ form }) => {
    const { modalActionUser } = useUiUser();

    /* const timeoutRef = useRef(-1); */
    /* const [value, setValue] = useState(""); */
    /* const [loading, setLoading] = useState(false); */
    /* const [data, setData] = useState([]); */

    /* const handleChange = (val) => {
        window.clearTimeout(timeoutRef.current);
        setValue(val);
        setData([]);

        if (val.trim().length === 0 || val.includes("@")) {
            setLoading(false);
            form.setFieldError("email");
        } else {
            setLoading(true);
            timeoutRef.current = window.setTimeout(() => {
                setLoading(false);
                setData(
                    ["gadpe.gob.ec"].map((provider) => `${val}@${provider}`)
                );
                form.setFieldValue("email", data);
            }, 1000);
        }
    }; */

    const handleSubmit = (e) => {
        e.preventDefault();
        modalActionUser(0);
    };
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
                    data={[
                        { value: "1", label: "Masculino" },
                        { value: "2", label: "Femenino" },
                    ]}
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
                    placeholder="Elige el status"
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
