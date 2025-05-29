import { Button, Card, List, SimpleGrid, useMantineTheme } from "@mantine/core";
import { TextSection } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/stats/StatsRingCard.module.css";

export const MarcacionCard = ({
    children,
    btnColor,
    handleMarcacion,
    checkType = "I",
    rango1 = [240, 660], // 04:00 - 11:00
    rango2 = [900, 1380], // 15:00 - 23:00
    mostrarSegundaLista = true,
}) => {
    const theme = useMantineTheme();
    const { marcaciones } = useMarcacionStore();

    // Filtrar por tipo de marcación (I / O)
    const marcacionesFiltradas = marcaciones.filter(
        (m) => m.CHECKTYPE === checkType
    );

    // Helper para obtener hora en minutos
    const formatoHora = (fechaStr) =>
        new Date(fechaStr).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    const estaEnRango = (hora, inicio, fin) => {
        const [h, m] = hora.split(":").map(Number);
        const totalMin = h * 60 + m;
        return totalMin >= inicio && totalMin <= fin;
    };

    // Separar en dos listas por rango de hora
    const listaUno = marcacionesFiltradas.filter((m) =>
        estaEnRango(formatoHora(m.EVENTO_FECHA), rango1[0], rango1[1])
    );

    const listaDos = mostrarSegundaLista
        ? marcacionesFiltradas.filter((m) =>
              estaEnRango(formatoHora(m.EVENTO_FECHA), rango2[0], rango2[1])
          )
        : [];

    return (
        <Card
            withBorder
            p="xl"
            radius="md"
            shadow="md"
            className={classes.card}
        >
            <div className={classes.inner}>
                <div>
                    <TextSection fw={900} fz={18}>
                        {children}
                    </TextSection>

                    <SimpleGrid cols={2} mt={10}>
                        {/* Lista Uno */}
                        <List withPadding spacing="xs">
                            {listaUno.map((m, index) => (
                                <List.Item key={index}>
                                    <TextSection fw={500} fz={16}>
                                        {formatoHora(m.EVENTO_FECHA)}
                                    </TextSection>
                                </List.Item>
                            ))}
                        </List>

                        {/* Lista Dos (opcional) */}
                        <List withPadding spacing="xs">
                            {listaDos.map((m, index) => (
                                <List.Item key={index}>
                                    <TextSection fw={500} fz={16}>
                                        {formatoHora(m.EVENTO_FECHA)}
                                    </TextSection>
                                </List.Item>
                            ))}
                        </List>
                    </SimpleGrid>
                </div>

                <div className={classes.ring}>
                    <Button
                        w={150}
                        h={150}
                        radius={150}
                        p={0}
                        variant="light"
                        color={theme.colors[btnColor][5]}
                        onClick={handleMarcacion}
                        style={{
                            borderWidth: 2,
                            borderColor: theme.colors[btnColor][8],
                            color: theme.colors[btnColor][5],
                            textAlign: "center",
                            whiteSpace: "normal",
                            lineHeight: 1.2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        Realizar
                        <br />
                        marcación
                    </Button>
                </div>
            </div>
        </Card>
    );
};
