import { useDispatch, useSelector } from "react-redux";
import helpdeskApi from "../../../api/helpdeskApi";
import {
    onLoading,
    onExporting,
    onLoadSolicitudes,
    onAddSolicitud,
    onSetActiveSolicitud,
    onClearActiveSolicitud,
    onClearSolicitudes,
    onLoadMessage,
    onLoadErrores,
    onClearMessages,
} from "../../../store/solicitudConsumible/solicitudConsumibleSlice";

export const useSolicitudConsumibleStore = () => {
    const dispatch = useDispatch();
    const {
        isLoading,
        isExporting,
        solicitudes,
        pagination,
        activeSolicitud,
        message,
        errores,
    } = useSelector((state) => state.solicitudConsumible);

    const startLoadSolicitudes = async (filters = {}) => {
        dispatch(onLoading(true));
        try {
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/solicitudes-consumibles",
                filters,
            );
            // Backend devuelve { status, solicitudes, pagination }
            dispatch(
                onLoadSolicitudes({
                    solicitudes: data.solicitudes || [],
                    pagination: data.pagination || {},
                }),
            );
        } catch (error) {
            console.error("Error loading solicitudes:", error);
            dispatch(
                onLoadErrores(
                    error.response?.data?.error ||
                        "Error al cargar solicitudes",
                ),
            );
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startCreateSolicitud = async (solicitudData) => {
        dispatch(onLoading(true));
        try {
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/solicitud-consumible/store",
                solicitudData,
            );
            dispatch(onAddSolicitud(data.solicitud));
            dispatch(onLoadMessage(data.msg));
            return { success: true };
        } catch (error) {
            console.error("Error creating solicitud:", error);
            dispatch(
                onLoadErrores(
                    error.response?.data?.error || "Error al crear solicitud",
                ),
            );
            return { success: false, error: error.response?.data?.error };
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startExportPDF = async (id) => {
        dispatch(onExporting(true));
        try {
            const response = await helpdeskApi.get(
                `/gerencia/inventario/solicitud-consumible/${id}/pdf`,
                { responseType: "blob" },
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Solicitud_${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error exporting PDF:", error);
            dispatch(onLoadErrores("Error al exportar PDF"));
        } finally {
            dispatch(onExporting(false));
        }
    };

    const setActiveSolicitud = (solicitud) => {
        dispatch(onSetActiveSolicitud(solicitud));
    };

    const clearActiveSolicitud = () => {
        dispatch(onClearActiveSolicitud());
    };

    const clearSolicitudes = () => {
        dispatch(onClearSolicitudes());
    };

    const clearMessages = () => {
        dispatch(onClearMessages());
    };

    return {
        isLoading,
        isExporting,
        solicitudes,
        pagination,
        activeSolicitud,
        message,
        errores,
        startLoadSolicitudes,
        startCreateSolicitud,
        startExportPDF,
        setActiveSolicitud,
        clearActiveSolicitud,
        clearSolicitudes,
        clearMessages,
    };
};
