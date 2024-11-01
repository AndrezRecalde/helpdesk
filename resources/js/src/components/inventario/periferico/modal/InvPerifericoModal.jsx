import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { InvPerifericoForm, TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    useInvEstadoStore,
    useInvMarcaStore,
    useInvPerifericoStore,
    useInvTipocategoriaStore,
    useInvUiPeriferico,
} from "../../../../hooks";

export const InvPerifericoModal = () => {
    const { activatePeriferico, setActivateInvPeriferico } =
        useInvPerifericoStore();
    const { isOpenModalPeriferico, modalActionPeriferico } =
        useInvUiPeriferico();
    const { startLoadTiposcategorias, startClearTiposcategorias } =
        useInvTipocategoriaStore();
    const { startLoadInvMarcas, startClearInvMarcas } = useInvMarcaStore();
    const { startLoadInvEstados, startClearInvEstados } = useInvEstadoStore();

    const form = useForm({
        initialValues: {
            modelo: "",
            marca_id: null,
            tipocategoria_id: null,
            categoria_id: null,
            numero_serie: "",
            fecha_adquisicion: new Date(),
            es_adquirido: false,
            es_donado: false,
            es_usado: false,
            estado_id: null,
            //equipo_id: null,
        },
        validate: {
            modelo: isNotEmpty("Por favor ingrese la modelo"),
            marca_id: isNotEmpty("Por favor ingrese la marca"),
            categoria_id: isNotEmpty("Por favor seleccione la categoria"),
            numero_serie: isNotEmpty("Por favor ingrese el número serie"),
            estado_id: isNotEmpty("Por favor seleccione el estado"),
        },
        transformValues: (values) => ({
            ...values,
            marca_id: Number(values.marca_id) || null,
            categoria_id: Number(values.categoria_id) || null,
            estado_id: Number(values.estado_id) || null,
            fecha_adquisicion: new Date(values.fecha_adquisicion)
        }),
    });

    useEffect(() => {
        if (isOpenModalPeriferico) {
            startLoadInvMarcas();
            startLoadTiposcategorias();
            startLoadInvEstados();
        }

        return () => {
            startClearInvMarcas();
            startClearTiposcategorias();
            startClearInvEstados();
        };
    }, [isOpenModalPeriferico]);

    const handleCloseModal = () => {
        if (activatePeriferico !== null) {
            setActivateInvPeriferico(null);
        }
        form.reset();
        modalActionPeriferico(false);
    };

    return (
        <Modal
            centered
            opened={isOpenModalPeriferico}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Perifericos - Componentes
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvPerifericoForm form={form} />
        </Modal>
    );
};
