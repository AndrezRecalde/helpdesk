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
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/listar-actividades",
                {
                    user_id,
                    fecha_inicio,
                    fecha_fin,
                },
            );
            const { actividades } = data;
            dispatch(onLoadActividades(actividades));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startAddActividad = async (actividad, fecha_inicio, fecha_fin) => {
        try {
            if (actividad.id) {
                const { data } = await helpdeskApi.put(
                    `/usuario/update/actividad/${actividad.id}`,
                    actividad,
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadActividades(
                    actividad.cdgo_usrio,
                    dayjs(fecha_inicio).format("YYYY-MM-DD"),
                    dayjs(fecha_fin).format("YYYY-MM-DD"),
                );
                setClearActivateActividad();
                return;
            }
            const { data } = await helpdeskApi.post(
                "/usuario/create/actividad",
                actividad,
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
        fecha_fin,
    ) => {
        try {
            dispatch(onLoadPDF(true));

            const { data } = await helpdeskApi.post(
                "/usuario/export/pdf/actividades",
                { user_id, fecha_inicio, fecha_fin },
                { responseType: "blob" },
            );

            const blob = new Blob([data], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            // Fecha y hora del sistema en formato YYYY-MM-DD_HH-mm
            const now = new Date();
            const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
            const time = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-mm-ss
            const timestamp = `${date}_${time}`;

            // Nombre del archivo con usuario + timestamp
            const fileName = `actividades_${timestamp}.pdf`;

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            link.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoadPDF(false));
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
