import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { useEquipoStore, useSoporteStore, useUiSoporte } from "../../../hooks";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { FormDiagnosticar } from "../form/FormDiagnosticar";

export const ModalDiagnostico = () => {
    const { modalActionDiagnosticar, isOpenModalDiagnosticar } = useUiSoporte();

    const { setActivateSoporte } = useSoporteStore();
    const { startLoadEquiposInformaticos, clearEquiposInformaticos } =
        useEquipoStore();

    const form = useForm({
        initialValues: {
            id_sop: null,
            fecha_fin: new Date(),
            id_area_tic: null,
            id_tipo_soporte: null,
            solucion: "",
            id_equipo: null,

            activo_informatico: false,
        },
        validate: {
            id_area_tic: isNotEmpty("Por favor ingrese el área"),
            id_tipo_soporte: isNotEmpty("Por favor ingrese el tipo"),
            solucion: hasLength(
                { min: 5, max: 350 },
                "La solución debe tener entre 10 y 350 caracteres"
            ),
            id_equipo: (value, values) =>
                values.id_tipo_soporte == 1 && value === null
                    ? "En soporte a hardware es obligatorio el código del activo"
                    : null,
        },
        transformValues: (values) => ({
            ...values,
            id_area_tic: Number(values.id_area_tic) || null,
            id_tipo_soporte: Number(values.id_tipo_soporte) || null,
            id_equipo: Number(values.id_equipo) || null,
        }),
    });

    useEffect(() => {
        if (isOpenModalDiagnosticar) {
            startLoadEquiposInformaticos();
            return;
        }

        return () => {
            clearEquiposInformaticos();
        };
    }, [isOpenModalDiagnosticar]);

    const handleCloseModal = () => {
        modalActionDiagnosticar(0);
        setActivateSoporte(null);
        form.reset();
    };

    return (
        <Modal
            closeOnClickOutside={false}
            opened={isOpenModalDiagnosticar}
            onClose={handleCloseModal}
            title="Diagnosticar soporte"
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormDiagnosticar form={form} />
        </Modal>
    );
};
