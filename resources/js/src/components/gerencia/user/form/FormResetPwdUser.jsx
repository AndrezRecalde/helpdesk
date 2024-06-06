import { useEffect, useState } from "react";
import {
    Box,
    ActionIcon,
    CopyButton,
    Divider,
    Flex,
    PasswordInput,
    Stack,
    Tooltip,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconCheck,
    IconSend,
    IconUserScan,
} from "@tabler/icons-react";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { AlertSection, BtnSubmit, TextSection } from "../../../../components";

export const FormResetPwdUser = ({ form }) => {
    const { paswrd } = form.values;
    const { activateUser, startUpdatePassword } = useUsersStore();
    const { modalActionResetPwd } = useUiUser();
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        if (activateUser !== null) {
            form.setValues({
                ...activateUser,
            });
            return;
        }
    }, [activateUser]);

    useEffect(() => {
        if (paswrd === "1234") {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [paswrd]);

    const handleSubmit = () => {
        startUpdatePassword(form.values);
        //console.log(form.values);
        modalActionResetPwd(0);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack>
                <Flex
                    mih={30}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <CopyButton value="1234" timeout={2000}>
                        {({ copied, copy }) => (
                            <Tooltip
                                label={copied ? "Copiado" : "Copiar"}
                                withArrow
                                position="right"
                            >
                                <ActionIcon
                                    color={copied ? "teal.5" : "gray"}
                                    onClick={() =>
                                        form.setFieldValue("paswrd", "1234")
                                    }
                                    size="xl"
                                    variant="transparent"
                                >
                                    {copied ? (
                                        <IconCheck size={50} />
                                    ) : (
                                        <IconUserScan size={50} stroke={1.5} />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                    <TextSection tt="" fw={500} fz={18}>
                        {activateUser?.nmbre_usrio}
                    </TextSection>
                </Flex>
                <AlertSection
                    mt={0}
                    mb={0}
                    variant="light"
                    color="yellow.7"
                    title="¡Información!"
                    icon={IconAlertCircle}
                >
                    Por favor dar clic en el icono de la parte superior para
                    continuar con el reseteo de contraseña.
                </AlertSection>
                <PasswordInput
                    data-autofocus
                    disabled
                    label="Contraseña"
                    placeholder="Se debe realizar clic en el Botón superior"
                    {...form.getInputProps("paswrd")}
                />
                <Divider />
                <BtnSubmit
                    disabled={btnDisabled}
                    fontSize={16}
                    IconSection={IconSend}
                >
                    Resetear contraseña
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
