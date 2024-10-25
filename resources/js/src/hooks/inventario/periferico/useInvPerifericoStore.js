import { useDispatch, useSelector } from "react-redux";
import {
    onClearInvPerifericos,
    onLoadErrores,
    onLoadInvPerifericos,
    onLoadMessage,
    onSetActivateInvPeriferico,
} from "../../../store/inventario/periferico/invPerifericoSlice";
import { useErrorException } from "../../../hooks";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvPerifericoStore = () => {
    const { isLoading, invPerifericos, activatePeriferico, message, errores } =
        useSelector((state) => state.invPeriferico);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvPerifericos = async ({
        numero_serie,
        estado_id,
        equipo_id,
    }) => {
        try {
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/perifericos",
                {
                    numero_serie,
                    estado_id,
                    equipo_id,
                }
            );
            const { perifericos } = data;
            dispatch(onLoadInvPerifericos(perifericos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateInvPeriferico = async (periferico) => {
        try {
            const { data } = await helpdeskApi.put(
                `/inventario/transferir/periferico/${periferico.id}`,
                periferico
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

    const setActivateInvPeriferico = (periferico) => {
        dispatch(onSetActivateInvPeriferico(periferico));
    };

    const startClearInvPerifericos = () => {
        dispatch(onClearInvPerifericos());
    };

    return {
        isLoading,
        invPerifericos,
        activatePeriferico,
        message,
        errores,

        startLoadInvPerifericos,
        startUpdateInvPeriferico,
        setActivateInvPeriferico,
        startClearInvPerifericos,
    };
};
