import { useEffect } from "react";
import {
    Textarea,
    Container,
    Card,
    Box,
    Divider,
    Group,
    ActionIcon,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import {
    BtnSubmit,
    ModalAnularSoporte,
    SoportesUsersTable,
    StatInfoDepartamento,
    TextSection,
    TitlePage,
} from "../../components";
import { useSoporteStore, useTitlePage } from "../../hooks";
import { IconBrandTelegram, IconEyeSearch } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { infoTics } from "../../helpers/infoStats";
import { useNavigate } from "react-router-dom";

const SolicitudPage = () => {
    useTitlePage("Helpdesk | Solicitud");
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const navigate = useNavigate();
    const {
        //isLoading,
        soportes,
        clearSoportes,
        startLoadSoportesActualesUsuarios,
        startSendSolicitud,
        errores,
        message,
    } = useSoporteStore();
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

    const tienePendiente = soportes?.some((soporte) => soporte.id_estado === 3);

    useEffect(() => {
        if (usuario?.cdgo_usrio) {
            startLoadSoportesActualesUsuarios(usuario.cdgo_usrio);
        }
    }, [usuario?.cdgo_usrio]);

    useEffect(() => {
        if (!usuario?.cdgo_usrio) return;

        const interval = setInterval(() => {
            startLoadSoportesActualesUsuarios(usuario.cdgo_usrio);
        }, 300000);

        return () => clearInterval(interval);
    }, [usuario?.cdgo_usrio]);

    useEffect(() => {
        return () => {
            clearSoportes();
        };
    }, []);

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

    const handleAction = () => {
        navigate("/intranet/soportes");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.values);
        startSendSolicitud(form.values);
        startLoadSoportesActualesUsuarios(usuario.cdgo_usrio);
        form.reset();
    };

    return (
        <Container my={30}>
            <Group justify="space-between">
                <TitlePage order={2}>Solicitud de Soporte Técnico</TitlePage>
                <ActionIcon
                    variant="default"
                    size="lg"
                    radius="xl"
                    aria-label="Help helpdesk"
                    onClick={handleAction}
                >
                    <IconEyeSearch
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Group>
            <Divider my="md" />
            <Box
                component="form"
                onSubmit={form.onSubmit((_, e) => handleSubmit(e))}
            >
                <StatInfoDepartamento infoDepartamento={infoTics} />
                <Card withBorder p="xl" radius="md" shadow="md" mt={5} mb={10}>
                    <Card.Section>
                        <TextSection tt="" fz={18} fw={500} mt={20} mb={20}>
                            ¿Como podemos ayudarte?, describenos tu incidencia.
                        </TextSection>
                    </Card.Section>
                    <Textarea
                        withAsterisk
                        label="Incidencia"
                        placeholder="Escribe de manera puntual y breve tu incidencia"
                        autosize
                        minRows={4}
                        maxRows={4}
                        {...form.getInputProps("incidente")}
                    />

                    <BtnSubmit
                        fullwidth={false}
                        mt={10}
                        disabled={tienePendiente}
                        //loading={isLoading}
                        IconSection={IconBrandTelegram}
                    >
                        Solicitar soporte
                    </BtnSubmit>
                    <Card.Section>
                        <SoportesUsersTable
                            isLoading={false}
                            //soportes={data?.soportes || []}
                        />
                    </Card.Section>
                </Card>
            </Box>

            {/* <ModalCierreSoportes /> */}
            <ModalAnularSoporte />
        </Container>
    );
};

export default SolicitudPage;
