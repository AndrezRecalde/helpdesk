import { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import { MarcacionCard } from "../../../components";
import { useMarcacionStore } from "../../../hooks";

export const MarcacionSection = ({ usuario }) => {
    const { startAddMarcacion } = useMarcacionStore();
    const [disabledES, setDisabledES] = useState(false);
    const [disabledA, setDisabledA] = useState(false);


    const handleMarcacionEntradaSalida = () => {
        startAddMarcacion({
            asi_id_reloj: usuario.asi_id_reloj,
            checktype: "I",
        });
        setDisabledES(true); // desactiva el botón

        setTimeout(() => {
            setDisabledES(false); // lo vuelve a activar después de 1 minuto
        }, 60000); // 60,000 ms = 60 segundos
    };

    const handleMarcacionAlmuerzos = () => {
        startAddMarcacion({
            asi_id_reloj: usuario.asi_id_reloj,
            checktype: "O",
        });
        setDisabledA(true); // desactiva el botón

        setTimeout(() => {
            setDisabledA(false); // lo vuelve a activar después de 1 minuto
        }, 60000); // 60,000 ms = 60 segundos
    };

    return (
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt={40}>
            <MarcacionCard
                children="Marcación de Entrada - Salida"
                btnColor="blue"
                handleMarcacion={handleMarcacionEntradaSalida}
                checkType="I"
                rango1={[240, 660]} // 04:00 - 11:00
                rango2={[900, 1380]} // 15:00 - 23:00
                mostrarSegundaLista={true}
                btnDisabled={disabledES}
            />
            <MarcacionCard
                children="Marcación de Almuerzos"
                btnColor="yellow"
                handleMarcacion={handleMarcacionAlmuerzos}
                checkType="O"
                rango1={[720, 900]} // 12:00 - 15:00
                mostrarSegundaLista={false}
                btnDisabled={disabledA}
            />
        </SimpleGrid>
    );
};
