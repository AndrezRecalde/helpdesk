import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { FormAsignarSoporte, TextSection } from "../../../components";
import { useSoporteStore, useTecnicoStore, useUiSoporte } from "../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
//import dayjs from "dayjs";

export const ModalAsignarSoporte = () => {
    const { startLoadTecnicos, clearTecnicos } = useTecnicoStore();
    const { setActivateSoporte } = useSoporteStore();
    const { isOpenModalAsignarSoporte, modalActionAsignarSoporte } =
        useUiSoporte();

    const form = useForm({
        initialValues: {
            //id_usu_tecnico: null,
            id_tipo_soporte: null,
            id_area_tic: null,
            //id_estado: 5,
            id_usu_tecnico_asig: null,
        },
        validate: {
            id_tipo_soporte: isNotEmpty("Por favor seleccione una opción"),
            id_area_tic: isNotEmpty("Por favor seleccione una opción"),
            //id_estado: isNotEmpty("Por favor seleccione una opción"),
            id_usu_tecnico_asig: isNotEmpty("Por favor seleccione un técnico"),
        },
        transformValues: (values) => ({
            ...values,
            id_tipo_soporte: Number(values.id_tipo_soporte) || null,
            id_area_tic: Number(values.id_area_tic) || null,
            id_usu_tecnico_asig: Number(values.id_usu_tecnico_asig) || null,
        }),
    });

    useEffect(() => {
        if (isOpenModalAsignarSoporte) {
            startLoadTecnicos();
            return;
        }

        return () => {
            clearTecnicos();
        };
    }, [isOpenModalAsignarSoporte]);

    const handleCloseModal = () => {
        setActivateSoporte(null);
        form.reset();
        modalActionAsignarSoporte(0);
    };

    return (
        <Modal
            opened={isOpenModalAsignarSoporte}
            onClose={handleCloseModal}
            title={<TextSection tt="" fw={500} fz={16}>Asignar soporte</TextSection>}
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormAsignarSoporte form={form} />
        </Modal>
    );
};
