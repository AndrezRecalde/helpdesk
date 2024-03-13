import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAddSolicitud,
    onCloseModalAnularSoporte,
    onCloseModalAsignarSoporte,
    onCloseModalCreateSoporte,
    onCloseModalDiagnosticar,
    onOpenModalAddSolicitud,
    onOpenModalAnularSoporte,
    onOpenModalAsignarSoporte,
    onOpenModalCreateSoporte,
    onOpenModalDiagnosticar,
} from "../../store/soporte/uiSoporteSlice";

export const useUiSoporte = () => {
    const {
        isOpenModalAsignarSoporte,
        isOpenModalAnularSoporte,
        isOpenModalAddSolicitud,
        isOpenModalCreateSoporte,
        isOpenModalDiagnosticar
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

    return {
        isOpenModalAsignarSoporte,
        isOpenModalAnularSoporte,
        isOpenModalAddSolicitud,
        isOpenModalCreateSoporte,
        isOpenModalDiagnosticar,

        modalActionAsignarSoporte,
        modalActionAnularSoporte,
        modalActionAddSolicitud,
        modalActionCreateSoporte,
        modalActionDiagnosticar
    };
};
