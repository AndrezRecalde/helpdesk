import { useEffect } from "react";
import { Box, Divider, Stack, Table, TextInput } from "@mantine/core";
import { useStorageField, useUiUser, useUsersStore } from "../../../../hooks";
import { AlertSection, BtnSubmit } from "../../../../components";
import { IconAlertCircle } from "@tabler/icons-react";
import classes from "../../../../assets/styles/modules/layout/input/LabelsInputs.module.css";

export const FormCodigoBiometrico = ({ form }) => {
    const { activateUser, setActivateUser, startAddCodigoBiometrico } = useUsersStore();
    const { modalActionCodigoBiometrico } = useUiUser();
    const { storageUserFields } = useStorageField();

    useEffect(() => {
        if (activateUser !== null) {
            form.setValues({
                asi_id_reloj: activateUser.asi_id_reloj || "",
            });
            return;
        }
    }, [activateUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startAddCodigoBiometrico(
            activateUser.cdgo_usrio,
            form.values.asi_id_reloj,
            storageUserFields
        );
        setActivateUser(null);
        form.reset();
        modalActionCodigoBiometrico(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Divider my="xs" />
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <Table withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Servidor</Table.Th>
                            <Table.Th>Cedula</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                {activateUser?.nmbre_usrio ||
                                    "SIN DATOS NOMBRE"}
                            </Table.Td>
                            <Table.Td>
                                {activateUser?.usu_ci || "SIN DATOS CEDULACION"}
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <AlertSection
                    mt={0}
                    mb={0}
                    variant="light"
                    color="red.7"
                    title="¿Cómo se asigna el código biométrico?"
                    icon={IconAlertCircle}
                >
                    El código biométrico se genera a partir del número de cédula
                    y siempre debe tener <strong>9 dígitos</strong>. Para ello:
                    <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                        <li>
                            <strong>Si la cédula empieza con 0</strong>: se
                            omite el primer dígito (el 0) y se usan los 9
                            dígitos restantes.
                            <br />
                            <em>Ejemplo:</em>{" "}
                            <code>0823456789 → 823456789</code>
                        </li>
                        <li style={{ marginTop: 8 }}>
                            <strong>
                                Si la cédula empieza con otro número
                            </strong>
                            : se omite el último dígito y se usan los 9
                            primeros.
                            <br />
                            <em>Ejemplo:</em>{" "}
                            <code>1234567897 → 123456789</code>
                        </li>
                    </ul>
                </AlertSection>
                <TextInput
                    label="Codigo Biometrico"
                    placeholder="Ingrese el codigo biometrico"
                    classNames={classes}
                    {...form.getInputProps("asi_id_reloj")}
                />
                <BtnSubmit>Asignar codigo</BtnSubmit>
            </Stack>
        </Box>
    );
};
