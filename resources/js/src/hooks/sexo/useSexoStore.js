import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearSexo, onLoadErrores, onLoadSexo, onLoading } from "../../store/sexo/sexoSlice";
import helpdeskApi from "../../api/helpdeskApi";


export const useSexoStore = () => {
    const { isLoading, sexo, errores } = useSelector((state) => state.sexo);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadTipoSexo = async () => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get("/gerencia/sexo");
            const { tipo_sexo } = data;
            dispatch(onLoadSexo(tipo_sexo));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearTipoSexo = () => {
        dispatch(onClearSexo());
    }

    return {
        isLoading,
        sexo,
        errores,

        startLoadTipoSexo,
        clearTipoSexo
    };
};
