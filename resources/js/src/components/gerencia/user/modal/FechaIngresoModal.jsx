import { Modal } from "@mantine/core";
import { TextSection } from "../../../../components";
import { isNotEmpty, useForm } from "@mantine/form";
import { useUiUser, useUsersStore } from "../../../../hooks";
import { FechaIngresoForm } from "../form/FechaIngresoForm";
import dayjs from "dayjs";

export const FechaIngresoModal = () => {
    const { setActivateUser } = useUsersStore();
    const { isModalEditUser, modalActionUser } = useUiUser();
    const form = useForm({
        initialValues: {
            usu_fi_institucion: null,
        },
        validate: {
            usu_fi_institucion: isNotEmpty(
                "Por favor seleccione la fecha de ingreso a la institución"
            ),
        },
        transformValues: (values) => ({
            usu_fi_institucion: dayjs(values.usu_fi_institucion).isValid()
                ? dayjs(values.usu_fi_institucion).format("YYYY-MM-DD")
                : null,
        }),
    });

    const handleCloseModal = () => {
        form.reset();
        modalActionUser(false, false);
        setActivateUser(null);
    };

    return (
        <Modal
            opened={isModalEditUser}
            onClose={handleCloseModal}
            title={
                <TextSection tt="" fz={16} fw={700}>
                    Editar Fecha Ingreso
                </TextSection>
            }
            size="lg"
            closeOnClickOutside={false}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <FechaIngresoForm form={form} />
        </Modal>
    );
};
