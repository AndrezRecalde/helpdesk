import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvUbicaciones,
    onDeleteInvUbicacion,
    onLoadErrores,
    onLoading,
    onLoadInvUbicaciones,
    onLoadMessage,
    onSetActivateInvUbicacion,
} from "../../../store/inventario/ubicacion/invUbicacionSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvUbicacionStore = () => {
    const { isLoading, invUbicaciones, activateUbicacion, message, errores } =
        useSelector((state) => state.invUbicacion);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvUbicaciones = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/inventario/ubicaciones");
            const { ubicaciones } = data;
            dispatch(onLoadInvUbicaciones(ubicaciones));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvUbicacion = async (ubicacion) => {
        try {
            if (ubicacion.id) {
                const { data } = await helpdeskApi.put(
                    `/inventario/ubicacion/update/${ubicacion.id}`,
                    ubicacion
                );
                startLoadInvUbicaciones();
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/inventario/ubicacion/store",
                ubicacion
            );
            startLoadInvUbicaciones();
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvUbicacion = async (ubicacion) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/inventario/ubicacion/destroy/${ubicacion.id}`
            );
            dispatch(onDeleteInvUbicacion());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateInvUbicacion = (ubicacion) => {
        dispatch(onSetActivateInvUbicacion(ubicacion));
    };

    const startClearInvUbicaciones = () => {
        dispatch(onClearInvUbicaciones());
    }

    return {
        isLoading,
        invUbicaciones,
        activateUbicacion,
        message,
        errores,

        startLoadInvUbicaciones,
        startAddInvUbicacion,
        startDeleteInvUbicacion,
        setActivateInvUbicacion,
        startClearInvUbicaciones
    };
};
