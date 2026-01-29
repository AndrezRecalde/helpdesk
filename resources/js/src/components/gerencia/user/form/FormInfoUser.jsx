import { useEffect, useMemo, useState } from "react";
import {
    Autocomplete,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { useSexoStore, useUiUser, useUsersStore } from "../../../../hooks";

export const FormInfoUser = ({ form }) => {
    const { usu_ci, lgin, email } = form.values;
    const { verifiedUser, userVerified } = useUsersStore();
    const { isModalEditUser } = useUiUser();
    const { sexo } = useSexoStore();

    const [emailInput, setEmailInput] = useState(email || "");

    const loadVerifiedUser = async (lgin) => {
        await verifiedUser({ lgin });
    };

    useEffect(() => {
        if (!isModalEditUser && lgin !== "" && lgin.length > 4) {
            setTimeout(() => {
                loadVerifiedUser(lgin);
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
    }, [userVerified]);

    // Generar sugerencias de email
    const emailSuggestions = useMemo(() => {
        if (!emailInput || emailInput.includes("@")) {
            return [];
        }
        return [`${emailInput}@gadpe.gob.ec`];
    }, [emailInput]);

    // Manejar cambios en el email
    const handleEmailChange = (value) => {
        setEmailInput(value);
        form.setFieldValue("email", value);
    };

    // Sincronizar con el valor del formulario cuando se edita
    useEffect(() => {
        if (email !== emailInput) {
            setEmailInput(email || "");
        }
    }, [email]);

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
                    label="Correo institucional"
                    placeholder="Digite el correo institucional"
                    value={emailInput}
                    onChange={handleEmailChange}
                    data={emailSuggestions}
                    error={form.errors.email}
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
                        { value: "0", label: "No" },
                    ]}
                />
            </SimpleGrid>
        </Stack>
    );
};
