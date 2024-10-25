import { useDispatch, useSelector } from "react-redux";
import { onOpenModalInvPeriferico, onOpenModalTransferirPeriferico } from "../../../store/inventario/periferico/uiInvPerifericoSlice";

export const useInvUiPeriferico = () => {
    const { isOpenModalPeriferico, isOpenModalTransferirPeriferico } = useSelector(
        (state) => state.uiInvPeriferico
    );
    const dispatch = useDispatch();

    const modalActionPeriferico = (behavior) => {
        dispatch(onOpenModalInvPeriferico(behavior));
    };

    const modalActionTransferirPeriferico = (behavior) => {
        dispatch(onOpenModalTransferirPeriferico(behavior));
    };

    return {
        isOpenModalPeriferico,
        isOpenModalTransferirPeriferico,

        modalActionPeriferico,
        modalActionTransferirPeriferico
    };
};
