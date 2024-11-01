import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearDepartamentos,
    onLoadDepartamentos,
    onLoadErrores,
    onLoading,
} from "../../store/departamento/departamentoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useDepartamentoStore = () => {
    const { isLoading, departamentos, errores } = useSelector(
        (state) => state.departamento
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    /* Gerencia */
    const startLoadDepartamentos = async (id_direccion) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/gerencia/departamentos", {
                id_direccion,
            });
            const { departamentos } = data;
            dispatch(onLoadDepartamentos(departamentos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearDepartamentos = () => {
        dispatch(onClearDepartamentos());
    };

    return {
        isLoading,
        departamentos,
        errores,

        startLoadDepartamentos,
        clearDepartamentos,
    };
};
