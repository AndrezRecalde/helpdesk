import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearDirectores, onLoadDirectores, onLoadErrores, onLoading, onSetActivateDirectores } from "../../store/directores/directorSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useDirectorStore = () => {
    const { isLoading, directores, activateDirector, errores } = useSelector(
        (state) => state.director
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    /* GERENTE */
    const startLoadDirectores = async({ cdgo_dprtmnto }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/gerencia/directores", { cdgo_dprtmnto });
            const { directores } = data;
            dispatch(onLoadDirectores(directores));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }

    const setActivateDirectores  = (director) => {
        dispatch(onSetActivateDirectores({ ...director }));
    }

    const setClearActivateDirectores = () => {
        dispatch(onSetActivateDirectores(null));
    }

    const clearDirectores = () => {
        dispatch(onClearDirectores());
    }

    return {
        isLoading,
        directores,
        activateDirector,
        errores,

        startLoadDirectores,
        setActivateDirectores,
        setClearActivateDirectores,
        clearDirectores
    };
};
