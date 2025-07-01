import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearEstados,
    onLoadErrores,
    onLoadEstados,
} from "../../store/estado/estadoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useEstadoStore = () => {
    const { isLoading, estados, errores } = useSelector(
        (state) => state.estado
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadEstados = async () => {
        try {
            const { data } = await helpdeskApi.get("/general/estados-soportes");
            const { estados } = data;
            dispatch(onLoadEstados(estados));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearEstados = () => {
        dispatch(onClearEstados());
    };

    return {
        isLoading,
        estados,
        errores,

        startLoadEstados,
        clearEstados
    };
};
