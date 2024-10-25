import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalAddDocumento,
    onOpenModalAssignEquipo,
    onOpenModalAssignPeriferico,
    onOpenModalBajaEquipo,
    onOpenModalDeleteEquipo,
    onOpenModalInvEquipo,
    onOpenModalViewEquipo,
} from "../../../store/inventario/equipo/uiInvEquipoSlice";

export const useInvUiEquipo = () => {
    const {
        isOpenModalInvEquipo,
        isOpenModalAssignEquipo,
        isOpenModalViewEquipo,
        isOpenModalDeleteEquipo,
        isOpenModalBajaEquipo,
        isOpenModalAssignPeriferico,
        isOpenModalAddDocumento,
    } = useSelector((state) => state.uiInvEquipo);

    const dispatch = useDispatch();

    const modalActionEquipo = (behavior) => {
        dispatch(onOpenModalInvEquipo(behavior));
    };

    const modalActionAssignEquipo = (behavior) => {
        dispatch(onOpenModalAssignEquipo(behavior));
    };

    const modalActionViewEquipo = (behavior) => {
        dispatch(onOpenModalViewEquipo(behavior));
    };

    const modalActionDeleteEquipo = (behavior) => {
        dispatch(onOpenModalDeleteEquipo(behavior));
    };

    const modalActionBajaEquipo = (behavior) => {
        dispatch(onOpenModalBajaEquipo(behavior));
    };

    const modalActionAssignPeriferico = (behavior) => {
        dispatch(onOpenModalAssignPeriferico(behavior));
    };

    const modalActionAddDocumento = (behavior) => {
        dispatch(onOpenModalAddDocumento(behavior));
    };

    return {
        isOpenModalInvEquipo,
        isOpenModalAssignEquipo,
        isOpenModalViewEquipo,
        isOpenModalDeleteEquipo,
        isOpenModalBajaEquipo,
        isOpenModalAssignPeriferico,
        isOpenModalAddDocumento,

        modalActionEquipo,
        modalActionAssignEquipo,
        modalActionViewEquipo,
        modalActionDeleteEquipo,
        modalActionBajaEquipo,
        modalActionAssignPeriferico,
        modalActionAddDocumento
    };
};
