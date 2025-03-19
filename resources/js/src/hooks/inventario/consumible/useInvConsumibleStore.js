import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../error/useErrorException";
import {
    onClearInvConsumibles,
    onClearInvHistorial,
    onDeleteInvConsumible,
    onExport,
    onLoadErrores,
    onLoading,
    onLoadingHistorial,
    onLoadInvConsumibles,
    onLoadInvHistorial,
    onLoadMessage,
    onSetActivateInvConsumible,
} from "../../../store/consumible/invConsumibleSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvConsumibleStore = () => {
    const {
        isLoading,
        isExport,
        consumibles,
        historial,
        activateConsumible,
        message,
        errores,
    } = useSelector((state) => state.invConsumible);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvConsumibles = async ({ categoria_id = null }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/consumibles",
                {
                    categoria_id,
                }
            );
            const { consumibles } = data;
            dispatch(onLoadInvConsumibles(consumibles));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadHistorialConsumible = async ({ consumible_id, anio }) => {
        try {
            dispatch(onLoadingHistorial(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/historial-consumible",
                {
                    consumible_id,
                    anio
                }
            );
            const { historial } = data;
            dispatch(onLoadInvHistorial(historial));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }

    /* const startLoadInvConsumiblesSelects = async ({ categoria_id = null }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/consumibles",
                {
                    categoria_id,
                }
            );
            const { consumibles } = data;
            dispatch(onLoadInvConsumiblesSelects(consumibles));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    }; */

    const startAddConsumible = async (consumible) => {
        try {
            if (consumible.id) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/inventario/update/consumible/${consumible.id}`,
                    consumible
                );
                startLoadInvConsumibles({});
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/store/consumible",
                consumible
            );
            startLoadInvConsumibles({});
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvConsumible = async (consumible) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/consumible/destroy/${consumible.id}`
            );
            dispatch(onDeleteInvConsumible());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddIncrementarStock = async (consumible) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/inventario/consumible/incrementar/${consumible.id}`,
                consumible
            );
            startLoadInvConsumibles({});
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startSolicitarConsumible = async (solicitud) => {
        try {
            dispatch(onExport(true));
            const response = await helpdeskApi.post(
                "/gerencia/inventario/solicitar-consumible",
                solicitud,
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

    const setActivateInvConsumible = (consumible) => {
        dispatch(onSetActivateInvConsumible(consumible));
    };

    const startClearInvConsumibles = () => {
        dispatch(onClearInvConsumibles());
    };

    const startClearHistorial = () => {
        dispatch(onClearInvHistorial());
    }

    return {
        isLoading,
        isExport,
        consumibles,
        historial,
        activateConsumible,
        message,
        errores,

        startLoadInvConsumibles,
        startLoadHistorialConsumible,
        //startLoadInvConsumiblesSelects,
        startAddConsumible,
        startDeleteInvConsumible,
        startAddIncrementarStock,
        startSolicitarConsumible,
        setActivateInvConsumible,
        startClearInvConsumibles,
        startClearHistorial
    };
};
