import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../error/useErrorException";
import {
    onLoading,
    onLoadErrores,
    onLoadingPeriodos,
    onLoadMessage,
    onClearPeriodos,
    onSetActivatePeriodo,
    onSetTableCalculoDias,
} from "../../../store/vacaciones/periodo/periodoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const usePeriodoStore = () => {
    const { isLoading, isExport, periodos, activatePeriodo, tableCalculoDias, message, errores } =
        useSelector((state) => state.periodoVacacional);
    const dispatch = useDispatch();
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLoadPeriodos = async ({ cdgo_usrio = null }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/periodos-vacacionales",
                { cdgo_usrio }
            );
            const { periodos } = data;
            dispatch(onLoadingPeriodos(periodos));
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startLoadPeriodosByUser = async (cdgo_usrio) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/tthh/asistencia/consulta-periodos",
                { cdgo_usrio }
            );
            const { periodos } = data;
            dispatch(onLoadingPeriodos(periodos));
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startAddPeriodo = async (periodo) => {
        try {
            dispatch(onLoading(true));

            // Create new periodo
            const { data } = await helpdeskApi.post(
                "/tthh/asistencia/store/periodo",
                periodo
            );
            const { creados } = data;
            console.log(creados);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadPeriodos({});
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startUpdatePeriodo = async (periodo) => {
        try {
            const { data } = await helpdeskApi.put(
                `/tthh/asistencia/update/periodo/${periodo.id}`,
                periodo
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadPeriodos({});
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const calcularDias = async ({ cdgo_usrio, regimen_laboral_id, anios }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/tthh/asistencia/calcular-dias", {
                cdgo_usrio,
                regimen_laboral_id,
                anios,
            });
            const { resultados } = data;
            console.log(resultados);
            dispatch(onSetTableCalculoDias(resultados));
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startClearCalculoDias = () => {
        dispatch(onSetTableCalculoDias([]));
    };

    const setActivatePeriodo = (periodo) => {
        dispatch(onSetActivatePeriodo(periodo));
    };

    const startClearPeriodos = () => {
        dispatch(onClearPeriodos());
    };

    return {
        isLoading,
        isExport,
        periodos,
        activatePeriodo,
        tableCalculoDias,
        message,
        errores,

        startLoadPeriodos,
        startLoadPeriodosByUser,
        startAddPeriodo,
        startUpdatePeriodo,
        calcularDias,
        startClearCalculoDias,
        setActivatePeriodo,
        startClearPeriodos,
    };
};
