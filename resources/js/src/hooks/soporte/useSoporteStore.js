import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearSoportes,
    onLoadErrores,
    onLoadMessage,
    onLoadSoportes,
    onLoading,
    onSetActivateSoporte,
} from "../../store/soporte/soporteSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useSoporteStore = () => {
    const { isLoading, soportes, activateSoporte, message, errores } =
        useSelector((state) => state.soporte);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadSoportesActuales = async (id_usu_tecnico_asig = null) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/general/soportes-actuales",
                { id_usu_tecnico_asig }
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAsignarSoporte = async (soporte) => {
        try {
            //dispatch(onLoading());
            const { data } = await helpdeskApi.put(
                `/gerencia/asignar-soporte/${soporte.id_sop}`,
                soporte
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadSoportesActuales();
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearSoportes = () => {
        dispatch(onClearSoportes());
    };

    const setActivateSoporte = (soporte) => {
       dispatch(onSetActivateSoporte(soporte));
    }

    return {
        isLoading,
        soportes,
        activateSoporte,
        message,
        errores,

        startLoadSoportesActuales,
        startAsignarSoporte,
        clearSoportes,
        setActivateSoporte
    };
};
