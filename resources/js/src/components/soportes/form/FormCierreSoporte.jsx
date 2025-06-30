import { Card, Text, Group, Button, Tooltip, ActionIcon } from "@mantine/core";
import { IconFileSymlink, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { TextSection } from "../../../components";
import { useSoporteStore, useUiSoporte } from "../../../hooks";
import classes from "../../../assets/styles/modules/soporte/CardCierreSoporte.module.css";

export const FormCierreSoporte = ({ form }) => {
    const { soportes, startCerrarSoporte, setActivateSoporte } =
        useSoporteStore();
    const { modalActionAnularSoporte } = useUiSoporte();


    const handleSubmitSuccess = (e, soporte) => {
        e.preventDefault();
        form.setValues({ id_calificacion: 5, id_estado: 4 });
        setActivateSoporte(soporte);
        startCerrarSoporte(soporte, form.values);
    };

    const handleSubmitDismiss = (e, soporte) => {
        e.preventDefault();
        //form.setValues({ id_calificacion: 3, id_estado: 2 });
        modalActionAnularSoporte(1);
        setActivateSoporte(soporte);
    };

    return soportes.map((soporte) => (
        <Card
            withBorder
            radius="md"
            className={classes.card}
            key={soporte?.id_sop}
        >
            <Card.Section className={classes.section} withBorder>
                <Group justify="space-between">
                    <TextSection tt="" fw={700}>
                        NÚMERO SOPORTE: {soporte?.numero_sop}
                    </TextSection>
                    <Tooltip label={soporte?.solucion} >
                        <ActionIcon
                            variant="light"
                            size="md"
                            radius="xl"
                        >
                            <IconFileSymlink />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Card.Section>
            <div>
                <Text fz="sm" c="dimmed" className={classes.label} mt={10}>
                    Técnico
                </Text>
                <Text size="xs">{soporte?.tecnico_asignado}</Text>
            </div>

            <Card.Section className={classes.section} mt="md">
                <Text fz="sm" c="dimmed" className={classes.label}>
                    Incidencia
                </Text>

                <Text size="xs">{soporte?.incidente}</Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={30}>
                    <Button
                        radius="sm"
                        color="teal.5"
                        style={{ flex: 1 }}
                        rightSection={<IconThumbUp size={20} />}
                        onClick={(e) => handleSubmitSuccess(e, soporte)}
                    >
                        Atendido
                    </Button>

                    <Button
                        radius="sm"
                        color="red.7"
                        style={{ flex: 1 }}
                        rightSection={<IconThumbDown size={20} />}
                        onClick={(e) => handleSubmitDismiss(e, soporte)}
                    >
                        No atendido
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    ));
};
