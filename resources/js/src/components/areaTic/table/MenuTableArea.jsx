import { Menu, ActionIcon } from "@mantine/core";
import {
    IconChartBar,
    IconDots,
    IconEdit,
    IconTrash,
    IconUsers,
} from "@tabler/icons-react";
import { useAreaTicStore, useUiAreaTic } from "../../../hooks";

export const MenuTableArea = ({ row }) => {
    const { setActivateArea } = useAreaTicStore();
    const {
        modalOpenActionAreaTic,
        modalOpenDeleteAreaTic,
        modalOpenAsignarTecnicos,
        modalOpenEstadisticasArea,
    } = useUiAreaTic();

    const handleEdit = () => {
        setActivateArea(row);
        modalOpenActionAreaTic();
    };

    const handleDelete = () => {
        setActivateArea(row);
        modalOpenDeleteAreaTic();
    };

    const handleAsignarTecnicos = () => {
        setActivateArea(row);
        modalOpenAsignarTecnicos();
    };

    const handleEstadisticas = () => {
        setActivateArea(row);
        modalOpenEstadisticasArea();
    };

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots size={16} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Acciones</Menu.Label>
                <Menu.Item
                    leftSection={<IconEdit size={14} />}
                    onClick={handleEdit}
                >
                    Editar
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconUsers size={14} />}
                    onClick={handleAsignarTecnicos}
                >
                    Asignar Técnicos
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconChartBar size={14} />}
                    onClick={handleEstadisticas}
                >
                    Ver Estadísticas
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={14} />}
                    onClick={handleDelete}
                >
                    {row.activo ? "Desactivar" : "Activar"}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
