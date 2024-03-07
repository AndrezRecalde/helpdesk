import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearTecnicos, onLoadErrores, onLoadTecnicos } from "../../store/tecnico/tecnicoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useTecnicoStore = () => {
    const { isLoading, tecnicos, activateTecnico, message, errores } =
        useSelector((state) => state.tecnico);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadTecnicos = async (cdgo_usrio = null) => {
        try {
            const { data } = await helpdeskApi.post("/general/tecnicos", {
                cdgo_usrio,
            });
            const { tecnicos } = data;
            dispatch(onLoadTecnicos(tecnicos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearTecnicos = () => {
        dispatch(onClearTecnicos());
    }

    return {
        isLoading,
        tecnicos,
        activateTecnico,
        message,
        errores,

        startLoadTecnicos,
        clearTecnicos
    };
};
