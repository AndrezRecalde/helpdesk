import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearDirectores,
    onLoadDirectores,
    onLoadErrores,
    onLoadMessage,
    onLoading,
    onSetActivateDirectores,
    onUpdateDirector,
} from "../../store/directores/directorSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useDirectorStore = () => {
    const { isLoading, directores, activateDirector, message, errores } = useSelector(
        (state) => state.director
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    /* GERENTE */
    const startLoadDirectores = async ({ cdgo_dprtmnto }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/usuario/directores", {
                cdgo_dprtmnto,
            });
            const { directores } = data;
            dispatch(onLoadDirectores(directores));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateDirector = async (director) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.put(
                `/gerencia/update/director/departamento/${director.cdgo_dprtmnto}`, director
            );
            const { directores } = data
            dispatch(onUpdateDirector(directores));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateDirectores = (director) => {
        dispatch(onSetActivateDirectores({ ...director }));
    };

    const setClearActivateDirectores = () => {
        dispatch(onSetActivateDirectores(null));
    };

    const clearDirectores = () => {
        dispatch(onClearDirectores());
    };

    return {
        isLoading,
        directores,
        activateDirector,
        message,
        errores,

        startLoadDirectores,
        startUpdateDirector,
        setActivateDirectores,
        setClearActivateDirectores,
        clearDirectores,
    };
};
