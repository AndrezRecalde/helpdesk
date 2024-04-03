import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAddSolicitud,
    onCloseModalAnularSoporte,
    onCloseModalAsignarSoporte,
    onCloseModalCierreSoporte,
    onCloseModalCreateSoporte,
    onCloseModalDiagnosticar,
    onOpenModalAddSolicitud,
    onOpenModalAnularSoporte,
    onOpenModalAsignarSoporte,
    onOpenModalCierreSoporte,
    onOpenModalCreateSoporte,
    onOpenModalDiagnosticar,
} from "../../store/soporte/uiSoporteSlice";

export const useUiSoporte = () => {
    const {
        isOpenModalAsignarSoporte,
        isOpenModalAnularSoporte,
        isOpenModalAddSolicitud,
        isOpenModalCreateSoporte,
        isOpenModalDiagnosticar,
        isOpenModalCierreSoporte
    } = useSelector((state) => state.uiSoporte);

    const dispatch = useDispatch();

    const modalActionAsignarSoporte = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAsignarSoporte())
            : dispatch(onCloseModalAsignarSoporte());
    };

    const modalActionAnularSoporte = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAnularSoporte())
            : dispatch(onCloseModalAnularSoporte());
    };

    const modalActionAddSolicitud = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAddSolicitud())
            : dispatch(onCloseModalAddSolicitud());
    };

    const modalActionCreateSoporte = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalCreateSoporte())
            : dispatch(onCloseModalCreateSoporte());
    };

    const modalActionDiagnosticar = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalDiagnosticar())
            : dispatch(onCloseModalDiagnosticar());
    };

    const modalActionCierreSoporte = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalCierreSoporte())
            : dispatch(onCloseModalCierreSoporte());
    };

    return {
        isOpenModalAsignarSoporte,
        isOpenModalAnularSoporte,
        isOpenModalAddSolicitud,
        isOpenModalCreateSoporte,
        isOpenModalDiagnosticar,
        isOpenModalCierreSoporte,

        modalActionAsignarSoporte,
        modalActionAnularSoporte,
        modalActionAddSolicitud,
        modalActionCreateSoporte,
        modalActionDiagnosticar,
        modalActionCierreSoporte
    };
};
