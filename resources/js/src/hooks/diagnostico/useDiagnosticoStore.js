import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearDiagnosticos, onLoadDiagnosticos, onLoadErrores } from "../../store/diagnostico/diagnosticoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useDiagnosticoStore = () => {
    const { isLoading, diagnosticos, activeDiagnostico, message, errores } =
        useSelector((state) => state.diagnostico);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadDiagnosticos = async() => {
        try {
            const { data } = await helpdeskApi.get("/general/diagnosticos");
            const { diagnosticos } = data;
            dispatch(onLoadDiagnosticos(diagnosticos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearDiagnosticos = () => {
        dispatch(onClearDiagnosticos());
    }

    return {
        isLoading,
        diagnosticos,
        activeDiagnostico,
        message,
        errores,

        startLoadDiagnosticos,
        clearDiagnosticos
    };
};
