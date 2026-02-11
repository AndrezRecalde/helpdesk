import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearVacaciones,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadingMotivos,
    onLoadMessage,
    onLoadMotivosVacaciones,
    onLoadSolicitudesVacaciones,
    onSetActivateVacacion,
} from "../../store/vacaciones/vacacionesSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useVacacionesStore = () => {
    const {
        isLoading,
        isLoadingMotivos,
        isExport,
        solicitudes,
        motivos,
        activateVacacion,
        message,
        errores,
    } = useSelector((state) => state.vacaciones);
    const dispatch = useDispatch();
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLoadMotivosVacaciones = async () => {
        try {
            dispatch(onLoadingMotivos(true));
            const { data } = await helpdeskApi.get(
                "/usuario/motivos-vacaciones",
            );
            const { motivos } = data;
            dispatch(onLoadMotivosVacaciones(motivos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadSolicitudesVacaciones = async ({
        cdgo_usrio = null,
        periodo_vacacional_id = null,
        anio,
        codigo = null,
        fecha_inicio = null,
        fecha_fin = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/solicitudes-vacaciones",
                {
                    cdgo_usrio,
                    periodo_vacacional_id,
                    codigo,
                    anio,
                    fecha_inicio,
                    fecha_fin,
                },
            );
            const { solicitudes } = data;
            dispatch(onLoadSolicitudesVacaciones(solicitudes));
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startSolicitarVacaciones = async (solicitud) => {
        //console.log(solicitud);
        try {
            const { data } = await helpdeskApi.post(
                "/usuario/solicitar-vacaciones",
                solicitud,
            );
            //console.log(data);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportFichaVacaciones = async (codigo_vacacion) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/usuario/export-vacaciones-pdf",
                { codigo_vacacion },
                { responseType: "blob" },
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.open(URL.createObjectURL(pdfBlob));
            //console.log(url);
            /* const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "permiso.pdf");
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink); */
            window.URL.revokeObjectURL(url);
            //dispatch(onLoadMessage(data));
            dispatch(onExport(false));
            dispatch(onSetActivateVacacion(null));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startGestionarVacaciones = async (
        gestionForm,
        vacacion,
        storageFields,
    ) => {
        try {
            console.log(vacacion);
            const { data } = await helpdeskApi.put(
                `/tthh/asistencia/gestionar-vacaciones/${vacacion.id}`,
                gestionForm,
            );
            dispatch(onLoadMessage(data));
            startLoadSolicitudesVacaciones(storageFields);
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error)
            ExceptionMessageError(error);
        }
    };

    const startSolicitarAnulacionVacaciones = async (
        solicitud,
        storageFields = null,
    ) => {
        try {
            const { data } = await helpdeskApi.put(
                `/usuario/solicitar-anulacion-vacaciones/${solicitud.id}`,
                solicitud,
            );
            startLoadSolicitudesVacaciones(storageFields);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateVacacion = (vacacion) => {
        dispatch(onSetActivateVacacion(vacacion));
    };

    const startClearVacaciones = () => {
        dispatch(onClearVacaciones());
    };

    return {
        isLoading,
        isLoadingMotivos,
        isExport,
        solicitudes,
        motivos,
        activateVacacion,
        message,
        errores,

        startLoadMotivosVacaciones,
        startLoadSolicitudesVacaciones,
        startSolicitarVacaciones,
        startExportFichaVacaciones,
        startGestionarVacaciones,
        startSolicitarAnulacionVacaciones,
        setActivateVacacion,
        startClearVacaciones,
    };
};
