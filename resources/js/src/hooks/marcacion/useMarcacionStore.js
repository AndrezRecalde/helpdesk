import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearMarcaciones,
    onLoadErrores,
    onLoading,
    onLoadMarcaciones,
    onLoadMessage,
} from "../../store/marcacion/marcacionSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useMarcacionStore = () => {
    const { isLoading, marcaciones, activateMarcacion, message, errores } =
        useSelector((state) => state.marcacion);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadMarcaciones = async ({
        asi_id_reloj,
        fecha_inicio,
        fecha_fin,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/usuario/marcaciones", {
                asi_id_reloj,
                fecha_inicio,
                fecha_fin,
            });
            //console.log(data)
            const { marcaciones } = data;
            dispatch(onLoadMarcaciones(marcaciones));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadMarcacionesBiometricos = async ({
        asi_id_reloj,
        fecha_inicio = null,
        fecha_fin = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/marcaciones-biometricos",
                { asi_id_reloj, fecha_inicio, fecha_fin }
            );
            const { marcaciones } = data;
            dispatch(onLoadMarcaciones(marcaciones));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddMarcacion = async ({ asi_id_reloj, checktype }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/store/marcacion",
                {
                    asi_id_reloj,
                    checktype
                }
            );
            if (data.status === "success") {
                startLoadMarcacionesBiometricos({ asi_id_reloj });
            }
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearMarcaciones = () => {
        dispatch(onClearMarcaciones());
    };

    return {
        isLoading,
        marcaciones,
        activateMarcacion,
        message,
        errores,

        startLoadMarcaciones,
        startLoadMarcacionesBiometricos,
        startAddMarcacion,
        clearMarcaciones,
    };
};
