import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearMarcaciones,
    onLoadErrores,
    onLoading,
    onLoadMarcaciones,
    onLoadPermisos,
} from "../../store/marcacion/marcacionSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useMarcacionStore = () => {
    const { isLoading, marcaciones, permisos, activateMarcacion, message, errores } =
        useSelector((state) => state.marcacion);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadMarcaciones = async ({
        badgenumber,
        fecha_inicio,
        fecha_fin,
    }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/usuario/checkinout", {
                badgenumber,
                fecha_inicio,
                fecha_fin,
            });
            console.log(data)
            const { results, results_permisos } = data;
            dispatch(onLoadMarcaciones(results));
            dispatch(onLoadPermisos(results_permisos));
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearMarcaciones = () => {
        dispatch(onClearMarcaciones());
    };

    return {
        isLoading,
        marcaciones,
        permisos,
        activateMarcacion,
        message,
        errores,

        startLoadMarcaciones,
        clearMarcaciones,
    };
};
