import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalSolicitud,
    onOpenModalDetalle,
} from "../../../store/solicitudConsumible/uiSolicitudConsumibleSlice";

export const useUiSolicitudConsumible = () => {
    const { isOpenModalSolicitud, isOpenModalDetalle } = useSelector(
        (state) => state.uiSolicitudConsumible,
    );

    const dispatch = useDispatch();

    const modalActionSolicitud = (behavior) => {
        dispatch(onOpenModalSolicitud(behavior));
    };

    const modalActionDetalle = (behavior) => {
        dispatch(onOpenModalDetalle(behavior));
    };

    return {
        //* Propiedades
        isOpenModalSolicitud,
        isOpenModalDetalle,

        //* Métodos
        modalActionSolicitud,
        modalActionDetalle,
    };
};
