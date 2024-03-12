import { useEffect } from "react";
import { Paper, Text, Textarea, Group, Container, Box, Title } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { BtnSubmit, ContactIconsList } from "../../components";
import { useSoporteStore } from "../../hooks";
import { IconSend } from "@tabler/icons-react";

import bg from "../../assets/images/bg.svg";
import classes from "../../assets/styles/modules/solicitud/GetInTouch.module.css";
import Swal from "sweetalert2";

export const SolicitudPage = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { startSendSolicitud, isLoading, errores, message } = useSoporteStore();
    const form = useForm({
        initialValues: {
            incidente: "",
        },
        validate: {
            incidente: hasLength(
                { min: 5, max: 200 },
                "La incidencia debe tener entre 5 y 200 caracteres"
            ),
        },
    });

    useEffect(() => {
        if (message !== undefined) {
            Swal.fire({
                icon: message.status,
                text: message.msg,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [message]);

    useEffect(() => {
        if (errores !== undefined) {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: errores,
                confirmButtonColor: "#094293",
                footer: "Intentalo más tarde",
            });
            return;
        }
    }, [errores]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.values);
        startSendSolicitud(form.values);
        form.reset();
    };
    return (
        <Container my={50}>
            <Title order={3} mb={20}>
                Hola,{" "}
                <Text span c="blue.7" fs="italic" inherit>
                    {usuario.nmbre_usrio}
                </Text>{" "}
            </Title>
            <Paper shadow="md" radius="sm">
                <div className={classes.wrapper}>
                    <div
                        className={classes.contacts}
                        style={{ backgroundImage: `url(${bg})` }}
                    >
                        <Text
                            fz="lg"
                            fw={700}
                            className={classes.title}
                            c="#fff"
                        >
                            Información
                        </Text>

                        <ContactIconsList />
                    </div>

                    <Box
                        component="form"
                        className={classes.form}
                        onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
                    >
                        <Text fz="xl" fw={700} className={classes.title}>
                            Solicitud de Soporte
                        </Text>

                        <div className={classes.fields}>
                            <Textarea
                                withAsterisk
                                label="Incidencia"
                                placeholder="Escribe de manera puntual y breve tu incidencia"
                                autosize
                                minRows={5}
                                maxRows={5}
                                {...form.getInputProps("incidente")}
                            />

                            <Group justify="center" mt="md">
                                <BtnSubmit loading={isLoading} fontSize={14} IconSection={IconSend}>
                                    Solicitar soporte
                                </BtnSubmit>
                            </Group>
                        </div>
                    </Box>
                </div>
            </Paper>
        </Container>
    );
};
