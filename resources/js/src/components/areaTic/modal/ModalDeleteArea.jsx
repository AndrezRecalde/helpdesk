import { Modal, Text, Group, Button } from "@mantine/core";
import { useAreaTicStore, useUiAreaTic } from "../../../hooks";
import { IconTrash } from "@tabler/icons-react";

export const ModalDeleteArea = () => {
    const { modalDeleteAreaTic, modalCloseDeleteAreaTic } = useUiAreaTic();
    const { activateArea, startDeleteArea, setActivateArea } =
        useAreaTicStore();

    const handleCloseModal = () => {
        modalCloseDeleteAreaTic();
        setActivateArea(null);
    };

    const handleDelete = async () => {
        if (activateArea) {
            await startDeleteArea(activateArea.id_areas_tic);
            handleCloseModal();
        }
    };

    return (
        <Modal
            opened={modalDeleteAreaTic}
            onClose={handleCloseModal}
            title={activateArea?.activo ? "Desactivar Área" : "Activar Área"}
            size="sm"
            centered
        >
            <Text size="sm" mb="lg">
                {activateArea?.activo
                    ? `¿Estás seguro de desactivar el área "${activateArea?.nombre}"? Esta acción no eliminará el área, solo la desactivará.`
                    : `¿Deseas activar el área "${activateArea?.nombre}"?`}
            </Text>

            <Group justify="flex-end" mt="md">
                <Button variant="light" onClick={handleCloseModal}>
                    Cancelar
                </Button>
                <Button
                    color={activateArea?.activo ? "red" : "green"}
                    leftSection={<IconTrash size={16} />}
                    onClick={handleDelete}
                >
                    {activateArea?.activo ? "Desactivar" : "Activar"}
                </Button>
            </Group>
        </Modal>
    );
};
