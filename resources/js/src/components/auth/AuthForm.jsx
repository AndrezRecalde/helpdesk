import { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
    Box,
    Checkbox,
    Group,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { AlertSection, BtnSubmit } from "../../components";
import { useAuthStore } from "../../hooks";
import { IconChevronsRight, IconInfoCircle } from "@tabler/icons-react";

export const AuthForm = () => {
    const { isLoading, startLogin, validate, errores } = useAuthStore();

    const form = useForm({
        initialValues: {
            lgin: "",
            paswrd: "",
            remember: false,
        },
        transformValues: (values) => ({
            ...values,
            lgin: values.lgin.toLowerCase(),
        }),
    });

    useEffect(() => {
        if (validate !== undefined) {
            form.setErrors(validate);
            return;
        }

        return () => {
            form.clearErrors();
        };
    }, [validate]);

    const handleLogin = (e) => {
        e.preventDefault();
        //startLogin(form.values);
        startLogin(form.getTransformedValues());
        //navigate("/u/profile", { replace: true })
    };

    return (
        <Box
            pos="relative"
            component="form"
            onSubmit={form.onSubmit((_, e) => handleLogin(e))}
        >
            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Stack p={30}>
                <TextInput
                    withAsterisk
                    label="Usuario"
                    placeholder="Digite su usuario"
                    {...form.getInputProps("lgin")}
                />
                <PasswordInput
                    withAsterisk
                    label="Contraseña"
                    placeholder="Tu contraseña"
                    {...form.getInputProps("paswrd")}
                />
                {errores ? (
                    <AlertSection
                        variant="light"
                        color="red.8"
                        icon={IconInfoCircle}
                        title="Error"
                    >
                        {errores}
                    </AlertSection>
                ) : null}
                <Group justify="space-between" mt="lg">
                    <Checkbox
                        label="Recuerdame"
                        {...form.getInputProps("remember", {
                            type: "checkbox",
                        })}
                    />
                    {/* <Anchor component="button" size="sm">
                        ¿Olvidó su contraseña?
                    </Anchor> */}
                </Group>
                <BtnSubmit mb={0} IconSection={IconChevronsRight}>
                    Acceder
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
