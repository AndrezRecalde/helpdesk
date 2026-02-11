import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../error/useErrorException";
import {
    onClearDescuentos,
    onLoadDescuentos,
    onLoadErrores,
    onLoading,
    onLoadMessage,
    onSetActivateDescuento,
    onSetPaginacion,
    onSetUltimosFiltros,
} from "../../../store/vacaciones/descuento/descuentoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useDescuentoStore = () => {
    const {
        isLoading,
        descuentos,
        activateDescuento,
        message,
        errores,
        paginacion,
        ultimosFiltros,
    } = useSelector((state) => state.descuento);
    const dispatch = useDispatch();
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLoadDescuentos = async ({
        usuario_id = null,
        anio,
        por_pagina = 15,
        pagina = 1,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/tthh/asistencia/descuentos",
                {
                    usuario_id,
                    anio,
                    por_pagina,
                    pagina,
                },
            );
            const { descuentos, paginacion } = data;
            dispatch(onSetUltimosFiltros({ usuario_id, anio }));
            dispatch(onLoadDescuentos(descuentos));
            dispatch(onSetPaginacion(paginacion));
        } catch (error) {
            //console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startAddDescuento = async (descuento) => {
        try {
            if (descuento.id) {
                const { data } = await helpdeskApi.put(
                    `/tthh/asistencia/update/descuento/${descuento.id}`,
                    descuento,
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/tthh/asistencia/store/descuento",
                descuento,
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
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
        paginacion,
        ultimosFiltros,

        startLoadDescuentos,
        startAddDescuento,
        setActivateDescuento,
        startClearDescuentos,
    };
};
