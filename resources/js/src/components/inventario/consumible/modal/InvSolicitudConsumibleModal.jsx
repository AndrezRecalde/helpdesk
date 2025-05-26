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
            usuario_solicita: null,
            usuario_autoriza: null,
            departamento_id: null,
            equipo_id: null,
            fecha: null,
            consumibles: [{ id: null, cantidad: 1 }],
        },
        validate: {
            usuario_solicita: isNotEmpty("Por favor ingrese solicitante"),
            usuario_autoriza: isNotEmpty("Por favor ingrese autorizador"),
            departamento_id: isNotEmpty("Por favor ingrese departamento"),
            equipo_id: isNotEmpty("Por favor ingrese el activo informatico"),
        },
        transformValues: (values) => ({
            usuario_solicita: Number(values.usuario_solicita) || null,
            usuario_autoriza: Number(values.usuario_autoriza) || null,
            departamento_id: Number(values.departamento_id) || null,
            equipo_id: Number(values.equipo_id) || null,
            fecha: dayjs(values.fecha).isValid() ? dayjs(values.fecha).format("YYYY-MM-DD") : null,
            consumibles: values.consumibles.map((consumible) => ({
                id: Number(consumible.id) || null,
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
