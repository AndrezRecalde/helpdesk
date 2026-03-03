import { useDispatch, useSelector } from "react-redux";
import { onOpenModalContrato } from "../../store/soporte/uiContratoSlice";

export const useUiContrato = () => {
    const { isOpenModalContrato } = useSelector((state) => state.uiContrato);
    const dispatch = useDispatch();

    const modalActionContrato = (behavior) => {
        if (behavior === 1) {
            dispatch(onOpenModalContrato(true));
        } else {
            dispatch(onOpenModalContrato(false));
        }
    };

    return {
        isOpenModalContrato,
        modalActionContrato,
    };
};
