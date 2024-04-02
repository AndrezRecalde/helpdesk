import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearEmpresas, onLoadEmpresas, onLoadErrores } from "../../store/empresa/empresaSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useEmpresaStore = () => {
    const { isLoading, empresas, errores } = useSelector(
        (state) => state.empresa
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadEmpresas = async() => {
        try {
            const { data } = await helpdeskApi.get("/gerencia/empresas");
            const { empresas } = data;
            dispatch(onLoadEmpresas(empresas));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearEmpresas = () => {
        dispatch(onClearEmpresas());
    }

    return {
        isLoading,
        empresas,
        errores,

        startLoadEmpresas,
        clearEmpresas

    };
};
