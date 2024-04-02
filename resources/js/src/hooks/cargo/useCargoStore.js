import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearCargos, onLoadCargos, onLoadErrores, onLoading } from "../../store/cargo/cargoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useCargoStore = () => {
    const { isLoading, cargos, errores } = useSelector((state) => state.cargo);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadCargos = async () => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get("/gerencia/cargos");
            const { cargos } = data;
            dispatch(onLoadCargos(cargos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearCargos = () => {
        dispatch(onClearCargos());
    }

    return {
        isLoading,
        cargos,
        errores,

        startLoadCargos,
        clearCargos
    };
};
