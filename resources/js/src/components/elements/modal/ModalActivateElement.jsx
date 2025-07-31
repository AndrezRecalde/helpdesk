import { useEffect } from "react";
import { Box, Modal, Select, Stack } from "@mantine/core";
import { BtnSubmit, TextSection } from "../../../components";
import { isNotEmpty, useForm } from "@mantine/form";

export const ModalActivateElement = ({
    isOpenModal,
    modalAction,
    titleModal,
    startAction,
    activateElement,
    setActivate,
}) => {

    const form = useForm({
        initialValues: {
            activo: "",
        },
        validate: {
            activo: isNotEmpty("Por favor seleccione el estado"),
        },
        transformValues: (values) => ({
            ...values,
            activo: Boolean(values.activo) || null,
        }),
    });

    useEffect(() => {
        if (activateElement !== null && isOpenModal) {
            form.setValues({
                ...activateElement,
                activo: activateElement.activo.toString(),
            });
            return;
        }
    }, [activateElement, isOpenModal]);

    const handleCloseModal = () => {
        modalAction(false);
        if (activateElement !== null && isOpenModal) {
            setActivate(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getValues())
        startAction(form.getValues());
        form.reset();
        modalAction(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModal}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    {titleModal}
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Box
                component="form"
                mx="auto"
                style={(theme) => ({
                    padding: theme.spacing.xs,
                })}
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <Stack
                    bg="var(--mantine-color-body)"
                    align="stretch"
                    justify="center"
                    gap="lg"
                >
                    <Select
                        required
                        label="Activo"
                        placeholder="Seleccione una opcion"
                        data={[
                            { label: "Si", value: "1" },
                            { label: "No", value: "0" },
                        ]}
                        nothingFoundMessage="Nada encontrado..."
                        clearable
                        key={form.key("activo")}
                        {...form.getInputProps("activo")}
                    />
                    <BtnSubmit>Guardar</BtnSubmit>
                </Stack>
            </Box>
        </Modal>
    );
};
