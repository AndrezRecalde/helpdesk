import { useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
import { MarcacionCard } from "../../../components";
import { useMarcacionStore } from "../../../hooks";
import Swal from "sweetalert2";

export const MarcacionSection = ({ usuario }) => {
    const { startAddMarcacion } = useMarcacionStore();



    const handleMarcacionEntrada = () => {
        startAddMarcacion({ asi_id_reloj: usuario.asi_id_reloj });
    };

    const handleMarcacionSalida = () => {
        startAddMarcacion({ asi_id_reloj: usuario.asi_id_reloj });
    };

    return (
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={40}>
            <MarcacionCard
                children="Marcación de Entrada"
                btnColor="blue"
                handleMarcacion={handleMarcacionEntrada}
                horaObjetivo={8} // Buscamos cerca de 8:00 AM
                textoVerificacion="Entrada realizada"
                textoNoMarcacion="Entrada no realizada"
                rangoHabilitacion={{ desde: 4, hasta: 12 }}
            />
            <MarcacionCard
                children="Marcación de Salida"
                btnColor="red"
                handleMarcacion={handleMarcacionSalida}
                horaObjetivo={17} // Buscamos cerca de 5:00 PM
                textoVerificacion="Salida realizada"
                textoNoMarcacion="Salida no realizada"
                rangoHabilitacion={{ desde: 12, hasta: 23 }} // O el rango que necesites
            />
        </SimpleGrid>
    );
};
