import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvConceptos,
    onDeleteInvConcepto,
    onLoadErrores,
    onLoading,
    onLoadInvConceptos,
    onLoadMessage,
    onSetActivateInvConcepto,
} from "../../../store/inventario/concepto/invConceptoSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvConceptoStore = () => {
    const { isLoading, invConceptos, activateConcepto, message, errores } =
        useSelector((state) => state.invConcepto);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvConceptos = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/gerencia/inventario/conceptos");
            const { conceptos } = data;
            dispatch(onLoadInvConceptos(conceptos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvConcepto = async (concepto) => {
        try {
            if (concepto.id) {
                const { data } = helpdeskApi.put(
                    `/gerencia/inventario/concepto/update/${concepto.id}`,
                    concepto
                );
                startLoadInvConceptos();
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/concepto/store",
                concepto
            );
            startLoadInvConceptos();
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvConcepto = async (conceptos) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/concepto/destroy/${conceptos.id}`
            );
            dispatch(onDeleteInvConcepto());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };
    const setActivateInvConcepto = (conceptos) => {
        dispatch(onSetActivateInvConcepto(conceptos));
    };

    const startClearInvConceptos = () => {
        dispatch(onClearInvConceptos());
    };

    return {
        isLoading,
        invConceptos,
        activateConcepto,
        message,
        errores,
        startLoadInvConceptos,
        startAddInvConcepto,
        startDeleteInvConcepto,
        setActivateInvConcepto,
        startClearInvConceptos,
    };
};
