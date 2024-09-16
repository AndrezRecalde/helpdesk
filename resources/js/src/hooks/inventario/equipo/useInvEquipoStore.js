import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvEquipos,
    onDeleteInvEquipo,
    onLoadErrores,
    onLoadInvEquipos,
    onLoadMessage,
    onSetActivateInvEquipo,
} from "../../../store/inventario/equipo/invEquipoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvEquipoStore = () => {
    const { isLoading, invEquipos, activateInvEquipo, message, errores } =
        useSelector((state) => state.invEquipo);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvEquipos = async ({
        codigo_antiguo = null,
        codigo_nuevo = null,
        estado_id = null,
        categoria_id = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/inventario/equipos", {
                codigo_antiguo,
                codigo_nuevo,
                estado_id,
                categoria_id,
            });
            const { equipos } = data;
            dispatch(onLoadInvEquipos(equipos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvEquipo = async (equipo) => {
        try {
            if (equipo.id) {
                const { data } = await helpdeskApi.put(
                    `/inventario/equipo/update/${equipo.id}`,
                    equipo
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/inventario/equipo/store",
                equipo
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvEquipo = async (equipo) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/inventario/equipo/destroy/${equipo.id}`
            );
            dispatch(onDeleteInvEquipo());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateInvEquipo = (equipo) => {
        dispatch(onSetActivateInvEquipo(equipo));
    };

    const startClearInvEquipos = () => {
        dispatch(onClearInvEquipos());
    };

    const startAssignEquipo = async (equipo) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/inventario/asignar/${equipo.id}`,
                equipo
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startRemoveUsuarioEquipo = async (equipo_id, user_id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.delete(
                `/equipo/${equipo_id}/usuario/${user_id}`
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    return {
        isLoading,
        invEquipos,
        activateInvEquipo,
        message,
        errores,

        startLoadInvEquipos,
        startAddInvEquipo,
        startDeleteInvEquipo,
        setActivateInvEquipo,
        startClearInvEquipos,
        startAssignEquipo,
        startRemoveUsuarioEquipo
    };
};
