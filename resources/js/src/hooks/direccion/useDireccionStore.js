import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearDirecciones,
    onLoadDirecciones,
    onLoadErrores,
    onLoading,
    onSetActivateDireccion,
} from "../../store/direccion/direccionSlice";
import helpdeskApi from "../../api/helpdeskApi";


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
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/usuario/direcciones");
            const { direcciones } = data;
            dispatch(onLoadDirecciones(direcciones));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateDireccion = (direccion) => {
        dispatch(onSetActivateDireccion(direccion));
    }


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
        setActivateDireccion,
        clearDirecciones,
    };
};
