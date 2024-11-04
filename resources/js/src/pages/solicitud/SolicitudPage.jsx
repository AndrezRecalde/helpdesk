import { useEffect } from "react";
import { Paper, Text, Textarea, Group, Container, Box, Title } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { BtnSubmit, ContactIconsList, ModalAnularSoporte, ModalCierreSoportes } from "../../components";
import { useSoporteStore, useTitlePage, useUiSoporte } from "../../hooks";
import { IconBrandTelegram } from "@tabler/icons-react";
import { onLoadSoportes } from "../../store/soporte/soporteSlice";

import bg from "../../assets/images/bg.svg";
import classes from "../../assets/styles/modules/solicitud/GetInTouch.module.css";
import Swal from "sweetalert2";
import useSWR from "swr";
import { useDispatch } from "react-redux";

export const SolicitudPage = () => {
    useTitlePage("Helpdesk | Solicitud");
    const dispatch = useDispatch();
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const { modalActionCierreSoporte } = useUiSoporte();
    const { soportes, startLoadSoportesAtendidos, startSendSolicitud, isLoading, errores, message } = useSoporteStore();
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

    const { data, error, isLoading: loading } = useSWR(
        usuario?.cdgo_usrio,
        startLoadSoportesAtendidos,
        { refreshInterval: 2000 }
    )

    useEffect(() => {
        dispatch(onLoadSoportes(data?.soportes ? data?.soportes : []));
    }, [data]);

    useEffect(() => {
        if (soportes.length > 0) {
            modalActionCierreSoporte(1);
            return;
        }
        modalActionCierreSoporte(0);

    }, [soportes]);

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
        //console.log(form.values);
        startSendSolicitud(form.values);
        form.reset();
    };
    return (
        <Container my={50}>
            <Title order={3} mb={20}>
                Hola,{" "}
                <Text span c="teal.5" fs="italic" inherit>
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
                                <BtnSubmit loading={isLoading} IconSection={IconBrandTelegram}>
                                    Solicitar soporte
                                </BtnSubmit>
                            </Group>
                        </div>
                    </Box>
                </div>
            </Paper>
            <ModalCierreSoportes />
            <ModalAnularSoporte />
        </Container>
    );
};
