import { useDispatch, useSelector } from "react-redux";
import {
    onClearActividades,
    onLoadErrores,
    onLoadActividades,
    onLoadMessage,
    onLoadPDF,
    onSetActivateActividad,
    onLoading,
} from "../../store/actividad/actividadSlice";
import { useErrorException } from "../../hooks";
import helpdeskApi from "../../api/helpdeskApi";
import dayjs from "dayjs";

export const useActividadStore = () => {
    const {
        isLoading,
        loadPDF,
        actividades,
        activateActividad,
        tableLoad,
        message,
        errores,
    } = useSelector((state) => state.actividad);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadActividades = async (user_id, fecha_inicio, fecha_fin) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/usuario/listar-actividades",
                {
                    user_id,
                    fecha_inicio,
                    fecha_fin,
                }
            );
            const { actividades } = data;
            dispatch(onLoadActividades(actividades));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddActividad = async (actividad, fecha_inicio, fecha_fin) => {
        try {
            if (actividad.id) {
                const { data } = await helpdeskApi.put(
                    `/usuario/update/actividad/${actividad.id}`,
                    actividad
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadActividades(
                    actividad.cdgo_usrio,
                    dayjs(fecha_inicio).format("YYYY-MM-DD"),
                    dayjs(fecha_fin).format("YYYY-MM-DD")
                );
                setClearActivateActividad();
                return;
            }
            const { data } = await helpdeskApi.post(
                "/usuario/create/actividad",
                actividad
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportPDFActividades = async (
        user_id,
        fecha_inicio,
        fecha_fin
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await helpdeskApi.post(
                "/usuario/export/pdf/actividades",
                {
                    user_id,
                    fecha_inicio,
                    fecha_fin,
                },
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            //console.log(url);
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "actividades.pdf");
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
            dispatch(onLoadPDF(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateActividad = (actividad) => {
        dispatch(onSetActivateActividad(actividad));
    };

    const setClearActivateActividad = () => {
        dispatch(onSetActivateActividad(null));
    };

    const startClearActividades = () => {
        dispatch(onClearActividades());
    };

    return {
        isLoading,
        loadPDF,
        actividades,
        activateActividad,
        tableLoad,
        message,
        errores,

        startAddActividad,
        setActivateActividad,
        setClearActivateActividad,
        startClearActividades,
        startLoadActividades,
        startExportPDFActividades,
    };
};
