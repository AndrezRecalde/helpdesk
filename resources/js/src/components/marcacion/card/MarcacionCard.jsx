import { Button, Card, useMantineTheme } from "@mantine/core";
import { TextSection } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import classes from "../../../assets/styles/modules/stats/StatsRingCard.module.css";

export const MarcacionCard = ({
  children,
  btnColor,
  handleMarcacion,
  horaObjetivo = 8, // Ejemplo: 8 para entrada, 17 para salida
  textoVerificacion = "Marcación Realizada",
  textoNoMarcacion = "Marcación no realizada",
  rangoHabilitacion = { desde: 4, hasta: 12 }, // Ej: entradas entre 4am-12pm
}) => {
  const theme = useMantineTheme();
  const { marcaciones } = useMarcacionStore();

  const ahora = new Date();
  const horaActual = ahora.getHours();

  // 🔵 Filtrar sólo marcaciones que estén en el rango permitido
  const marcacionesValidas = marcaciones.filter((m) => {
    const fecha = new Date(m.EVENTO_FECHA);
    const horaMarcacion = fecha.getHours();
    return horaMarcacion >= rangoHabilitacion.desde && horaMarcacion <= rangoHabilitacion.hasta;
  });

  // 🔵 Encontrar la más cercana a la hora objetivo
  const marcacionCercana = marcacionesValidas.length > 0
    ? marcacionesValidas.reduce((cercana, actual) => {
        const fechaCercana = new Date(cercana.EVENTO_FECHA);
        const fechaActual = new Date(actual.EVENTO_FECHA);
        const diffCercana = Math.abs(horaObjetivo - fechaCercana.getHours());
        const diffActual = Math.abs(horaObjetivo - fechaActual.getHours());
        return diffActual < diffCercana ? actual : cercana;
      })
    : null;

  const horaMarcacion = marcacionCercana
    ? new Date(marcacionCercana.EVENTO_FECHA).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : "SIN MARCACION";

  const hayMarcacion = !!marcacionCercana;

  // 🔵 Lógica de habilitación del botón
  const botonDeshabilitado = hayMarcacion || !(horaActual >= rangoHabilitacion.desde && horaActual <= rangoHabilitacion.hasta);

  return (
    <Card withBorder p="xl" radius="md" shadow="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <TextSection fw={900} fz={18}>
            {children}
          </TextSection>
          <div>
            <TextSection fw={700} fz={18} mt={30}>
              {horaMarcacion}
            </TextSection>
            {hayMarcacion && (
              <TextSection tt="" color="dimmed">
                {textoVerificacion}
              </TextSection>
            )}
            {!hayMarcacion && (
              <TextSection tt="" color="red">
                {textoNoMarcacion}
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
            color={botonDeshabilitado ? 'gray' : theme.colors[btnColor][5]}
            onClick={handleMarcacion}
            disabled={botonDeshabilitado}
            style={{
              borderWidth: 2,
              borderColor: botonDeshabilitado ? 'gray' : theme.colors[btnColor][8],
              color: botonDeshabilitado ? 'gray' : theme.colors[btnColor][5],
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
