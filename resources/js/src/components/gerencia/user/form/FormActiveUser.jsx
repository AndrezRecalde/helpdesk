import { useEffect } from "react";
import {
    Box,
    Divider,
    Flex,
    Select,
    Stack,
} from "@mantine/core";
import { IconChecks, IconUserScan } from "@tabler/icons-react";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { BtnSubmit, TextSection } from "../../../../components";

export const FormActiveUser = ({ form }) => {
    const { modalActionActiveUser } = useUiUser();
    const { activateUser, startUpdateActivoUser } = useUsersStore();

    useEffect(() => {
        if (activateUser !== null) {
            form.setValues({
                ...activateUser,
                actvo: activateUser.actvo.toString(),
            });
            return;
        }
    }, [activateUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.values);
        startUpdateActivoUser(form.values);
        modalActionActiveUser(0);
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
                    <IconUserScan size={50} stroke={1.2} />
                    <TextSection tt="" fz={16}>{activateUser?.nmbre_usrio}</TextSection>
                </Flex>
                <Select
                    required
                    data={[
                        { label: "Si", value: "1" },
                        { label: "No", value: "0" },
                    ]}
                    placeholder="¿Desea activar el usuario?"
                    label="Activar"
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("actvo")}
                />
                <Divider />
                <BtnSubmit IconSection={IconChecks} fontSize={16}>
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
