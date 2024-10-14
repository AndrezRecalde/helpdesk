import { useEffect, useState } from "react";
import { Box, Stack, TextInput } from "@mantine/core";
import { AlertSection, BtnSubmit, TextSection } from "../../../../components";
import { IconChecks, IconTrashOff } from "@tabler/icons-react";
import { useInvEquipoStore, useInvUiEquipo } from "../../../../hooks";

export const InvDeleteEquipoForm = ({ form }) => {
    const { codigo, serie } = form.values;
    const { activateInvEquipo, startDeleteInvEquipo } = useInvEquipoStore();
    const { modalActionDelete } = useInvUiEquipo();
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        if (activateInvEquipo !== null) {
            form.setValues({ ...activateInvEquipo });
            return;
        }
    }, [activateInvEquipo]);

    useEffect(() => {
        if (
            codigo === activateInvEquipo?.codigo_nuevo &&
            serie === activateInvEquipo?.numero_serie
        ) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [codigo, serie]);

    const handleSubmit = (e) => {
        e.preventDefault();
        startDeleteInvEquipo(activateInvEquipo);
        form.reset();
        modalActionDelete(false);
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
        >
            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="lg"
            >
                <AlertSection
                    variant="light"
                    color="teal.5"
                    title="Información"
                    icon={IconTrashOff}
                >
                    Para confirmar la eliminación, debe digitar el código nuevo
                    y número de serie del equipo
                </AlertSection>
                <div>
                    <TextSection tt="" ta="center" fw={500}>
                        Usted eliminará:{" "}
                        {activateInvEquipo?.nombre_marca +
                            " " +
                            activateInvEquipo?.modelo}
                    </TextSection>
                    <TextSection tt="" ta="center" fw={500} fs="italic">
                        {activateInvEquipo?.numero_serie}
                    </TextSection>
                </div>
                <TextInput
                    label="Código nuevo"
                    placeholder="Digite el código nuevo"
                    {...form.getInputProps("codigo")}
                />
                <TextInput
                    label="Número de serie"
                    placeholder="Digite el número de serie"
                    {...form.getInputProps("serie")}
                />
                <BtnSubmit
                    fontSize={16}
                    IconSection={IconChecks}
                    disabled={btnDisabled}
                >
                    Guardar
                </BtnSubmit>
            </Stack>
        </Box>
    );
};
