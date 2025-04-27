import { Button, Card, useMantineTheme } from "@mantine/core";
import { TextSection } from "../..";
import { useMarcacionStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/stats/StatsRingCard.module.css";
import dayjs from "dayjs";

export const MarcacionEntradaCard = ({ children, btnColor, handleMarcacion }) => {
    const theme = useMantineTheme();
    const { marcaciones } = useMarcacionStore();

    const targetTime = dayjs().startOf("day").add(8, "hour"); // 8:00 a.m.

    const marcacionCercana =
        marcaciones.length > 0
            ? marcaciones.reduce((prev, current) => {
                  const prevDiff = Math.abs(
                      dayjs(prev.EVENTO_FECHA).diff(targetTime)
                  );
                  const currentDiff = Math.abs(
                      dayjs(current.EVENTO_FECHA).diff(targetTime)
                  );

                  if (currentDiff < prevDiff) {
                      return current;
                  } else if (currentDiff === prevDiff) {
                      // Si la diferencia es igual, toma la marcación más temprana (la de hora menor)
                      return dayjs(current.EVENTO_FECHA).isBefore(
                          dayjs(prev.EVENTO_FECHA)
                      )
                          ? current
                          : prev;
                  } else {
                      return prev;
                  }
              })
            : null;

    const horaMarcacion = marcacionCercana
        ? dayjs(marcacionCercana.EVENTO_FECHA).format("HH:mm:ss")
        : "Marcacion no realizada";

    const mostrarVerificacion = !!marcacionCercana;

    const ahora = dayjs();
    /* const entre4y12 =
        ahora.isAfter(ahora.startOf("day").add(4, "hour")) &&
        ahora.isBefore(ahora.startOf("day").add(12, "hour")); */
    const despuesDe12 = ahora.isAfter(ahora.startOf("day").add(12, "hour"));

    const botonDeshabilitado = mostrarVerificacion || despuesDe12;

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
                    <div>
                        <TextSection tt="capitalize" fw={700} fz={22} mt={30}>
                            {horaMarcacion}
                        </TextSection>
                        {mostrarVerificacion && (
                            <TextSection tt="" color="dimmed">
                                Marcación Realizada
                            </TextSection>
                        )}
                    </div>
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
                        disabled={botonDeshabilitado}
                        style={{
                            borderWidth: 3,
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
