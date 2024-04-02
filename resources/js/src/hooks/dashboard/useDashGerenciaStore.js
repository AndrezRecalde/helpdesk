import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearDashboard,
    onLoadErrores,
    onLoadSoportePorMes,
    onLoadSoportesForAreas,
    onLoadSoportesForEstado,
    onLoadTotalAreasTic,
    onLoadTotalDirecciones,
    onLoadTotalSoportesActuales,
    onLoadTotalSoportesCerrados,
    onLoadTotalSoportesNoAsignados,
    onLoadTotalSoportesPendientes,
    onLoadTotalTecnicos,
    onLoadTotalUsuarios,
    onLoading,
} from "../../store/dashboard/dashGerenciaSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useDashGerenciaStore = () => {
    const {
        isLoading,
        soportesForEstado,
        soportesPorMes,
        soportesForAreas,

        soportesActuales,
        soportesNoAsignados,
        soportesPendientes,
        soportesCerrados,

        totalUsuarios,
        totalDirecciones,
        totalTecnicos,
        totalAreasTic,

        errores,
    } = useSelector((state) => state.dashGerencia);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadDashboard = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/gerencia/dashboard");
            const {
                soportesForEstado,
                soportesPorMes,
                soportesForAreas,

                soportesActuales,
                soportesNoAsignados,
                soportesPendientes,
                soportesCerrados,

                totalUsuarios,
                totalDirecciones,
                totalTecnicos,
                totalAreasTic
            } = data;
            dispatch(onLoadSoportesForEstado(soportesForEstado));
            dispatch(onLoadSoportePorMes(soportesPorMes));
            dispatch(onLoadSoportesForAreas(soportesForAreas));
            dispatch(onLoadTotalSoportesActuales(soportesActuales));
            dispatch(onLoadTotalSoportesNoAsignados(soportesNoAsignados));
            dispatch(onLoadTotalSoportesPendientes(soportesPendientes));
            dispatch(onLoadTotalSoportesCerrados(soportesCerrados));
            dispatch(onLoadTotalUsuarios(totalUsuarios));
            dispatch(onLoadTotalDirecciones(totalDirecciones));
            dispatch(onLoadTotalTecnicos(totalTecnicos));
            dispatch(onLoadTotalAreasTic(totalAreasTic));
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearDashboard = () => {
        dispatch(onClearDashboard());
    };

    return {
        isLoading,
        soportesForEstado,
        soportesPorMes,
        soportesForAreas,
        soportesActuales,
        soportesNoAsignados,
        soportesPendientes,
        soportesCerrados,
        totalUsuarios,
        totalDirecciones,
        totalTecnicos,
        totalAreasTic,
        errores,

        startLoadDashboard,
        clearDashboard,
    };
};
