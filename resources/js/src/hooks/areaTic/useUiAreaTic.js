import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalActionAreaTic,
    onCloseModalActionAreaTic,
    onOpenModalDeleteAreaTic,
    onCloseModalDeleteAreaTic,
    onOpenModalAsignarTecnicos,
    onCloseModalAsignarTecnicos,
    onOpenModalEstadisticasArea,
    onCloseModalEstadisticasArea,
} from "../../store/areaTic/uiAreaTicSlice";

export const useUiAreaTic = () => {
    const {
        modalActionAreaTic,
        modalDeleteAreaTic,
        modalAsignarTecnicos,
        modalEstadisticasArea,
    } = useSelector((state) => state.uiAreaTic);

    const dispatch = useDispatch();

    const modalOpenActionAreaTic = () => {
        dispatch(onOpenModalActionAreaTic());
    };

    const modalCloseActionAreaTic = () => {
        dispatch(onCloseModalActionAreaTic());
    };

    const modalOpenDeleteAreaTic = () => {
        dispatch(onOpenModalDeleteAreaTic());
    };

    const modalCloseDeleteAreaTic = () => {
        dispatch(onCloseModalDeleteAreaTic());
    };

    const modalOpenAsignarTecnicos = () => {
        dispatch(onOpenModalAsignarTecnicos());
    };

    const modalCloseAsignarTecnicos = () => {
        dispatch(onCloseModalAsignarTecnicos());
    };

    const modalOpenEstadisticasArea = () => {
        dispatch(onOpenModalEstadisticasArea());
    };

    const modalCloseEstadisticasArea = () => {
        dispatch(onCloseModalEstadisticasArea());
    };

    return {
        modalActionAreaTic,
        modalDeleteAreaTic,
        modalAsignarTecnicos,
        modalEstadisticasArea,

        modalOpenActionAreaTic,
        modalCloseActionAreaTic,
        modalOpenDeleteAreaTic,
        modalCloseDeleteAreaTic,
        modalOpenAsignarTecnicos,
        modalCloseAsignarTecnicos,
        modalOpenEstadisticasArea,
        modalCloseEstadisticasArea,
    };
};
