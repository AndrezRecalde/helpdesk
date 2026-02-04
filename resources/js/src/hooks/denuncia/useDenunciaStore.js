import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearDenuncias,
    onLoadDenuncias,
    onLoadErrores,
    onLoadEstadisticas,
    onLoadMessage,
    onLoadMisDenuncias,
    onLoading,
    onSetActivateDenuncia,
    onSetCedulaVerificada,
    onUpdateDenuncia,
} from "../../store/denuncia/denunciaSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useDenunciaStore = () => {
    const {
        isLoading,
        denuncias,
        misDenuncias,
        activateDenuncia,
        estadisticas,
        message,
        errores,
        cedulaVerificada,
    } = useSelector((state) => state.denuncia);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    /* USUARIO - Verificar cédula */
    const startVerificarCedula = async (cedula) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/denuncias/verificar-cedula",
                { cedula }
            );
            dispatch(onSetCedulaVerificada(true));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            return true;
        } catch (error) {
            dispatch(onSetCedulaVerificada(false));
            ExceptionMessageError(error);
            return false;
        }
    };

    /* USUARIO - Crear denuncia */
    const startCrearDenuncia = async (formData) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/denuncias/crear",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch(onLoadMessage(data));
            dispatch(onSetCedulaVerificada(false));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            return data;
        } catch (error) {
            ExceptionMessageError(error);
            return null;
        }
    };

    /* USUARIO - Obtener mis denuncias */
    const startLoadMisDenuncias = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/usuario/denuncias/mis-denuncias"
            );
            dispatch(onLoadMisDenuncias(data.data));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* USUARIO - Ver detalle de mi denuncia */
    const startLoadMiDenuncia = async (numeroDenuncia) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                `/usuario/denuncias/${numeroDenuncia}`
            );
            dispatch(onSetActivateDenuncia(data.data));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* ADMIN - Listar todas las denuncias */
    const startLoadDenuncias = async (filters = {}) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/tthh/gerencia/denuncias",
                filters
            );
            dispatch(onLoadDenuncias(data.data));
            return data.pagination;
        } catch (error) {
            ExceptionMessageError(error);
            return null;
        }
    };

    /* ADMIN - Ver detalle de denuncia */
    const startLoadDenuncia = async (id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(`/tthh/gerencia/denuncias/${id}`);
            dispatch(onSetActivateDenuncia(data.data));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* ADMIN - Responder denuncia */
    const startResponderDenuncia = async (id, respuestaData) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/tthh/gerencia/denuncias/${id}/responder`,
                respuestaData
            );
            dispatch(onUpdateDenuncia(data.data));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            return true;
        } catch (error) {
            ExceptionMessageError(error);
            return false;
        }
    };

    /* ADMIN - Actualizar estado */
    const startUpdateEstado = async (id, estado) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/tthh/gerencia/denuncias/${id}/estado`,
                { estado }
            );
            dispatch(onUpdateDenuncia(data.data));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            return true;
        } catch (error) {
            ExceptionMessageError(error);
            return false;
        }
    };

    /* ADMIN - Descargar archivo */
    const startDescargarArchivo = async (archivoId, nombreOriginal) => {
        try {
            const response = await helpdeskApi.get(
                `/tthh/gerencia/denuncias/archivo/${archivoId}/descargar`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", nombreOriginal);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* ADMIN - Obtener estadísticas */
    const startLoadEstadisticas = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/tthh/gerencia/denuncias/estadisticas"
            );
            dispatch(onLoadEstadisticas(data.data));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* Limpiar estado */
    const clearDenuncias = () => {
        dispatch(onClearDenuncias());
    };

    /* Setear denuncia activa */
    const setActivateDenuncia = (denuncia) => {
        dispatch(onSetActivateDenuncia(denuncia));
    };

    /* Reset verificación de cédula */
    const resetCedulaVerificada = () => {
        dispatch(onSetCedulaVerificada(false));
    };

    return {
        isLoading,
        denuncias,
        misDenuncias,
        activateDenuncia,
        estadisticas,
        message,
        errores,
        cedulaVerificada,

        startVerificarCedula,
        startCrearDenuncia,
        startLoadMisDenuncias,
        startLoadMiDenuncia,
        startLoadDenuncias,
        startLoadDenuncia,
        startResponderDenuncia,
        startUpdateEstado,
        startDescargarArchivo,
        startLoadEstadisticas,
        clearDenuncias,
        setActivateDenuncia,
        resetCedulaVerificada,
    };
};
