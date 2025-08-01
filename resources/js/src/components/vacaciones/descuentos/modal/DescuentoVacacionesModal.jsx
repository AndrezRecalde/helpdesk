import { useEffect } from "react";
import { Divider, Modal } from "@mantine/core";
import { DescuentoVacacionalForm, TextSection } from "../../../../components";
import {
    usePeriodoStore,
    useUiDescuento,
    useUsersStore,
} from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";

export const DescuentoVacacionesModal = () => {
    const { isOpenModalAddDescuento, modalActionDescuento } = useUiDescuento();
    const { startLoadUsersGeneral, clearUsers } = useUsersStore();
    const { startLoadPeriodos, startClearPeriodos } = usePeriodoStore();

    const form = useForm({
        initialValues: {
            usuario_id: null,
            nom_periodo_id: null,
            dias_descuento: 0,
            motivo: "",
        },
        validate: {
            usuario_id: isNotEmpty("El usuario es requerido"),
            nom_periodo_id: isNotEmpty("El periodo es requerido"),
            dias_descuento: isNotEmpty("Los días de descuento son requeridos"),
            motivo: isNotEmpty("El motivo es requerido"),
        },
        transformValues: (values) => ({
            ...values,
            usuario_id: Number(values.usuario_id),
            nom_periodo_id: Number(values.nom_periodo_id),
            dias_descuento: Number(values.dias_descuento),
        }),
    });

    const { usuario_id } = form.values;

    useEffect(() => {
        if (isOpenModalAddDescuento) {
            startLoadUsersGeneral({});
        }

        return () => {
            clearUsers();
        };
    }, [isOpenModalAddDescuento]);

    useEffect(() => {
        if (usuario_id !== null) {
            startLoadPeriodos({});
        }

        return () => {
            startClearPeriodos();
        };
    }, [usuario_id]);

    const handleCloseModal = () => {
        modalActionDescuento(false);
    };

    return (
        <Modal
            opened={isOpenModalAddDescuento}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Ingresar Descuento Vacacional
                </TextSection>
            }
            size="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Divider my="xs" />
            <DescuentoVacacionalForm form={form} />
        </Modal>
    );
};
