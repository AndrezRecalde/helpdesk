import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import helpdeskApi from "../../api/helpdeskApi";
import {
    onClearDirecciones,
    onLoadDirecciones,
    onLoadErrores,
} from "../../store/direccion/direccionSlice";

export const useDireccionStore = () => {
    const {
        isLoading,
        direcciones,
        activeDireccion,
        validate,
        message,
        errores,
    } = useSelector((state) => state.direccion);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    /* ENDPOINTS GENERAL */
    const startLoadDirecciones = async () => {
        try {
            const { data } = await helpdeskApi.get("/general/direcciones");
            const { direcciones } = data;
            dispatch(onLoadDirecciones(direcciones));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };


    /* LIMPIEZA */
    const clearDirecciones = () => {
        dispatch(onClearDirecciones());
    };

    return {
        isLoading,
        direcciones,
        activeDireccion,
        validate,
        message,
        errores,

        startLoadDirecciones,
        clearDirecciones,
    };
};
