import { useDispatch, useSelector } from "react-redux";
import { onOpenModalAddPeriodo } from "../../../store/vacaciones/periodo/uiPeriodoSlice";

export const useUiPeriodo = () => {
    const { isOpenModalAddPeriodo } = useSelector(
        (state) => state.uiPeriodoVacacional
    );
    const dispatch = useDispatch();

    const modalActionAddPeriodo = (behavior) => {
        dispatch(onOpenModalAddPeriodo(behavior));
    };


    return {
        isOpenModalAddPeriodo,

        modalActionAddPeriodo
    };
};
