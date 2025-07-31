import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalAddPeriodo,
    onOpenModalEditPeriodo,
} from "../../../store/vacaciones/periodo/uiPeriodoSlice";

export const useUiPeriodo = () => {
    const { isOpenModalAddPeriodo, isOpenModalEditPeriodo } = useSelector(
        (state) => state.uiPeriodoVacacional
    );
    const dispatch = useDispatch();

    const modalActionAddPeriodo = (behavior = false) => {
        dispatch(onOpenModalAddPeriodo(behavior));
    };

    const modalActionEditPeriodo = (behavior = false) => {
        dispatch(onOpenModalEditPeriodo(behavior));
    };

    return {
        isOpenModalAddPeriodo,
        isOpenModalEditPeriodo,
        modalActionAddPeriodo,
        modalActionEditPeriodo,
    };
};
