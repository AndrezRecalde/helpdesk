import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvEquipos,
    onDeleteInvEquipo,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadInvEquipos,
    onLoadInvEquiposBaja,
    onLoadMessage,
    onRemoveDocumentoFromEquipo,
    onRemoveUserFromEquipo,
    onSetActivateInvEquipo,
} from "../../../store/inventario/equipo/invEquipoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvEquipoStore = () => {
    const {
        isLoading,
        isExport,
        invEquipos,
        invEquiposBajas,
        activateInvEquipo,
        message,
        errores,
    } = useSelector((state) => state.invEquipo);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvEquipos = async ({ campo, valor = null }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/equipos",
                {
                    campo,
                    valor,
                }
            );
            const { equipos } = data;
            dispatch(onLoadInvEquipos(equipos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startSearchEquipos = async ({ user_id = null, direccion_id = null }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/buscar/equipo",
                {
                    user_id,
                    direccion_id
                }
            );
            const { equipos } = data;
            dispatch(onLoadInvEquiposBaja(equipos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvEquipo = async (equipo, storageFields = {}) => {
        try {
            if (equipo.id) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/inventario/equipo/update/${equipo.id}`,
                    equipo
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadInvEquipos(storageFields);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/equipo/store",
                equipo
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadInvEquipos(storageFields);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startShowInvEquipo = async (equipo) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                `/gerencia/inventario/equipo/${equipo.id}`
            );
            const { equipo: invEquipo } = data;
            dispatch(onSetActivateInvEquipo(invEquipo));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvEquipo = async (equipo) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/equipo/destroy/${equipo.id}`
            );
            dispatch(onDeleteInvEquipo());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateInvEquipo = (equipo) => {
        dispatch(onSetActivateInvEquipo(equipo));
    };

    const startClearInvEquipos = () => {
        dispatch(onClearInvEquipos());
    };

    const startAssignEquipo = async (equipo) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/asignar/${equipo.id}`,
                equipo
            );
            startShowInvEquipo(equipo);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startRemoveUsuarioEquipo = async (equipo_id, id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/equipo/${equipo_id}/${id}`
            );
            dispatch(onRemoveUserFromEquipo(id));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startGuardarArchivo = async (equipo, documento) => {
        try {
            const { data } = await helpdeskApi.post(
                `/gerencia/equipo/${equipo.id}/documento/guardar`,
                documento,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            startShowInvEquipo(equipo);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startEliminarArchivo = async (documento) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/equipo/documento/${documento.id}/eliminar`
            );
            dispatch(onRemoveDocumentoFromEquipo(documento.id));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startRemoverCustodio = async (equipo, storageFields = {}) => {
        try {
            const { data } = await helpdeskApi.post(
                `/gerencia/inventario/equipo/remover-custodio/${equipo.id}`
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadInvEquipos(storageFields);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAsignarCustodio = async (equipo, values, storageFields = {}) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/equipo/${equipo.id}/custodio`,
                values
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadInvEquipos(storageFields);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDescargarArchivo = async (documento) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.get(
                `/gerencia/equipo/descargar-documento/${documento.id}`,
                { responseType: "blob" } // Esto es importante para manejar el archivo correctamente
            );

            // Crear un blob del PDF y asignarlo a una URL
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);

            // Crear un enlace temporal para descargar el archivo
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${documento.nombre_documento}.pdf`); // Asigna el nombre del archivo
            document.body.appendChild(link);
            link.click();

            // Limpiar
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url); // Revoca el objeto después de la descarga

            dispatch(onExport(false));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportEquipos = async (equipos) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/gerencia/inventario/export/equipos",
                { equipos },
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
            ExceptionMessageError(error);
        }
    };

    const startBajaEquipos = async (values) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/gerencia/inventario/equipo/baja",
                values,
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
            ExceptionMessageError(error);
        }
    };

    return {
        isLoading,
        isExport,
        invEquipos,
        invEquiposBajas,
        activateInvEquipo,
        message,
        errores,

        startLoadInvEquipos,
        startSearchEquipos,
        startAddInvEquipo,
        startShowInvEquipo,
        startDeleteInvEquipo,
        setActivateInvEquipo,
        startClearInvEquipos,
        startAssignEquipo,
        startRemoveUsuarioEquipo,
        startGuardarArchivo,
        startEliminarArchivo,
        startRemoverCustodio,
        startAsignarCustodio,
        startDescargarArchivo,
        startExportEquipos,
        startBajaEquipos,
    };
};
