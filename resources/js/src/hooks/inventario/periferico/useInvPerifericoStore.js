import { useDispatch, useSelector } from "react-redux";
import {
    onClearInvPerifericos,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadInvPerifericos,
    onLoadMessage,
    onSetActivateInvPeriferico,
} from "../../../store/inventario/periferico/invPerifericoSlice";
import { useErrorException } from "../../../hooks";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvPerifericoStore = () => {
    const {
        isLoading,
        isExport,
        invPerifericos,
        activatePeriferico,
        message,
        errores,
    } = useSelector((state) => state.invPeriferico);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvPerifericos = async ({
        numero_serie,
        marca_id,
        estado_id,
        codigo_equipo,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/perifericos",
                {
                    numero_serie,
                    marca_id,
                    estado_id,
                    codigo_equipo,
                }
            );
            const { perifericos } = data;
            dispatch(onLoadInvPerifericos(perifericos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvPeriferico = async (periferico, storageFields) => {
        try {
            if (periferico.id) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/inventario/update/periferico/${periferico.id}`,
                    periferico
                );
                startLoadInvPerifericos(storageFields);
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }

            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/store/periferico",
                periferico
            );
            startLoadInvPerifericos(storageFields);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateInvPeriferico = async (periferico, storageFields) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/update/periferico/${periferico.id}`,
                periferico
            );
            startLoadInvPerifericos(storageFields);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAssignEquipo = async (periferico, storageFields) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/assign/equipo/periferico/${periferico.id}`,
                periferico
            );
            startLoadInvPerifericos(storageFields);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearEquipo = async (periferico, storageFields = {}) => {
        try {
            const { data } = await helpdeskApi.patch(
                `/gerencia/inventario/periferico/${periferico.id}/clear-equipo-id`
            );
            startLoadInvPerifericos(storageFields);
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startExportComponentes = async (componentes) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/gerencia/inventario/export/perifericos",
                { componentes },
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

    const setActivateInvPeriferico = (periferico) => {
        dispatch(onSetActivateInvPeriferico(periferico));
    };

    const startClearInvPerifericos = () => {
        dispatch(onClearInvPerifericos());
    };

    return {
        isLoading,
        isExport,
        invPerifericos,
        activatePeriferico,
        message,
        errores,

        startLoadInvPerifericos,
        startAddInvPeriferico,
        startUpdateInvPeriferico,
        startAssignEquipo,
        setActivateInvPeriferico,
        startClearInvPerifericos,
        startClearEquipo,
        startExportComponentes,
    };
};
