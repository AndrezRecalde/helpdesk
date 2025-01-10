import { useDispatch, useSelector } from "react-redux";
import { onOpenModalInvPeriferico, onOpenModalPerifericoAsignarEquipo, onOpenModalTransferirPeriferico } from "../../../store/inventario/periferico/uiInvPerifericoSlice";

export const useInvUiPeriferico = () => {
    const { isOpenModalPeriferico, isOpenModalTransferirPeriferico, isOpenModalPerifericoAsignarEquipo } = useSelector(
        (state) => state.uiInvPeriferico
    );
    const dispatch = useDispatch();

    const modalActionPeriferico = (behavior = false) => {
        dispatch(onOpenModalInvPeriferico(behavior));
    };

    const modalActionTransferirPeriferico = (behavior = false) => {
        dispatch(onOpenModalTransferirPeriferico(behavior));
    };

    const modalActionAsignarEquipo = (behavior = false) => {
        dispatch(onOpenModalPerifericoAsignarEquipo(behavior));
    }

    return {
        isOpenModalPeriferico,
        isOpenModalTransferirPeriferico,
        isOpenModalPerifericoAsignarEquipo,

        modalActionPeriferico,
        modalActionTransferirPeriferico,
        modalActionAsignarEquipo
    };
};
