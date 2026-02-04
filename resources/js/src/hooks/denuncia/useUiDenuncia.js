import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalVerificarCedula,
    onCloseModalVerificarCedula,
    onOpenModalCrearDenuncia,
    onCloseModalCrearDenuncia,
    onOpenModalDetalleDenuncia,
    onCloseModalDetalleDenuncia,
    onOpenModalResponderDenuncia,
    onCloseModalResponderDenuncia,
    onOpenDrawerFiltros,
    onCloseDrawerFiltros,
} from "../../store/denuncia/uiDenunciaSlice";

export const useUiDenuncia = () => {
    const {
        openedModalVerificarCedula,
        openedModalCrearDenuncia,
        openedModalDetalleDenuncia,
        openedModalResponderDenuncia,
        openedDrawerFiltros,
    } = useSelector((state) => state.uiDenuncia);

    const dispatch = useDispatch();

    const handleOpenModalVerificarCedula = () => {
        dispatch(onOpenModalVerificarCedula());
    };

    const handleCloseModalVerificarCedula = () => {
        dispatch(onCloseModalVerificarCedula());
    };

    const handleOpenModalCrearDenuncia = () => {
        dispatch(onOpenModalCrearDenuncia());
    };

    const handleCloseModalCrearDenuncia = () => {
        dispatch(onCloseModalCrearDenuncia());
    };

    const handleOpenModalDetalleDenuncia = () => {
        dispatch(onOpenModalDetalleDenuncia());
    };

    const handleCloseModalDetalleDenuncia = () => {
        dispatch(onCloseModalDetalleDenuncia());
    };

    const handleOpenModalResponderDenuncia = () => {
        dispatch(onOpenModalResponderDenuncia());
    };

    const handleCloseModalResponderDenuncia = () => {
        dispatch(onCloseModalResponderDenuncia());
    };

    const handleOpenDrawerFiltros = () => {
        dispatch(onOpenDrawerFiltros());
    };

    const handleCloseDrawerFiltros = () => {
        dispatch(onCloseDrawerFiltros());
    };

    return {
        openedModalVerificarCedula,
        openedModalCrearDenuncia,
        openedModalDetalleDenuncia,
        openedModalResponderDenuncia,
        openedDrawerFiltros,

        handleOpenModalVerificarCedula,
        handleCloseModalVerificarCedula,
        handleOpenModalCrearDenuncia,
        handleCloseModalCrearDenuncia,
        handleOpenModalDetalleDenuncia,
        handleCloseModalDetalleDenuncia,
        handleOpenModalResponderDenuncia,
        handleCloseModalResponderDenuncia,
        handleOpenDrawerFiltros,
        handleCloseDrawerFiltros,
    };
};

