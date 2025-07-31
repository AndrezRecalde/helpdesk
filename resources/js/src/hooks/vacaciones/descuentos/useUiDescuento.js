import { useDispatch, useSelector } from "react-redux";
import { onOpenModalAddDescuento } from "../../../store/vacaciones/descuento/uiDescuentoSlice";

export const useUiDescuento = () => {
    const { isOpenModalAddDescuento } = useSelector(
        (state) => state.uiDescuento
    );
    const dispatch = useDispatch();

    const modalActionDescuento = (behavior = false) => {
        dispatch(onOpenModalAddDescuento(behavior));
    };

    return {
        isOpenModalAddDescuento,

        modalActionDescuento,
    };
};
