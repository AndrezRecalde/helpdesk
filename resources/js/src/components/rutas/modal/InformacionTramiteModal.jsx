import {
    Modal,
    List,
    ThemeIcon,
    Image,
    Divider,
} from "@mantine/core";
import {
    IconCheck,
    IconSearch,
    IconShieldCheck,
    IconClipboardText,
} from "@tabler/icons-react";
import { useUiRuta } from "../../../hooks";
import { TextSection } from "../../elements/titles/TextSection";

export const InformacionTramiteModal = () => {
    const { isLoadingHelpRuta, modalActionHelpRuta } = useUiRuta();

    const handleCloseModal = () => {
        modalActionHelpRuta(false);
    }

    return (
        <Modal
            opened={isLoadingHelpRuta}
            onClose={() => handleCloseModal()}
            title={
                <TextSection fz={16} fw={700}>🔍 Consulta del Estado de tu Trámite </TextSection>
            }
            centered
            size="lg"
            radius="md"
        >
            <Divider mb="md" />
            <TextSection tt="" fz={16} mb="md">
                Para consultar el estado o ruta de tu trámite ingresado a la
                Prefectura de Esmeraldas (GADPE), por favor sigue estos simples
                pasos:
            </TextSection>

            <List
                spacing="sm"
                size="md"
                icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                        <IconCheck size={16} />
                    </ThemeIcon>
                }
            >
                <List.Item icon={<IconClipboardText size={20} />}>
                    <strong>Digita el año</strong> en que ingresaste tu
                    documento por ventanilla de Secretaría.
                </List.Item>

                <List.Item icon={<IconSearch size={20} />}>
                    <strong>Ingresa el número de ruta</strong> que aparece en el
                    sello del documento.
                </List.Item>

                <List.Item icon={<IconShieldCheck size={20} />}>
                    <strong>Marca el recuadro reCAPTCHA</strong> para confirmar
                    que no eres un robot.
                </List.Item>

                <List.Item icon={<IconCheck size={20} />}>
                    <strong>Haz clic en "Buscar".</strong> Automáticamente se
                    mostrará el estado actual de tu trámite.
                </List.Item>
            </List>

            <TextSection tt="" mt="md" fz={14} color="dimmed">
                📌 Nota: El número de ruta se encuentra sellado en el oficio
                entregado por ventanilla, como en la siguiente imagen:
            </TextSection>

            <Image
                style={{ display: "flex", justifyContent: "center" }}
                src="https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2025/06/image_ruta.jpeg" // Reemplaza con la ruta real de la imagen
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                alt="Ejemplo de sello con número de ruta"
                mt="xs"
                radius="md"
                h={150}
                fit="contain"
            />
        </Modal>
    );
};
