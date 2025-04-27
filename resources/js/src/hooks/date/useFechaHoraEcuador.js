import { useState, useEffect } from "react";

const useFechaHoraEcuador = () => {
  const [fechaHora, setFechaHora] = useState({ fecha: "", hora: "" });

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date();

      const fecha = ahora.toLocaleDateString("es-EC", {
        timeZone: "America/Guayaquil",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const hora = ahora.toLocaleTimeString("es-EC", {
        timeZone: "America/Guayaquil",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setFechaHora({ fecha, hora });
    };

    actualizar(); // Primera llamada
    const intervalo = setInterval(actualizar, 1000); // Actualizar cada segundo

    return () => clearInterval(intervalo); // Limpieza al desmontar
  }, []);

  return fechaHora;
};

export default useFechaHoraEcuador;
