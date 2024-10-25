import { Modal } from "@mantine/core";
import { InvEquipoForm, TextSection } from "../../../../components";
import {
    useInvConceptoStore,
    //useInvCategoriaStore,
    useInvEquipoStore,
    useInvEstadoStore,
    useInvMarcaStore,
    useInvTipocategoriaStore,
    useInvUbicacionStore,
    useInvUiEquipo,
} from "../../../../hooks";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

export const InvEquipoModal = () => {
    const { activateInvEquipo, setActivateInvEquipo } = useInvEquipoStore();
    const { isOpenModalInvEquipo, modalActionEquipo } = useInvUiEquipo();

    const { startLoadInvUbicaciones, startClearInvUbicaciones } =
        useInvUbicacionStore();
    const { startLoadTiposcategorias, startClearTiposcategorias } =
        useInvTipocategoriaStore();
    /* const { startLoadInvCategorias, startClearInvCategorias } =
        useInvCategoriaStore(); */
    const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();
    const { startLoadInvMarcas, startClearInvMarcas } = useInvMarcaStore();
    const { startLoadInvConceptos, startClearInvConceptos } = useInvConceptoStore();

    const form = useForm({
        initialValues: {
            //nombre_equipo: "",
            modelo: "",
            numero_serie: "",
            codigo_antiguo: "",
            codigo_nuevo: "",
            fecha_adquisicion: new Date(),
            fecha_amortizacion: new Date(),
            vida_util: 1,
            descripcion: "",
            bien_adquirido: false,
            bien_donado: false,
            bien_usado: false,
            ubicacion_id: null,
            tipocategoria_id: null,
            categoria_id: null,
            estado_id: null,
            marca_id: null,

            /* usuario_id: null,
            direccion_id: null,
            concepto_id: null,
            observacion: "" */

        },
        validate: {
            //nombre_equipo: isNotEmpty("Por favor ingrese la marca"),
            modelo: isNotEmpty("Por favor ingrese el modelo"),
            numero_serie: isNotEmpty("Por favor ingrese el número de serie"),
            vida_util: isNotEmpty("Por favor ingrese la vida útil"),
            descripcion: hasLength(
                { min: 5, max: 300 },
                "La descripción debe tener entre 5 y 200 caracteres"
            ),
            ubicacion_id: isNotEmpty(
                "Por favor seleccione la ubicación física"
            ),
            categoria_id: isNotEmpty("Por favor seleccione una categoría"),
            estado_id: isNotEmpty("Por favor seleccione el estado del equipo"),
            marca_id: isNotEmpty("Por favor seleccione una marca"),

        },
        transformValues: (values) => ({
            ...values,
            ubicacion_id: Number(values.ubicacion_id) || null,
            categoria_id: Number(values.categoria_id) || null,
            estado_id: Number(values.estado_id) || null,
            marca_id: Number(values.marca_id) || null,

           /*  usuario_id: Number(values.usuario_id) || null,
            direccion_id: Number(values.direccion_id),
            concepto_id: Number(values.concepto_id) || null, */

        }),
    });

    useEffect(() => {
        if (isOpenModalInvEquipo) {
            startLoadInvUbicaciones();
            startLoadTiposcategorias();
            //startLoadInvCategorias();
            startLoadInvEstados();
            startLoadInvMarcas();
            startLoadInvConceptos();
        }

        return () => {
            startClearInvUbicaciones();
            startClearTiposcategorias();
            //startClearInvCategorias();
            startClearInvEstados();
            startClearInvMarcas();
            startClearInvConceptos();
        };
    }, [isOpenModalInvEquipo]);

    const handleCloseModal = () => {
        if (activateInvEquipo !== null) {
            setActivateInvEquipo(null);
        }
        modalActionEquipo(false);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalInvEquipo}
            onClose={handleCloseModal}
            size="65rem"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Equipo
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvEquipoForm form={form} />
        </Modal>
    );
};
