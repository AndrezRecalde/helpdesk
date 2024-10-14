import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvEquipos,
    onDeleteInvEquipo,
    onLoadErrores,
    onLoading,
    onLoadInvEquipos,
    onLoadMessage,
    onRemoveUserFromEquipo,
    onSetActivateInvEquipo,
} from "../../../store/inventario/equipo/invEquipoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvEquipoStore = () => {
    const { isLoading, invEquipos, activateInvEquipo, message, errores } =
        useSelector((state) => state.invEquipo);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvEquipos = async ({
        usuario_id = null,
        direccion_id = null,
        codigo = null,
        estado_id = null,
        categoria_id = null,
        numero_serie = null
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/equipos",
                {
                    usuario_id,
                    direccion_id,
                    codigo,
                    estado_id,
                    categoria_id,
                    numero_serie
                }
            );
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
                    `/gerencia/inventario/equipo/update/${equipo.id}`,
                    equipo
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/equipo/store",
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

    const startShowInvEquipo = async (equipo) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                `/gerencia/inventario/equipo/${equipo.id}`
            );
            const { equipo: invEquipo } = data;
            dispatch(onSetActivateInvEquipo(invEquipo));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvEquipo = async (equipo) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/equipo/destroy/${equipo.id}`
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
                `/gerencia/inventario/asignar/${equipo.id}`,
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

    const startRemoveUsuarioEquipo = async (equipo_id, id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/equipo/${equipo_id}/${id}`
            );
            dispatch(onRemoveUserFromEquipo())
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
        startShowInvEquipo,
        startDeleteInvEquipo,
        setActivateInvEquipo,
        startClearInvEquipos,
        startAssignEquipo,
        startRemoveUsuarioEquipo,
    };
};
