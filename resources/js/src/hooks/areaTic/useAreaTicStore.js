import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearAreas,
    onLoadAreas,
    onLoadErrores,
    onLoadMessage,
    onSetActivateArea,
    onLoading,
    onDeleteArea,
} from "../../store/areaTic/areaTicSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useAreaTicStore = () => {
    const { isLoading, areas, activateArea, message, errores } = useSelector(
        (state) => state.areaTic
    );

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadAreas = async (all = false) => {
        try {
            dispatch(onLoading());
            const endpoint = all ? "/gerencia/areas-tic/all" : "/gerencia/areas-tic";
            const { data } = await helpdeskApi.get(endpoint);
            const { areas } = data;
            dispatch(onLoadAreas(areas));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startLoadAreaById = async (id) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get(`/gerencia/areas-tic/${id}`);
            const { area } = data;
            return area;
        } catch (error) {
            ExceptionMessageError(error);
            return null;
        }
    };

    const startAddArea = async (area) => {
        try {
            const { data } = await helpdeskApi.post("/gerencia/areas-tic/store", area);
            await startLoadAreas(true); // Cargar todas las áreas
            setActivateArea(null);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startUpdateArea = async (area) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/areas-tic/update/${area.id_areas_tic}`,
                area
            );
            await startLoadAreas(true); // Cargar todas las áreas
            setActivateArea(null);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startDeleteArea = async (id) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.delete(`/gerencia/areas-tic/destroy/${id}`);
            await startLoadAreas(true); // Recargar todas las áreas para mostrar el cambio de estado
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error)
            ExceptionMessageError(error);
        }
    };

    const setActivateArea = (area) => {
        dispatch(onSetActivateArea(area));
    };

    const clearAreas = () => {
        dispatch(onClearAreas());
    };

    return {
        isLoading,
        areas,
        activateArea,
        message,
        errores,

        startLoadAreas,
        startLoadAreaById,
        startAddArea,
        startUpdateArea,
        startDeleteArea,
        setActivateArea,
        clearAreas,
    };
};
