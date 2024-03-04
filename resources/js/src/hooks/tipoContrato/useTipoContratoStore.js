import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearTiposContratos, onLoadErrores, onLoadTiposContratos } from "../../store/tiposContratos/tipoContratoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useTipoContratoStore = () => {
    const { isLoading, tiposContratos, errores } = useSelector(
        (state) => state.tipoContrato
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadTiposContratos = async () => {
        try {
            const { data } = await helpdeskApi.get("/gerencia/tipos-contratos");
            const { tiposContratos } = data;
            dispatch(onLoadTiposContratos(tiposContratos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearTiposContratos = () => {
        dispatch(onClearTiposContratos());
    }

    return {
        isLoading,
        tiposContratos,
        errores,

        startLoadTiposContratos,
        clearTiposContratos
    };
};
