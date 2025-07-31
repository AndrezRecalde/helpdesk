import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../error/useErrorException";
import {
    onClearDescuentos,
    onLoadDescuentos,
    onLoadErrores,
    onLoading,
    onSetActivateDescuento,
} from "../../../store/vacaciones/descuento/descuentoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useDescuentoStore = () => {
    const { isLoading, descuentos, activateDescuento, message, errores } =
        useSelector((state) => state.descuento);
    const dispatch = useDispatch();
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLoadDescuentos = async ({ usuario_id = null, anio }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/tthh/asistencia/descuentos", {
                usuario_id,
                anio,
            });
            const { descuentos } = data;
            dispatch(onLoadDescuentos(descuentos));
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startAddDescuento = async (descuento) => {
        try {
            if (descuento.id) {
                const { data } = await helpdeskApi.put(
                    `/tthh/asistencia/descuento/update/${descuento.id}`,
                    descuento
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/tthh/asistencia/descuento/store",
                descuento
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const setActivateDescuento = (descuento) => {
        dispatch(onSetActivateDescuento(descuento));
    };

    const startClearDescuentos = () => {
        dispatch(onClearDescuentos());
    };

    return {
        isLoading,
        descuentos,
        activateDescuento,
        message,
        errores,

        startLoadDescuentos,
        startAddDescuento,
        setActivateDescuento,
        startClearDescuentos,
    };
};
