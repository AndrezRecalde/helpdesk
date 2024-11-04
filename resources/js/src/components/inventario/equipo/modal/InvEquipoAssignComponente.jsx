import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { InvEquipoComponenteForm, TextSection } from "../../../../components";
import {
    useInvCategoriaStore,
    useInvMarcaStore,
    useInvUiEquipo,
} from "../../../../hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";

export const InvEquipoAssignComponente = () => {
    const { isOpenModalAssignPeriferico, modalActionAssignPeriferico } =
        useInvUiEquipo();
    const { startLoadInvMarcas, startClearInvMarcas } = useInvMarcaStore();
    const { startLoadInvCategorias, startClearInvCategorias } =
        useInvCategoriaStore();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            perifericos: [
                {
                    key: randomId(),
                    modelo: "",
                    numero_serie: "",
                    marca_id: null,
                    categoria_id: null,
                    fecha_adquisicion: new Date(),
                    es_adquirido: false,
                    es_donado: false,
                    es_usado: false,
                    estado_id: null,
                },
            ],
        },
        validate: {
            perifericos: {
                modelo: isNotEmpty("Por favor ingresar modelo"),
                marca_id: isNotEmpty("Por favor seleccione una marca"),
                categoria_id: isNotEmpty("Por favor seleccione una categoría"),
                estado_id: isNotEmpty("Por favor seleccione un estado del componente"),
            },
        },
        transformValues: (values) => ({
            ...values,
            perifericos: values.perifericos.map((periferico) => ({
                ...periferico,
                marca_id: Number(periferico.marca_id) || null,
                categoria_id: Number(periferico.categoria_id) || null,
                estado_id: Number(periferico.estado_id) || null,
            })),
        }),
    });

    useEffect(() => {
        startLoadInvMarcas();
        startLoadInvCategorias({});
        return () => {
            startClearInvMarcas();
            startClearInvCategorias();
        };
    }, [isOpenModalAssignPeriferico]);

    const handleCloseModal = () => {
        modalActionAssignPeriferico(false);
        //setActivateInvEquipo(null);
        form.reset();
    };

    return (
        <Modal
            centered
            opened={isOpenModalAssignPeriferico}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Componentes
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvEquipoComponenteForm form={form} />
        </Modal>
    );
};
