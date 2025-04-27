import { Button, Card, useMantineTheme } from "@mantine/core";
import { TextSection } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/stats/StatsRingCard.module.css";
import dayjs from "dayjs";

export const MarcacionCard = ({
    children,
    btnColor,
    handleMarcacion,
    horaObjetivo = 8, // Hora objetivo en formato 24h (ej: 8 para 8:00 am, 17 para 5:00 pm)
    textoVerificacion = "Marcación Realizada", // Texto cuando hay marcación
    textoNoMarcacion = "Marcación no realizada", // Texto cuando NO hay marcación
    rangoHabilitacion = { desde: 4, hasta: 12 }, // Horas donde se puede habilitar el botón si no hay marcación
}) => {
    const theme = useMantineTheme();
    const { marcaciones } = useMarcacionStore();

    const targetTime = dayjs().startOf("day").add(horaObjetivo, "hour");

    // Buscar la marcación más cercana a la hora objetivo
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
        : textoNoMarcacion;

    const mostrarVerificacion = !!marcacionCercana;

    const ahora = dayjs();
    const estaDentroRango =
        ahora.isAfter(
            ahora.startOf("day").add(rangoHabilitacion.desde, "hour")
        ) &&
        ahora.isBefore(
            ahora.startOf("day").add(rangoHabilitacion.hasta, "hour")
        );

    const botonDeshabilitado = mostrarVerificacion || !estaDentroRango;

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
                                {textoVerificacion}
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
                        color={
                            botonDeshabilitado
                                ? "gray"
                                : theme.colors[btnColor][5]
                        } // Cambiar a gris si está deshabilitado
                        onClick={handleMarcacion}
                        disabled={botonDeshabilitado}
                        style={{
                            borderWidth: 2,
                            borderColor: botonDeshabilitado
                                ? theme.colors["gray"][8]
                                : theme.colors[btnColor][8], // Usar gris para el borde si está deshabilitado
                            color: botonDeshabilitado
                                ? theme.colors["gray"][7]
                                : theme.colors[btnColor][5], // Usar gris para el texto si está deshabilitado
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
