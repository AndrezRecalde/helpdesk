import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onAnularPermiso,
    onClearPermisos,
    onLoadErrores,
    onLoadMessage,
    onLoadPermisos,
    onLoading,
    onSetActivatePermiso,
} from "../../store/permiso/permisoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const usePermisoStore = () => {
    const { isLoading, permisos, activatePermiso, message, errores } = useSelector(
        (state) => state.permiso
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startAddPermiso = async (permiso) => {
        try {
            dispatch(onLoading(true));
            const response = await helpdeskApi.post(
                "/general/crear-permiso",
                permiso,
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            console.log(url);
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "permiso.pdf");
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

    const startExportPermiso = async ({ idper_permisos }) => {
        try {
            dispatch(onLoading(true));
            const response = await helpdeskApi.post(
                "/general/permiso-pdf",
                { idper_permisos },
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            console.log(url);
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "permiso.pdf");
            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
            dispatch(onLoading(false));
            dispatch(onSetActivatePermiso(null));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadPermisos = async ({ anio, id_direccion_pide, id_usu_pide, idper_permisos }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/general/permisos", {
                anio,
                id_direccion_pide,
                id_usu_pide,
                idper_permisos
            });
            const { permisos } = data;
            dispatch(onLoadPermisos(permisos));
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAnularPermiso = async(permiso) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(`/general/anular-permiso/${permiso.idper_permisos}`);
            dispatch(onAnularPermiso(permiso));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onLoading(false));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }

    const setActivatePermiso = (permiso) => {
        dispatch(onSetActivatePermiso(permiso));
    };

    const clearPermisos = () => {
        dispatch(onClearPermisos());
    }

    return {
        isLoading,
        permisos,
        activatePermiso,
        message,
        errores,

        startAddPermiso,
        startExportPermiso,
        startAnularPermiso,
        startLoadPermisos,
        setActivatePermiso,
        clearPermisos
    };
};
