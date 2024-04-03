import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onAnularSoporte,
    onCalificarSoporte,
    onClearSoportes,
    onLoadErrores,
    onLoadMessage,
    onLoadPDF,
    onLoadSoportes,
    onLoading,
    onSetActivateSoporte,
    onUpdateSoporte,
} from "../../store/soporte/soporteSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useSoporteStore = () => {
    const { isLoading, loadPDF, soportes, activateSoporte, message, errores } =
        useSelector((state) => state.soporte);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    /* GERENTE O TECNICO */
    const startLoadSoportesActuales = async (usuario) => {
        try {
            //dispatch(onLoading());
            if (usuario.role_id === 2) {
                const { data } = await helpdeskApi.post(
                    "/general/soportes-actuales",
                    { id_usu_tecnico_asig: usuario.cdgo_usrio }
                );
                return data;
            }
            const { data } = await helpdeskApi.post(
                "/general/soportes-actuales",
                { id_usu_tecnico_asig: null }
            );
            return data;

            //const { soportes } = data;
            //dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GERENTE */
    const startAsignarSoporte = async (soporte, role_id) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.put(
                `/gerencia/asignar-soporte/${soporte.id_sop}`,
                soporte
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadSoportesActuales(role_id);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GERENTE  */
    const startLoadSoportesAnulados = async (fecha_inicio, fecha_fin) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/gerencia/soportes-anulados",
                { fecha_inicio, fecha_fin }
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GERENTE */
    const startAnularSoporte = async (soporte) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/anular-soporte/${soporte.id_sop}`,
                {
                    obs_anulado: soporte.obs_anulado,
                }
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onAnularSoporte(soporte));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GERENTE */
    const startCreateSolicitudAdmin = async (solicitud) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/gerencia/crear-solicitud",
                solicitud
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

    /* GERENTE O TECNICO */
    const startCreateSoporte = async (soporte) => {
        try {
            /* GERENCIA */
            if (soporte.id_sop) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/actualizar-soporte/${soporte.id_sop}`,
                    soporte
                );
                dispatch(onLoadMessage(data));
                dispatch(onUpdateSoporte(soporte));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }

            /* GENERAL */
            const { data } = await helpdeskApi.post(
                "/general/crear-soporte",
                soporte
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

    /* GERENTE O TECNICO */
    const startSearchSoporte = async ({
        fecha_inicio,
        fecha_fin,
        anio,
        id_direccion,
        numero_sop,
        id_usu_tecnico_asig,
    }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/general/buscar-soportes",
                {
                    fecha_inicio,
                    fecha_fin,
                    anio,
                    id_direccion,
                    numero_sop,
                    id_usu_tecnico_asig,
                }
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* USUARIO SOLICITANTE */
    const startSendSolicitud = async (solicitud) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/usuario/enviar-solicitud",
                solicitud
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

    /* USUARIO SOLICITANTE */
    const startLoadSoportesAtendidos = async (id_usu_recibe) => {
        try {
            //dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/usuario/soportes-atendidos",
                { id_usu_recibe }
            );
            return data;
            /* const { soportes } = data; */
            //dispatch(onLoadSoportes(soportes));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startCerrarSoporte = async (soporte, values) => {
        try {
            const { data } = await helpdeskApi.put(
                `/usuario/cierre-soporte/${soporte.id_sop}`, values
            );
            dispatch(onCalificarSoporte(soporte));
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* GENERAL */
    const startDiagnosticarSoporte = async (soporte) => {
        try {
            const { data } = await helpdeskApi.put(
                `/general/diagnosticar-soporte/${soporte.id_sop}`,
                soporte
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            dispatch(onSetActivateSoporte(null));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadActividadesSoporte = async (
        fecha_inicio,
        fecha_fin,
        cdgo_usrio
    ) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/general/reporte-actividades",
                { fecha_inicio, fecha_fin, cdgo_usrio }
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GENERAL Y GERENCIA */
    /* TARJETA DE SOPORTE PARA FIRMAR USUARIO SOLICITANTE Y TECNICO */
    const startExportSoporte = async (id_sop) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await helpdeskApi.post(
                "/general/reporte-soporte-pdf",
                {
                    id_sop,
                },
                { responseType: "blob" }
            );

            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "ficha_soporte.pdf");
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

    const startExportActividadesSoportes = async (
        fecha_inicio,
        fecha_fin,
        cdgo_usrio
    ) => {
        try {
            dispatch(onLoadPDF(true));
            const response = await helpdeskApi.post(
                "/general/reporte-actividades-pdf",
                {
                    fecha_inicio,
                    fecha_fin,
                    cdgo_usrio,
                },
                { responseType: "blob" }
            );
            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "actividades_soportes.pdf");
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

    /* PARA USUARIOS */
    const startLoadSoportesActualesUsuarios = async (cdgo_usrio) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/usuario/soportes-actuales",
                { cdgo_usrio }
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadSoportesAnualesUsuarios = async (cdgo_usrio) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/usuario/soportes-anuales",
                { cdgo_usrio }
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadSoportesSinCalificar = async () => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get(
                "/gerencia/soportes-sin-calificar"
            );
            const { soportes } = data;
            dispatch(onLoadSoportes(soportes));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateCalificacion = async (id_soportes) => {
        try {
            const { data } = await helpdeskApi.post("/gerencia/calificacion", {
                id_soportes,
            });
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadSoportesSinCalificar();
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearSoportes = () => {
        dispatch(onClearSoportes());
    };

    const setActivateSoporte = (soporte) => {
        dispatch(onSetActivateSoporte(soporte));
    };

    return {
        isLoading,
        loadPDF,
        soportes,
        activateSoporte,
        message,
        errores,

        startLoadSoportesActuales,
        startAsignarSoporte,
        startLoadSoportesAnulados,
        startAnularSoporte,
        startCreateSolicitudAdmin,
        startCreateSoporte,
        startSearchSoporte,
        startSendSolicitud,
        startLoadSoportesAtendidos,
        startCerrarSoporte,
        startDiagnosticarSoporte,
        startLoadActividadesSoporte,
        startExportSoporte,
        startExportActividadesSoportes,
        startLoadSoportesActualesUsuarios,
        startLoadSoportesAnualesUsuarios,
        startLoadSoportesSinCalificar,
        startUpdateCalificacion,
        clearSoportes,
        setActivateSoporte,
    };
};
