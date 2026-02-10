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
    onLoadingEstadisticas,
    onLoadEstadisticas,
} from "../../store/tecnico/tecnicoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useTecnicoStore = () => {
    const {
        isLoading,
        isLoadingEstadisticas,
        tecnicos,
        estadisticas,
        activateTecnico,
        infoSoportes,
        message,
        errores,
    } = useSelector((state) => state.tecnico);

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
        current_year = new Date().getFullYear(),
    ) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/admin/tecnicos",
                {
                    current_year,
                },
            );
            const { tecnicos } = data;
            dispatch(onLoadTecnicos(tecnicos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startAddUpdateTecnico = async (tecnico) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/tecnico/${tecnico.cdgo_usrio}`,
                tecnico,
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
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/general/info-soportes", {
                user_id,
            });
            const { info } = data;
            dispatch(onSetInfoSoportes(info));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const loadEstadisticas = async () => {
        try {
            dispatch(onLoadingEstadisticas(true));
            const { data } = await helpdeskApi.get(
                "/gerencia/estadisticas/tecnicos",
            );
            dispatch(onLoadEstadisticas(data.estadisticas || []));
        } catch (err) {
            //console.error("Error loading estadísticas:", err);
            ExceptionMessageError(err);
        } finally {
            dispatch(onLoadingEstadisticas(false));
        }
    };

    const setActivateTecnico = (tecnico) => {
        dispatch(onSetActivateTecnico(tecnico));
    };

    const clearInfoSoportesTecnico = () => {
        dispatch(onSetInfoSoportes(undefined));
    };

    const clearTecnicos = () => {
        dispatch(onClearTecnicos());
    };

    return {
        isLoading,
        isLoadingEstadisticas,
        tecnicos,
        estadisticas,
        activateTecnico,
        infoSoportes,
        message,
        errores,

        startLoadTecnicos,
        startLoadTecnicosAdmin,
        startAddUpdateTecnico,
        startLoadInfoTecnicosSoporte,
        loadEstadisticas,
        setActivateTecnico,
        clearInfoSoportesTecnico,
        clearTecnicos,
    };
};
