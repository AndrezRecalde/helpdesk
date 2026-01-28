import { useEffect } from "react";
import { Modal } from "@mantine/core";
import {
    InvConsumibleSolicitudForm,
    TextSection,
} from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useDireccionStore,
    //useInvConsumibleStore,
    useInvEquipoStore,
    useUiInvConsumible,
    useUsersStore,
} from "../../../../hooks";
import dayjs from "dayjs";

export const InvSolicitudConsumibleModal = () => {
    const { isOpenModalSolicitudConsumible, modalActionSolicitudConsumible } =
        useUiInvConsumible();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadDirecciones, clearDirecciones } = useDireccionStore();
    const { startSearchEquipos, startClearInvEquipos } = useInvEquipoStore();

    const form = useForm({
        initialValues: {
            usuario_solicita: "",
            usuario_autoriza: "",
            departamento_id: "",
            equipo_id: "",
            fecha: null,
            consumibles: [{ id: "", cantidad: 1 }],
        },

        validate: {
            usuario_solicita: (value) =>
                value === "" || value === null
                    ? "Por favor ingrese solicitante"
                    : null,

            usuario_autoriza: (value) =>
                value === "" || value === null
                    ? "Por favor ingrese autorizador"
                    : null,

            departamento_id: (value) =>
                value === "" || value === null
                    ? "Por favor ingrese departamento"
                    : null,

            equipo_id: (value) =>
                value === "" || value === null
                    ? "Por favor ingrese el activo informático"
                    : null,
        },

        transformValues: (values) => ({
            usuario_solicita:
                values.usuario_solicita !== ""
                    ? Number(values.usuario_solicita)
                    : null,

            usuario_autoriza:
                values.usuario_autoriza !== ""
                    ? Number(values.usuario_autoriza)
                    : null,

            departamento_id:
                values.departamento_id !== ""
                    ? Number(values.departamento_id)
                    : null,

            equipo_id:
                values.equipo_id !== "" ? Number(values.equipo_id) : null,

            fecha: dayjs(values.fecha).isValid()
                ? dayjs(values.fecha).format("YYYY-MM-DD")
                : null,

            consumibles: values.consumibles.map((consumible) => ({
                id: consumible.id !== "" ? Number(consumible.id) : null,
                cantidad: Number(consumible.cantidad) || 1,
            })),
        }),
    });

    const { departamento_id } = form.values;

    useEffect(() => {
        if (isOpenModalSolicitudConsumible) {
            startLoadUsersGeneral({});
            //startLoadInvConsumibles({});
            startLoadDirecciones();
        }

        return () => {
            clearUsers();
            //startClearInvConsumibles();
            clearDirecciones();
            startClearInvEquipos();
        };
    }, [isOpenModalSolicitudConsumible]);

    useEffect(() => {
        startSearchEquipos({ direccion_id: departamento_id });
        form.setFieldValue("equipo_id", null);
    }, [departamento_id]);

    const handleCloseModal = () => {
        modalActionSolicitudConsumible(false);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalSolicitudConsumible}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Solicitud Consumible
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvConsumibleSolicitudForm form={form} />
        </Modal>
    );
};
