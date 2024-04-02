import { useEffect } from "react";
import { Box, Divider, Flex, Grid, Group, Select, Text } from "@mantine/core";
import { IconChecks, IconUserScan } from "@tabler/icons-react";
import { useUiUser, useUsersStore } from "../../../hooks";
import { BtnSubmit } from "../../../components";

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
            <Grid>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Flex
                        mih={50}
                        gap="md"
                        justify="center"
                        align="center"
                        direction="column"
                        wrap="wrap"
                    >
                        <IconUserScan size={50} stroke={1.2} />
                        <Text>{activateUser?.nmbre_usrio}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={12} xl={12}>
                    <Select
                        required
                        data={[
                            { label: "Si", value: "1" },
                            { label: "No", value: "0" },
                        ]}
                        placeholder="¿Desea activar el usuario?"
                        label="Activar"
                        radius="md"
                        mb={20}
                        withAsterisk
                        {...form.getInputProps("actvo")}
                    />
                    <Divider />
                </Grid.Col>
            </Grid>
            <Group position="center" mt="xl">
                <BtnSubmit IconSection={IconChecks} fontSize={16}>
                    Guardar
                </BtnSubmit>
            </Group>
        </Box>
    );
};
