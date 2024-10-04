import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalAssignEquipo,
    onOpenModalInvEquipo,
    onOpenModalViewEquipo,
} from "../../../store/inventario/equipo/uiInvEquipoSlice";

export const useInvUiEquipo = () => {
    const { isOpenModalInvEquipo, isOpenModalAssignEquipo, isOpenModalViewEquipo } = useSelector(
        (state) => state.uiInvEquipo
    );

    const dispatch = useDispatch();

    const modalActionEquipo = (behavior) => {
        dispatch(onOpenModalInvEquipo(behavior));
    };

    const modalActionAssignEquipo = (behavior) => {
        dispatch(onOpenModalAssignEquipo(behavior));
    };

    const modalActionViewEquipo = (behavior) => {
        dispatch(onOpenModalViewEquipo(behavior));
    }

    return {
        isOpenModalInvEquipo,
        isOpenModalAssignEquipo,
        isOpenModalViewEquipo,

        modalActionEquipo,
        modalActionAssignEquipo,
        modalActionViewEquipo
    };
};
