import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearTecnicos,
    onLoadErrores,
    onLoadMessage,
    onLoadTecnicos,
    onSetActivateTecnico,
    onLoading,
    onSetInfoSoportes,
} from "../../store/tecnico/tecnicoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useTecnicoStore = () => {
    const { isLoading, tecnicos, activateTecnico, infoSoportes, message, errores } =
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
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadTecnicosAdmin = async (
        current_year = new Date().getFullYear()
    ) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/gerencia/admin/tecnicos",
                {
                    current_year,
                }
            );
            const { tecnicos } = data;
            dispatch(onLoadTecnicos(tecnicos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddUpdateTecnico = async (tecnico) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/tecnico/${tecnico.cdgo_usrio}`,
                tecnico
            );
            //dispatch(onDeleteTecnico());
            startLoadTecnicosAdmin();
            setActivateTecnico(null);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadInfoTecnicosSoporte = async (user_id) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/general/info-soportes", { user_id });
            const { info } = data;
            dispatch(onSetInfoSoportes(info));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    }

    const setActivateTecnico = (tecnico) => {
        dispatch(onSetActivateTecnico(tecnico));
    };

    const clearInfoSoportesTecnico = () => {
        dispatch(onSetInfoSoportes(undefined));
    }

    const clearTecnicos = () => {
        dispatch(onClearTecnicos());
    };

    return {
        isLoading,
        tecnicos,
        activateTecnico,
        infoSoportes,
        message,
        errores,

        startLoadTecnicos,
        startLoadTecnicosAdmin,
        startAddUpdateTecnico,
        startLoadInfoTecnicosSoporte,
        setActivateTecnico,
        clearInfoSoportesTecnico,
        clearTecnicos,
    };
};
