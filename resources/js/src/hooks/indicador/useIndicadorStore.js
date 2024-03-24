import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearIndicadores,
    onLoadDesempenoForAreas,
    onLoadDesempenoForEstados,
    onLoadDesempenoForTecnicos,
    onLoadEfectividadForAreas,
    onLoadEfectividadForTecnicos,
    onLoadErrores,
    onLoadSumaDesempenoForEstados,
    onLoadSumaDiasHabiles,
    onLoading,
    onPageLoad,
} from "../../store/indicador/indicadorSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useIndicadorStore = () => {
    const {
        isLoading,
        pageLoad,
        desempenoForEstados,
        sumaDesempenoForEstados,
        desempenoForAreas,
        desempenoForTecnicos,
        efectividadForAreas,
        efectividadForTecnicos,
        sumaDiasHabiles,
        errores,
    } = useSelector((state) => state.indicador);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadIndicadores = async (fecha_inicio, fecha_fin) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/indicador-soporte",
                { fecha_inicio, fecha_fin }
            );
            const {
                desempenoForEstados,
                sumaDesempenoForEstados,
                desempenoForAreas,
                desempenoForTecnicos,
                efectividadForAreas,
                efectividadForTecnicos,
                sumaDiasHabiles,
            } = data;
            dispatch(onLoadDesempenoForEstados(desempenoForEstados));
            dispatch(onLoadSumaDesempenoForEstados(sumaDesempenoForEstados));
            dispatch(onLoadDesempenoForAreas(desempenoForAreas));
            dispatch(onLoadDesempenoForTecnicos(desempenoForTecnicos));
            dispatch(onLoadEfectividadForAreas(efectividadForAreas));
            dispatch(onLoadEfectividadForTecnicos(efectividadForTecnicos));
            dispatch(onLoadSumaDiasHabiles(sumaDiasHabiles));
            dispatch(onPageLoad(true));
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportPDFIndicadores = async (fecha_inicio, fecha_fin) => {
        try {
            dispatch(onLoading(true));
            const response = await helpdeskApi.post(
                "/gerencia/reporte-indicador-pdf",
                { fecha_inicio, fecha_fin },
                { responseType: "blob" }
            );

            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "indicador.pdf");
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadDesempenoTecnicosAnual = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/gerencia/desempeno-tecnicos-anual");
            const { desempenoForTecnicos } = data;
            dispatch(onLoadDesempenoForTecnicos(desempenoForTecnicos));
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }


    const clearIndicadores = () => {
        dispatch(onClearIndicadores());
        dispatch(onPageLoad(false));
    };

    return {
        isLoading,
        pageLoad,
        desempenoForEstados,
        sumaDesempenoForEstados,
        desempenoForAreas,
        desempenoForTecnicos,
        efectividadForAreas,
        efectividadForTecnicos,
        sumaDiasHabiles,
        errores,

        startLoadIndicadores,
        startExportPDFIndicadores,
        startLoadDesempenoTecnicosAnual,
        clearIndicadores,
    };
};
