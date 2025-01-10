import { Modal } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { InvPerifericoAsignarEquipoForm, TextSection } from "../../../../components";
import { useInvPerifericoStore, useInvUiPeriferico } from "../../../../hooks";

export const InvPerifericoAsignarEquipoModal = () => {

    const { isOpenModalPerifericoAsignarEquipo, modalActionAsignarEquipo } = useInvUiPeriferico();
    const { setActivateInvPeriferico, activatePeriferico } = useInvPerifericoStore();

     const form = useForm({
            initialValues: {
                codigo: "",
                //equipo_id: null,
            },
            validate: {
                codigo: isNotEmpty("Por favor ingrese el código del equipo"),
            },
        });

        const handleCloseModal = () => {
            if (activatePeriferico !== null) {
                setActivateInvPeriferico(null);
            }
            form.reset();
           modalActionAsignarEquipo(false);
        };

    return (
        <Modal
            centered
            opened={isOpenModalPerifericoAsignarEquipo}
            onClose={handleCloseModal}
            size="lg"
            title={
                <TextSection fz={18} fw={700} tt="capitalize">
                    Asignar a Equipo
                </TextSection>
            }
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <InvPerifericoAsignarEquipoForm form={form} />
        </Modal>
    );
};
