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
    onLoadPromedioCalificacion,
    onLoadSumaDesempenoForEstados,
    onLoadSumaDiasHabiles,
    onLoading,
    onLoadingPDF,
    onPageLoad,
} from "../../store/indicador/indicadorSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useIndicadorStore = () => {
    const {
        isLoading,
        isLoadingPDF,
        pageLoad,
        desempenoForEstados,
        sumaDesempenoForEstados,
        desempenoForAreas,
        desempenoForTecnicos,
        efectividadForAreas,
        efectividadForTecnicos,
        sumaDiasHabiles,
        promedioCalificacion,
        errores,
    } = useSelector((state) => state.indicador);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadIndicadores = async (fecha_inicio, fecha_fin) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/indicador-soporte",
                { fecha_inicio, fecha_fin },
            );
            const {
                desempenoForEstados,
                sumaDesempenoForEstados,
                desempenoForAreas,
                desempenoForTecnicos,
                efectividadForAreas,
                efectividadForTecnicos,
                sumaDiasHabiles,
                promedioCalificacion,
            } = data;
            dispatch(onLoadDesempenoForEstados(desempenoForEstados));
            dispatch(onLoadSumaDesempenoForEstados(sumaDesempenoForEstados));
            dispatch(onLoadDesempenoForAreas(desempenoForAreas));
            dispatch(onLoadDesempenoForTecnicos(desempenoForTecnicos));
            dispatch(onLoadEfectividadForAreas(efectividadForAreas));
            dispatch(onLoadEfectividadForTecnicos(efectividadForTecnicos));
            dispatch(onLoadSumaDiasHabiles(sumaDiasHabiles));
            dispatch(onLoadPromedioCalificacion(promedioCalificacion));
            dispatch(onPageLoad(true));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startExportPDFIndicadores = async (
        fecha_inicio,
        fecha_fin,
        chartTecnicosImage,
        chartAreasImage,
    ) => {
        try {
            dispatch(onLoadingPDF(true));
            const response = await helpdeskApi.post(
                "/gerencia/reporte-indicador-pdf",
                {
                    fecha_inicio,
                    fecha_fin,
                    chart_tecnicos_image: chartTecnicosImage,
                    chart_areas_image: chartAreasImage,
                },
                { responseType: "blob" },
            );

            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.open(URL.createObjectURL(pdfBlob));
            /* const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "indicador.pdf");
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink); */
            window.URL.revokeObjectURL(url);
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoadingPDF(false));
        }
    };

    const startLoadDesempenoTecnicosAnual = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/gerencia/desempeno-tecnicos-anual",
            );
            const { desempenoForTecnicos } = data;
            dispatch(onLoadDesempenoForTecnicos(desempenoForTecnicos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const clearIndicadores = () => {
        dispatch(onClearIndicadores());
        dispatch(onPageLoad(false));
    };

    return {
        isLoading,
        isLoadingPDF,
        pageLoad,
        desempenoForEstados,
        sumaDesempenoForEstados,
        desempenoForAreas,
        desempenoForTecnicos,
        efectividadForAreas,
        efectividadForTecnicos,
        sumaDiasHabiles,
        promedioCalificacion,
        errores,

        startLoadIndicadores,
        startExportPDFIndicadores,
        startLoadDesempenoTecnicosAnual,
        clearIndicadores,
    };
};
