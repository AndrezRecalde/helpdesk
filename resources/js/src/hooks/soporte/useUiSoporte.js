import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAddSoporte_G,
    onCloseModalAddSoporte_T,
    onCloseModalAnularSoporte,
    onCloseModalAsignarSoporte,
    onOpenModalAddSoporte_G,
    onOpenModalAddSoporte_T,
    onOpenModalAnularSoporte,
    onOpenModalAsignarSoporte,
} from "../../store/soporte/uiSoporteSlice";

export const useUiSoporte = () => {
    const {
        isOpenModalAsignarSoporte,
        isOpenModalAnularSoporte,
        isOpenModalAddSoporte_T,
        isOpenModalAddSoporte_G,
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

    const modalActionAddSoporte_T = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAddSoporte_T())
            : dispatch(onCloseModalAddSoporte_T());
    };

    const modalActionAddSoporte_G = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAddSoporte_G())
            : dispatch(onCloseModalAddSoporte_G());
    };

    return {
        isOpenModalAsignarSoporte,
        isOpenModalAnularSoporte,
        isOpenModalAddSoporte_T,
        isOpenModalAddSoporte_G,

        modalActionAsignarSoporte,
        modalActionAnularSoporte,
        modalActionAddSoporte_T,
        modalActionAddSoporte_G,
    };
};
