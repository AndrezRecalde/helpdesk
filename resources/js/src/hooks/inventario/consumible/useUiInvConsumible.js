import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalHistorialConsumible,
    onOpenModalInvConsumible,
    onOpenModalSolicitudConsumible,
    onOpenModalStockInvConsumible,
} from "../../../store/consumible/uiInvConsumibleSlice";

export const useUiInvConsumible = () => {
    const {
        isOpenModalInvConsumible,
        isOpenModalStockInvConsumible,
        isOpenModalSolicitudConsumible,
        isOpenModalHistorialConsumible
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
    }

    const modalActionHistorialConsumible = (behavior = false) => {
        dispatch(onOpenModalHistorialConsumible(behavior));
    }

    return {
        isOpenModalInvConsumible,
        isOpenModalStockInvConsumible,
        isOpenModalSolicitudConsumible,
        isOpenModalHistorialConsumible,

        modalActionConsumible,
        modalActionStockConsumible,
        modalActionSolicitudConsumible,
        modalActionHistorialConsumible
    };
};
