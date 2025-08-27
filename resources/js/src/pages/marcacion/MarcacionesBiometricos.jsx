import { useEffect } from "react";
import { Container, Divider, Group } from "@mantine/core";
import {
    AlertSection,
    BtnAddActions,
    FilterFormSearchDates,
    ReporteJustificativoModal,
    TableMarcacionRelojOnline,
    TitlePage,
} from "../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMarcacionStore, useTitlePage, useUiMarcacion } from "../../hooks";
import dayjs from "dayjs";
import {
    IconAlertCircle,
    IconLicense,
    IconTextScan2,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MarcacionesBiometricos = () => {
    const usuario = JSON.parse(localStorage.getItem("service_user"));
    const {
        isLoadingExport,
        message,
        errores,
        startLoadMarcacionesBiometricos,
        clearMarcaciones,
    } = useMarcacionStore();
    const { modalActionGenerarReporte } = useUiMarcacion();
    const navigate = useNavigate();
    useTitlePage("Intranet | Marcaciones");

    const form = useForm({
        initialValues: {
            fecha_inicio: null,
            fecha_fin: null,
            asi_id_reloj: usuario.asi_id_reloj,
        },
        validate: {
            fecha_inicio: isNotEmpty("Por favor ingrese fecha inicio"),
            fecha_fin: isNotEmpty("Por favor ingrese fecha fin"),
        },
        transformValues: (values) => ({
            asi_id_reloj: String(values.asi_id_reloj),
            fecha_inicio: values.fecha_inicio
                ? dayjs(values.fecha_inicio).format("YYYY-MM-DD")
                : null,
            fecha_fin: values.fecha_fin
                ? dayjs(values.fecha_fin).format("YYYY-MM-DD")
                : null,
        }),
    });

    useEffect(() => {
        //console.log(form.getTransformedValues());
        startLoadMarcacionesBiometricos(form.getTransformedValues());
        return () => {
            clearMarcaciones();
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
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
    }, [errores]);

    useEffect(() => {
        if (isLoadingExport === true) {
            Swal.fire({
                icon: "warning",
                text: "Un momento porfavor, se está exportando",
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        } else {
            Swal.close(); // Cierra el modal cuando isExport es false
        }
    }, [isLoadingExport]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form.getTransformedValues());
        startLoadMarcacionesBiometricos(form.getTransformedValues());
    };

    const handleGenerarReporte = () => {
        //console.log("clic");
        modalActionGenerarReporte(true);
    };

    const handleGenerarPermiso = () => {
        //console.log("clic");
        navigate("/intranet/permiso");
    };

    const menuActions = [
        {
            label: "Generar Reporte",
            icon: IconTextScan2,
            onClick: handleGenerarReporte,
            color: "teal",
        },
        {
            label: "Generar Permiso",
            icon: IconLicense,
            onClick: handleGenerarPermiso,
            color: "pink",
        },
    ];

    return (
        <Container size="xl">
            <Group justify="space-between" align="center" mb={10} mt={20}>
                <TitlePage order={1}>Marcaciones Biometricos</TitlePage>
                <BtnAddActions actions={menuActions}>Generar</BtnAddActions>
            </Group>
            <Divider my="md" />
            <FilterFormSearchDates
                form={form}
                handleSubmit={handleSubmit}
                title="Filtrar marcaciones"
            />

            <TableMarcacionRelojOnline usuario={usuario} />
            <AlertSection
                mt={20}
                mb={0}
                variant="light"
                color="red.7"
                title="¿No puedes visualizar tus marcaciones?"
                icon={IconAlertCircle}
            >
                Si no puedes visualizar tus marcaciones puedes reportar a la{" "}
                <Link to="/intranet/solicitud-soporte">administración</Link>
            </AlertSection>

            <ReporteJustificativoModal />
        </Container>
    );
};

export default MarcacionesBiometricos;
