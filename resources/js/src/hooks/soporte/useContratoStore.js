import { useErrorException } from "../../hooks";
import {
    onLoading,
    onLoadMessage,
    onLoadErrores,
    onLoadContratos,
    onSetActiveContrato,
    onClearContratos,
    onLoadInstalaciones,
    onClearInstalaciones,
} from "../../store/soporte/contratoSlice";
import helpdeskApi from "../../api/helpdeskApi";
import { useDispatch, useSelector } from "react-redux";

export const useContratoStore = () => {
    const {
        isLoading,
        message,
        errores,
        contratos,
        activeContrato,
        instalaciones,
    } = useSelector((state) => state.contrato);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadContratos = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/gerencia/contratos");
            dispatch(onLoadContratos(data.contratos));
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startCreateContrato = async (contrato) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/contratos",
                contrato,
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadContratos();
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startUpdateContrato = async (contrato) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/gerencia/contratos/${contrato.id_contrato}`,
                contrato,
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadContratos();
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startDeleteContrato = async (contrato) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.delete(
                `/gerencia/contratos/${contrato.id_contrato}`,
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadContratos();
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startActivateContrato = async (contrato) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.put(
                `/gerencia/contratos/${contrato.id_contrato}/activar`,
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadContratos();
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startLoadInstalaciones = async (id_contrato, id_licencia = null) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/licencias/instalaciones",
                {
                    id_contrato,
                    id_licencia,
                },
            );
            dispatch(onLoadInstalaciones(data.instalaciones));
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const setActiveContrato = (contrato) => {
        dispatch(onSetActiveContrato(contrato));
    };

    const clearContratos = () => {
        dispatch(onClearContratos());
    };

    const clearInstalaciones = () => {
        dispatch(onClearInstalaciones());
    };

    const startExportLicenciasPdf = async (id_contrato, id_licencia = null) => {
        try {
            dispatch(onLoading(true));
            const response = await helpdeskApi.post(
                "/gerencia/licencias/export-pdf",
                { id_contrato, id_licencia },
                { responseType: "blob" },
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte_licencias.pdf");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startExportLicenciasExcel = async (
        id_contrato,
        id_licencia = null,
    ) => {
        try {
            dispatch(onLoading(true));
            const response = await helpdeskApi.post(
                "/gerencia/licencias/export-excel",
                { id_contrato, id_licencia },
                { responseType: "blob" },
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte_licencias.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    return {
        isLoading,
        message,
        errores,
        contratos,
        activeContrato,
        instalaciones,

        startLoadContratos,
        startCreateContrato,
        startUpdateContrato,
        startDeleteContrato,
        startActivateContrato,
        startLoadInstalaciones,
        startExportLicenciasPdf,
        startExportLicenciasExcel,
        setActiveContrato,
        clearContratos,
        clearInstalaciones,
    };
};
