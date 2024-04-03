import { Drawer } from "@mantine/core";
import { FormCierreSoporte } from "../form/FormCierreSoporte";
import { useUiSoporte } from "../../../hooks";
import { AlertSection } from "../../elements/alert/AlertSection";
import { IconInfoCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

export const ModalCierreSoportes = () => {

    const { isOpenModalCierreSoporte, modalActionCierreSoporte } = useUiSoporte();

    const form = useForm({
        initialValues: {
            id_calificacion: null,
            id_estado: null
        }
    })

    const handleCloseModal = () => {
        modalActionCierreSoporte(0);
    }

    return (
        <Drawer
            offset={8}
            radius="md"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            transitionProps={{
                transition: "slide-right",
                duration: 150,
                timingFunction: "linear",
            }}
            opened={isOpenModalCierreSoporte}
            withCloseButton={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            position="left"
            size="md"
            title="Cerrar soportes Atendidos"
        >
            <AlertSection icon={IconInfoCircle} color="teal.5">
                Se visualizan los soportes atendidos
            </AlertSection>
            <FormCierreSoporte form={form} />
        </Drawer>
    );
};
