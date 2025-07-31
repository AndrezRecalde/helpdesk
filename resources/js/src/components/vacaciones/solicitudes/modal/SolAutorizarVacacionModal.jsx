import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Modal } from "@mantine/core";
import { SolAutorizarForm } from "../form/SolAutorizarForm";
import {
    usePeriodoStore,
    useUiVacaciones,
    useVacacionesStore,
} from "../../../../hooks";
import { TextSection } from "../../../../components";
import { randomId } from "@mantine/hooks";

export const SolAutorizarVacacionModal = () => {
    const { setActivateVacacion, activateVacacion } = useVacacionesStore();
    const { isOpenModalGestionarVacacion, modalActionGestionarVacacion } =
        useUiVacaciones();
    const { startLoadPeriodosByUser, startClearPeriodos } = usePeriodoStore();

    const form = useForm({
        initialValues: {
            estado_id: null,
            periodos: [
                {
                    periodo_id: null,
                    dias_usados: 0,
                    dias_disponibles: 0,
                    observacion: "",
                    key: randomId(),
                },
            ],
        },
        validate: {
            periodos: (values) => {
                const errors = values.map((periodo) => {
                    const error = {};

                    if (!periodo.periodo_id) {
                        error.periodo_id = "Periodo requerido";
                    }

                    if (periodo.dias_usados <= 0) {
                        error.dias_usados =
                            "Los días usados deben ser mayores a cero";
                    }

                    return Object.keys(error).length > 0 ? error : null;
                });

                // Si no hay errores en ningún item (es decir, todo es null), devuelve null
                const hasErrors = errors.some((e) => e !== null);
                return hasErrors ? errors : null;
            },
        },
        transformValues: (values) => ({
            estado_id: Number(values.estado_id) || null,
            periodos: values.periodos.map((periodo) => ({
                periodo_id: Number(periodo.periodo_id) || null,
                dias_usados: Number(periodo.dias_usados) || 0,
                observacion: periodo.observacion?.trim() || "",
            })),
        }),
    });

    useEffect(() => {
        if (isOpenModalGestionarVacacion && activateVacacion !== null) {
            startLoadPeriodosByUser(activateVacacion.cdgo_usrio);
        }

        return () => {
            startClearPeriodos();
        };
    }, [isOpenModalGestionarVacacion, activateVacacion]);

    const handleCloseModal = () => {
        modalActionGestionarVacacion(false);
        setActivateVacacion(null);
    };

    return (
        <Modal
            size="xl"
            radius="md"
            opened={isOpenModalGestionarVacacion}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fw={500} fz={16}>
                    Autorizar Solicitud
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <SolAutorizarForm form={form} />
        </Modal>
    );
};
