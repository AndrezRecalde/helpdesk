import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    //onAnularPermiso,
    onClearPermisos,
    onExport,
    onLoadErrores,
    onLoadMessage,
    onLoadPermisos,
    onLoading,
    onSetActivatePermiso,
} from "../../store/permiso/permisoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const usePermisoStore = () => {
    const { isLoading, permisos, activatePermiso, isExport, message, errores } =
        useSelector((state) => state.permiso);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startAddPermiso = async (permiso) => {
        try {
            const { data } = await helpdeskApi.post(
                "/usuario/crear-permiso",
                permiso
            );
            dispatch(onLoadMessage(data));
            //console.log(data)
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 8000);
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error)
            ExceptionMessageError(error);
        }
    };

    const startCardPermiso = async (idper_permisos) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/usuario/export-permiso-pdf",
                { idper_permisos },
                { responseType: "blob" }
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
            dispatch(onSetActivatePermiso(null));
        } catch (error) {
            //console.log(error);
            dispatch(onExport(false));
            ExceptionMessageError(error);
        }
    };

    const startExportPermiso = async ({ idper_permisos }) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/usuario/permiso-pdf",
                { idper_permisos },
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.open(URL.createObjectURL(pdfBlob));
            //console.log(url);
            /*  const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "permiso.pdf");
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink); */
            window.URL.revokeObjectURL(url);
            dispatch(onExport(false));
            dispatch(onSetActivatePermiso(null));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadPermisos = async ({
        anio = new Date(),
        fecha_inicio = null,
        fecha_fin = null,
        id_direccion_pide = null,
        id_usu_pide = null,
        idper_permisos = null,
        id_estado = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/usuario/permisos", {
                anio,
                fecha_inicio,
                fecha_fin,
                id_direccion_pide,
                id_usu_pide,
                idper_permisos,
                id_estado,
            });
            const { permisos } = data;
            dispatch(onLoadPermisos(permisos));
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            dispatch(onLoadPermisos([]));
            ExceptionMessageError(error);
        }
    };

    const startAnularPermiso = async (permiso, storageFields = null) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/usuario/anular-permiso/${permiso.idper_permisos}`
            );
            //dispatch(onAnularPermiso(permiso));
            startLoadPermisos(storageFields);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadInfoPermisos = async (usuario_id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/usuario/info-permisos", {
                usuario_id,
            });
            const { info_permisos } = data;
            dispatch(onSetActivatePermiso(info_permisos));
            dispatch(onLoading(false));
        } catch (error) {
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const startLoadConsolidadosPermisos = async (seleccion) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/tthh/asistencia/consolidado-permisos",
                seleccion
            );
            const { permisos } = data;
            //console.log(permisos);
            dispatch(onLoadPermisos(permisos));
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportConsolidadosPermisos = async (seleccion) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/tthh/asistencia/export/consolidado-permisos",
                seleccion,
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.open(URL.createObjectURL(pdfBlob));
            window.URL.revokeObjectURL(url);
            dispatch(onExport(false));
        } catch (error) {
            //console.log(error);
            dispatch(onExport(false));
            ExceptionMessageError(error);
        }
    };

    const startUpdateEstadoPermiso = async (permiso, id_estado) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/tthh/asistencia/actualizar-permiso/${permiso.idper_permisos}`, {
                    id_estado
                }
            );
            //dispatch(onAnularPermiso(permiso));
            startLoadPermisos({
                anio: new Date(),
                //id_estado: 8,
            });
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onLoading(false));
        } catch (error) {
            //console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    const setActivatePermiso = (permiso) => {
        dispatch(onSetActivatePermiso(permiso));
    };

    const clearPermisos = () => {
        dispatch(onClearPermisos());
    };

    return {
        isLoading,
        isExport,
        permisos,
        activatePermiso,
        message,
        errores,

        startAddPermiso,
        startCardPermiso,
        startExportPermiso,
        startAnularPermiso,
        startLoadPermisos,
        startLoadInfoPermisos,
        startLoadConsolidadosPermisos,
        startExportConsolidadosPermisos,
        startUpdateEstadoPermiso,
        setActivatePermiso,
        clearPermisos,
    };
};
