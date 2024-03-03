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

    /* ENDPOINTS GERENCIA */
    const startLoadDirecciones = async (id_empresa = null) => {
        try {
            const { data } = await helpdeskApi.post("/gerencia/direcciones", { id_empresa });
            const { direcciones } = data;
            dispatch(onLoadDirecciones(direcciones));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadDireccionesAdmin = async ({ id_empresa }) => {
        try {
            const { data } = await helpdeskApi.post("/gerencia/direcciones", {
                id_empresa,
            });
            const { direcciones } = data;
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
        startLoadDireccionesAdmin,
        clearDirecciones,
    };
};
