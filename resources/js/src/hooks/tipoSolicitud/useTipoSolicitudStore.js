import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearTiposSolicitudes,
    onLoadErrores,
    onLoadTiposSolicitudes,
} from "../../store/tiposSolicitudes/tipoSolicitudSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useTipoSolicitudStore = () => {
    const { isLoading, tiposSolicitudes, errores } = useSelector(
        (state) => state.tipoSolicitud
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    /* GENERAL */
    const startLoadTiposSolicitudes = async () => {
        try {
            const { data } = await helpdeskApi.get(
                "/general/tipos-solicitudes"
            );
            const { tipos_solicitudes } = data;
            dispatch(onLoadTiposSolicitudes(tipos_solicitudes));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearTiposSolicitudes = () => {
        dispatch(onClearTiposSolicitudes());
    };

    return {
        isLoading,
        tiposSolicitudes,
        errores,

        startLoadTiposSolicitudes,
        clearTiposSolicitudes
    };
};
