import { List } from "@mantine/core";

export const InformationActividadList = () => {
    return (
        <List spacing="md" size="sm" withPadding center>
            <List.Item>
                Evita colocar links de páginas exteriores.
            </List.Item>
            <List.Item>
                Evita colocar links de reuniones de Zoom.
            </List.Item>
            <List.Item>
                Trata de detallar de manera concisa tu actividad.
            </List.Item>
        </List>
    );
};
