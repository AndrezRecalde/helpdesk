import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SolicitudConsumibleForm } from "../form/SolicitudConsumibleForm";
import {
    useSolicitudConsumibleStore,
    useUiSolicitudConsumible,
    useDireccionStore,
    useUsersStore,
    useInvConsumibleStore,
    useInvEquipoStore,
} from "../../../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const SolicitudConsumibleModal = () => {
    const { isOpenModalSolicitud, modalActionSolicitud } =
        useUiSolicitudConsumible();
    const { startCreateSolicitud, message, errores, clearMessages } =
        useSolicitudConsumibleStore();
    const { users } = useUsersStore();
    const { direcciones } = useDireccionStore();
    const { consumibles } = useInvConsumibleStore();
    const { invEquiposBajas, startSearchEquipos } = useInvEquipoStore();

    const form = useForm({
        initialValues: {
            departamento_id: null,
            usuario_solicita: null,
            //usuario_autoriza: null,
            equipo_id: null,
            observaciones: "",
            consumibles: [{ id: null, cantidad: 1 }],
        },
        validate: {
            departamento_id: (value) =>
                !value ? "Seleccione un departamento" : null,
            usuario_solicita: (value) =>
                !value ? "Seleccione un solicitante" : null,
            //usuario_autoriza: (value) =>
            //    !value ? "Seleccione un autorizador" : null,
            equipo_id: (value) => (!value ? "Seleccione un equipo" : null),
            consumibles: {
                id: (value) => (!value ? "Seleccione un consumible" : null),
                cantidad: (value) =>
                    value < 1 ? "La cantidad debe ser mayor a 0" : null,
            },
        },
        transformValues: (values) => ({
            ...values,
            departamento_id: parseInt(values.departamento_id),
            usuario_solicita: parseInt(values.usuario_solicita),
            //usuario_autoriza: parseInt(values.usuario_autoriza),
            equipo_id: parseInt(values.equipo_id),
            consumibles: values.consumibles.map((c) => ({
                id: parseInt(c.id),
                cantidad: parseInt(c.cantidad),
            })),
        }),
    });

    const handleSubmit = async (values) => {
        const result = await startCreateSolicitud(values);
        if (result.success) {
            form.reset();
            modalActionSolicitud(false);
        }
    };

    useEffect(() => {
        if (message) {
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: message,
                showConfirmButton: false,
                timer: 2000,
            });
            clearMessages();
        }
    }, [message]);

    useEffect(() => {
        if (errores) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errores,
                showConfirmButton: true,
            });
            clearMessages();
        }
    }, [errores]);

    // Cargar equipos cuando cambia el departamento
    useEffect(() => {
        if (form.values.departamento_id) {
            startSearchEquipos({
                direccion_id: parseInt(form.values.departamento_id),
            });
        }
    }, [form.values.departamento_id]);

    return (
        <Modal
            opened={isOpenModalSolicitud}
            onClose={() => {
                modalActionSolicitud(false);
                form.reset();
            }}
            title="Nueva Solicitud de Consumibles"
            size="xl"
            centered
        >
            <SolicitudConsumibleForm
                form={form}
                users={users}
                direcciones={direcciones}
                consumibles={consumibles}
                equipos={invEquiposBajas}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
};
