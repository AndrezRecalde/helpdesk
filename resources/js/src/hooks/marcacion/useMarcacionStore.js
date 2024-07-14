import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearMarcaciones, onLoadErrores, onLoading, onLoadMarcaciones } from "../../store/marcacion/marcacionSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useMarcacionStore = () => {
    const { isLoading, marcaciones, activateMarcacion, message, errores } =
        useSelector((state) => state.marcacion);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadMarcaciones = async (
        badgenumber,
        fecha_inicio,
        fecha_fin
    ) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/usuario/checkinout", {
                badgenumber,
                fecha_inicio,
                fecha_fin,
            });
            const { results } = data;
            dispatch(onLoadMarcaciones(results));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearMarcaciones = () => {
        dispatch(onClearMarcaciones());
    }

    return {
        isLoading,
        marcaciones,
        activateMarcacion,
        message,
        errores,

        startLoadMarcaciones,
        clearMarcaciones
    };
};
