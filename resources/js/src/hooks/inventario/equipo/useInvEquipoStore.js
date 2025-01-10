import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvEquipos,
    onDeleteInvEquipo,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadInvEquipos,
    onLoadMessage,
    onRemoveDocumentoFromEquipo,
    onRemoveUserFromEquipo,
    onSetActivateEquipoFromTransfer,
    onSetActivateInvEquipo,
    onTransferirComponenteFromEquipo,
} from "../../../store/inventario/equipo/invEquipoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvEquipoStore = () => {
    const {
        isLoading,
        isExport,
        invEquipos,
        activateInvEquipo,
        activateEquipoFromTransfer,
        message,
        errores,
    } = useSelector((state) => state.invEquipo);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvEquipos = async ({
        usuario_id = null,
        direccion_id = null,
        codigo = null,
        estado_id = null,
        categoria_id = null,
        numero_serie = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/equipos",
                {
                    usuario_id,
                    direccion_id,
                    codigo,
                    estado_id,
                    categoria_id,
                    numero_serie,
                }
            );
            const { equipos } = data;
            dispatch(onLoadInvEquipos(equipos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadInvEquipoFromTransfer = async ({ codigo }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/equipos",
                { codigo }
            );
            const { equipos } = data;
            console.log(equipos);

            // Si 'equipos' está vacío, setea null, de lo contrario, usa equipos[0]
            if (equipos.length === 0) {
                dispatch(onSetActivateEquipoFromTransfer(null));
            } else {
                dispatch(onSetActivateEquipoFromTransfer(equipos[0]));
            }
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearEquipoFromTransfer = (equipo) => {
        dispatch(onSetActivateEquipoFromTransfer(equipo));
    };

    const startAddInvEquipo = async (equipo) => {
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
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAssignComponente = async (componentes = [], equipo) => {
        console.log(equipo);
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/asignar/componente/${equipo.id}`,
                componentes
            );
            startShowInvEquipo(equipo);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startTransferComponente = async (currentEquipo, equipo_id, id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/transferir/periferico/${id}`,
                { equipo_id }
            );
            dispatch(onTransferirComponenteFromEquipo(id));
            startShowInvEquipo(currentEquipo);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearEquipoFromEquipo = async (periferico) => {
        try {
            const { data } = await helpdeskApi.patch(
                `/gerencia/inventario/periferico/${periferico.id}/clear-equipo-id`
            );
            dispatch(onTransferirComponenteFromEquipo(periferico.id));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    return {
        isLoading,
        isExport,
        invEquipos,
        activateInvEquipo,
        activateEquipoFromTransfer,
        message,
        errores,

        startLoadInvEquipos,
        startLoadInvEquipoFromTransfer,
        startClearEquipoFromTransfer,
        startAddInvEquipo,
        startShowInvEquipo,
        startDeleteInvEquipo,
        setActivateInvEquipo,
        startClearInvEquipos,
        startAssignEquipo,
        startAssignComponente,
        startRemoveUsuarioEquipo,
        startTransferComponente,
        startClearEquipoFromEquipo,
        startGuardarArchivo,
        startEliminarArchivo,
        startDescargarArchivo,
        startExportEquipos,
    };
};
