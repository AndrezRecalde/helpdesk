import { useDispatch, useSelector } from "react-redux";
import { onOpenModalAssignEquipo, onOpenModalInvEquipo } from "../../../store/inventario/equipo/uiInvEquipoSlice";

export const useInvUiEquipo = () => {
    const { isOpenModalInvEquipo, isOpenModalAssignEquipo } = useSelector(
        (state) => state.uiInvEquipo
    );

    const dispatch = useDispatch();

    const modalActionEquipo = (behavior) => {
        dispatch(onOpenModalInvEquipo(behavior));
    }

    const modalActionAssignEquipo = (behavior) => {
        dispatch(onOpenModalAssignEquipo(behavior));
    }



    return {
        isOpenModalInvEquipo,
        isOpenModalAssignEquipo,

        modalActionEquipo,
        modalActionAssignEquipo
    };
};
