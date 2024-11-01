import { useEffect } from "react";
import {
    Autocomplete,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { useSexoStore, useUiUser, useUsersStore } from "../../../../hooks";

export const FormInfoUser = ({ form }) => {
    const { usu_ci, lgin } = form.values;
    const { verifiedUser, userVerified } = useUsersStore();
    const { isModalEditUser } = useUiUser();
    const { sexo } = useSexoStore();

    useEffect(() => {
        if (!isModalEditUser && lgin !== "" && lgin.length > 4) {
            setTimeout(() => {
                //console.log("verified");
                verifiedUser({ lgin });
            }, 2000);
            return;
        }
    }, [usu_ci, lgin, isModalEditUser]);

    useEffect(() => {
        if (userVerified !== null) {
            form.setFieldError("lgin", "Usuario ya existe");
        } else {
            form.clearFieldError("lgin");
        }

        /* return () => {
            form.clearFieldError("lgin");
        } */
    }, [userVerified]);

    return (
        <Stack
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="lg"
        >
            <TextInput
                required
                label="Número de cedula"
                placeholder="Digite la cédula del usuario"
                {...form.getInputProps("usu_ci")}
            />
            <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2 }}>
                <TextInput
                    required
                    label="Titulo"
                    placeholder="Sr, Ing, Lic"
                    {...form.getInputProps("titulo")}
                />
                <TextInput
                    required
                    label="Nombres completos"
                    placeholder="Digite los nombres completos"
                    {...form.getInputProps("usu_nombres")}
                />
                <TextInput
                    required
                    label="Apellido Paterno"
                    placeholder="Digite el apellido paterno"
                    {...form.getInputProps("usu_ape_pat")}
                />

                <TextInput
                    required
                    label="Apellido Materno"
                    placeholder="Digite el apellido materno"
                    {...form.getInputProps("usu_ape_mat")}
                />

                <Autocomplete
                    required
                    label="Correo institucional"
                    placeholder="Digite el correo institucional"
                    {...form.getInputProps("email")}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Sexo"
                    placeholder="Seleccione el sexo del usuario"
                    {...form.getInputProps("sexo")}
                    data={sexo.map((s) => {
                        return {
                            value: s.idnom_sexo.toString(),
                            label: s.nom_sexo,
                        };
                    })}
                />

                <TextInput
                    required
                    label="Usuario login"
                    placeholder="Digite el usuario"
                    {...form.getInputProps("lgin")}
                />

                <Select
                    required
                    searchable
                    clearable
                    label="Usuario activo"
                    placeholder="¿Activo para acceder?"
                    defaultValue="1"
                    {...form.getInputProps("actvo")}
                    data={[
                        { value: "1", label: "Si" },
                        { value: "2", label: "No" },
                    ]}
                />
            </SimpleGrid>
        </Stack>
    );
};
