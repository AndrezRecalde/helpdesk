import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalGestionarVacacion,
    onOpenModalSolAnulacion,
} from "../../store/vacaciones/uiVacacionesSlice";

export const useUiVacaciones = () => {
    const { isOpenModalGestionarVacacion, isOpenModalSolAnulacion } =
        useSelector((state) => state.uiVacaciones);
    const dispatch = useDispatch();

    const modalActionGestionarVacacion = (behavior = false) => {
        dispatch(onOpenModalGestionarVacacion(behavior));
    };

    const modalActionSolAnulacion = (behavior = false) => {
        dispatch(onOpenModalSolAnulacion(behavior));
    };

    return {
        isOpenModalGestionarVacacion,
        isOpenModalSolAnulacion,

        modalActionGestionarVacacion,
        modalActionSolAnulacion
    };
};
