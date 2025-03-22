import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvEstados,
    onDeleteInvEstado,
    onLoadErrores,
    onLoading,
    onLoadInvEstados,
    onLoadMessage,
    onSetActivateInvEstado,
} from "../../../store/inventario/estado/invEstadoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvEstadoStore = () => {
    const { isLoading, invEstados, activateInvEstado, message, errores } =
        useSelector((state) => state.invEstado);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvEstados = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/gerencia/inventario/estados");
            const { estados } = data;
            dispatch(onLoadInvEstados(estados));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvEstado = async (estado) => {
        try {
            if (estado.id) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/inventario/estado/update/${estado.id}`,
                    estado
                );
                startLoadInvEstados();
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/estado/store",
                estado
            );
            startLoadInvEstados();
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvEstado = async (estado) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/estado/destroy/${estado.id}`
            );
            dispatch(onDeleteInvEstado());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateInvEstado = (estado) => {
        dispatch(onSetActivateInvEstado(estado));
    }

    const startClearInvEstados = () => {
        dispatch(onClearInvEstados());
    }

    return {
        isLoading,
        invEstados,
        activateInvEstado,
        message,
        errores,

        startLoadInvEstados,
        startAddInvEstado,
        startDeleteInvEstado,
        setActivateInvEstado,
        startClearInvEstados
    };
};
