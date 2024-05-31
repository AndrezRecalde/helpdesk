import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { ChartDesempTecnicos } from "../../..";
import { useIndicadorStore, useUiIndicador } from "../../../../hooks";


export const ModalDesempTecnicos = () => {
    const { startLoadDesempenoTecnicosAnual, clearIndicadores } =
        useIndicadorStore();
    const { isOpenModalDesempTecnicos, modalActionDesempTecnicos } =
        useUiIndicador();

    useEffect(() => {
        if (isOpenModalDesempTecnicos) {
            startLoadDesempenoTecnicosAnual();
            return;
        }

        return () => {
            clearIndicadores();
        };
    }, [isOpenModalDesempTecnicos]);

    const handleCloseModal = () => {
        modalActionDesempTecnicos(0);
        clearIndicadores();
    };

    return (
        <Modal
            opened={isOpenModalDesempTecnicos}
            onClose={handleCloseModal}
            title="Desempeño por tecnicos - año actual"
            size="70%"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <ChartDesempTecnicos />
        </Modal>
    );
};
