import { useEffect, useState } from "react";
import {
    Modal,
    Select,
    Switch,
    Group,
    Button,
    Text,
    Badge,
    Stack,
    Loader,
    Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUiAreaTic, useTecnicoStore } from "../../../hooks";
import { useTecnicoAreaStore } from "../../../hooks/tecnicoArea/useTecnicoAreaStore";
import { useAreaTicStore } from "../../../hooks/areaTic/useAreaTicStore";
import { IconUserPlus, IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export const ModalAsignarTecnicos = () => {
    const { modalAsignarTecnicos, modalCloseAsignarTecnicos } = useUiAreaTic();
    const { activateArea, setActivateArea } = useAreaTicStore();
    const { tecnicos, startLoadTecnicosAdmin } = useTecnicoStore();
    const {
        startLoadTecnicosArea,
        startAsignarArea,
        startRemoverArea,
        isLoading,
    } = useTecnicoAreaStore();

    const [tecnicosAsignados, setTecnicosAsignados] = useState([]);

    const form = useForm({
        initialValues: {
            tecnico_id: "",
            principal: false,
            activo: true,
        },
        validate: {
            tecnico_id: (value) => (!value ? "Selecciona un técnico" : null),
        },
    });

    useEffect(() => {
        if (modalAsignarTecnicos && activateArea) {
            startLoadTecnicosAdmin();
            loadTecnicosAsignados();
        }
    }, [modalAsignarTecnicos, activateArea]);

    const loadTecnicosAsignados = async () => {
        if (activateArea) {
            const tecnicos = await startLoadTecnicosArea(
                activateArea.id_areas_tic,
            );
            setTecnicosAsignados(tecnicos);
        }
    };

    const handleCloseModal = () => {
        modalCloseAsignarTecnicos();
        form.reset();
        setTecnicosAsignados([]);
        setActivateArea(null);
    };

    const handleSubmit = async (values) => {
        try {
            await startAsignarArea({
                tecnico_id: parseInt(values.tecnico_id),
                area_tic_id: activateArea.id_areas_tic,
                principal: values.principal,
                activo: values.activo,
            });

            notifications.show({
                title: "Éxito",
                message: "Técnico asignado correctamente",
                color: "green",
            });

            form.reset();
            await loadTecnicosAsignados();
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "No se pudo asignar el técnico",
                color: "red",
            });
        }
    };

    const handleRemover = async (asignacionId) => {
        try {
            await startRemoverArea(asignacionId);
            notifications.show({
                title: "Éxito",
                message: "Técnico removido del área",
                color: "green",
            });
            await loadTecnicosAsignados();
        } catch (error) {
            notifications.show({
                title: "Error",
                message: "No se pudo remover el técnico",
                color: "red",
            });
        }
    };

    const tecnicosDisponibles = tecnicos
        .filter(
            (t) =>
                !tecnicosAsignados.some((ta) => ta.cdgo_usrio === t.cdgo_usrio),
        )
        .map((t) => ({
            value: t.cdgo_usrio.toString(),
            label: t.nmbre_usrio,
        }));

    return (
        <Modal
            opened={modalAsignarTecnicos}
            onClose={handleCloseModal}
            title={`Asignar Técnicos - ${activateArea?.nombre}`}
            size="lg"
            centered
        >
            <Stack gap="md">
                {/* Formulario para asignar nuevo técnico */}
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Select
                        label="Seleccionar Técnico"
                        placeholder="Elige un técnico"
                        data={tecnicosDisponibles}
                        searchable
                        required
                        mb="md"
                        {...form.getInputProps("tecnico_id")}
                    />

                    <Switch
                        label="Técnico Principal"
                        description="El técnico principal tendrá prioridad en la asignación automática"
                        mb="sm"
                        {...form.getInputProps("principal", {
                            type: "checkbox",
                        })}
                    />

                    <Switch
                        label="Asignación Activa"
                        mb="lg"
                        {...form.getInputProps("activo", { type: "checkbox" })}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        leftSection={<IconUserPlus size={16} />}
                    >
                        Asignar Técnico
                    </Button>
                </form>

                {/* Lista de técnicos asignados */}
                <div>
                    <Text fw={600} size="sm" mb="xs">
                        Técnicos Asignados ({tecnicosAsignados.length})
                    </Text>

                    {isLoading ? (
                        <Loader size="sm" />
                    ) : tecnicosAsignados.length === 0 ? (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            color="blue"
                        >
                            No hay técnicos asignados a esta área
                        </Alert>
                    ) : (
                        <Stack gap="xs">
                            {tecnicosAsignados.map((tecnico) => (
                                <Group
                                    key={tecnico.pivot.id}
                                    justify="space-between"
                                    p="sm"
                                    style={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <div>
                                        <Text size="sm" fw={500}>
                                            {tecnico.nmbre_usrio}
                                        </Text>
                                        <Group gap="xs">
                                            {tecnico.pivot.principal && (
                                                <Badge color="blue" size="xs">
                                                    Principal
                                                </Badge>
                                            )}
                                            <Badge
                                                color={
                                                    tecnico.pivot.activo
                                                        ? "green"
                                                        : "gray"
                                                }
                                                size="xs"
                                            >
                                                {tecnico.pivot.activo
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </Badge>
                                        </Group>
                                    </div>
                                    <Button
                                        size="xs"
                                        color="red"
                                        variant="light"
                                        onClick={() =>
                                            handleRemover(tecnico.pivot.id)
                                        }
                                    >
                                        Remover
                                    </Button>
                                </Group>
                            ))}
                        </Stack>
                    )}
                </div>
            </Stack>
        </Modal>
    );
};
