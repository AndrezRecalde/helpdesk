import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { InvBajaEquipoForm, TextSection } from "../../../../components";
import { useInvEquipoStore, useInvUiEquipo, useSoporteStore, useUsersStore } from "../../../../hooks";

export const InvBajaEquipoModal = () => {
    const { startClearInvEquipos } = useInvEquipoStore();
    const { startLoadUsersGeneral } = useUsersStore();
    const { startLoadSoportesLite, clearSoportes } = useSoporteStore();
    const { isOpenModalBajaEquipo, modalActionBajaEquipo } = useInvUiEquipo();

    const form = useForm({
        initialValues: {
            user_id: null,
            equipos: [],
            numero_sop: "",
            numero_memorando: "",
            //motivo: "",
            //documento: null,
        },
        validate: {
            user_id: isNotEmpty(
                "Por favor ingresa la fecha de baja del equipo"
            ),
            equipos: isNotEmpty(
                "Por favor seleccione el/los equipos para dar de baja"
            ),
            numero_memorando: isNotEmpty("Por favor ingrese número de memo"),
        },
        transformValues: (values) => ({
            ...values,
            user_id: Number(values.user_id) || null,
            equipos: values.equipos.map(Number), // Convertir todos los valores a enteros
        })
    });

    useEffect(() => {
        if (isOpenModalBajaEquipo) {
            startLoadUsersGeneral({});
            startLoadSoportesLite();
        }

        return () => {
            //startClearInvEquipos();
            //clearSoportes();
        };
    }, [isOpenModalBajaEquipo]);

    const handleCloseModal = () => {
        modalActionBajaEquipo(false);
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalBajaEquipo}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Dar de Baja Equipo
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvBajaEquipoForm form={form} />
        </Modal>
    );
};
