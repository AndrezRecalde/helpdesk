import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { TextSection, FormDiagnosticar } from "../../../components";
import { useEquipoStore, useSoporteStore, useUiSoporte } from "../../../hooks";

export const ModalDiagnostico = ({ option }) => {
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
                { min: 10, max: 600 },
                "La solución debe tener entre 10 y 500 caracteres"
            ),
            id_equipo: (value, values) =>
                values.id_tipo_soporte == 1 && value === null
                    ? "En soporte a hardware es obligatorio el código del activo"
                    : null,
        },
        transformValues: (values) => ({
            ...values,
            fecha_fin: values.fecha_fin.toLocaleString("sv-SE", {
                timeZone: "America/Guayaquil",
            }),
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
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Diagnosticar soporte
                </TextSection>
            }
            size="xl"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FormDiagnosticar form={form} option={option} />
        </Modal>
    );
};
