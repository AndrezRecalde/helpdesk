import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalInvConsumible,
    onOpenModalSolicitudConsumible,
    onOpenModalStockInvConsumible,
} from "../../../store/consumible/uiInvConsumibleSlice";

export const useUiInvConsumible = () => {
    const {
        isOpenModalInvConsumible,
        isOpenModalStockInvConsumible,
        isOpenModalSolicitudConsumible,
    } = useSelector((state) => state.uiInvConsumible);

    const dispatch = useDispatch();

    const modalActionConsumible = (behavior = false) => {
        dispatch(onOpenModalInvConsumible(behavior));
    };

    const modalActionStockConsumible = (behavior = false) => {
        dispatch(onOpenModalStockInvConsumible(behavior));
    };

    const modalActionSolicitudConsumible = (behavior = false) => {
        dispatch(onOpenModalSolicitudConsumible(behavior));
    };

    return {
        isOpenModalInvConsumible,
        isOpenModalStockInvConsumible,
        isOpenModalSolicitudConsumible,

        modalActionConsumible,
        modalActionStockConsumible,
        modalActionSolicitudConsumible,
    };
};
