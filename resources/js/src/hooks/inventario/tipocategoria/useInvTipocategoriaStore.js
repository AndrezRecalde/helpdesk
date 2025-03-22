import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvTipocategorias,
    onDeleteInvTipocategoria,
    onLoadErrores,
    onLoading,
    onLoadInvTiposcategorias,
    onLoadMessage,
    onSetActivateInvTipocategoria,
} from "../../../store/inventario/tipocategoria/invTipocategoriaSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvTipocategoriaStore = () => {
    const {
        isLoading,
        tiposcategorias,
        activateTipocategoria,
        message,
        errores,
    } = useSelector((state) => state.invTipocategoria);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadTiposcategorias = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/gerencia/inventario/tipos-categorias"
            );
            const { tipos_categorias } = data;
            dispatch(onLoadInvTiposcategorias(tipos_categorias));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddTipocategoria = async (tipocategoria) => {
        try {
            if (tipocategoria.id) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/inventario/tipo-categoria/update/${tipocategoria.id}`,
                    tipocategoria
                );
                startLoadTiposcategorias();
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/tipo-categoria/store",
                tipocategoria
            );
            startLoadTiposcategorias();
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteTipocategoria = async (tipocategoria) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/tipo-categoria/destroy/${tipocategoria.id}`
            );
            dispatch(onDeleteInvTipocategoria());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startClearTiposcategorias = () => {
        dispatch(onClearInvTipocategorias());
    }

    const setActivateTipocategoria = (tipocategoria) => {
        dispatch(onSetActivateInvTipocategoria(tipocategoria));
    }

    return {
        isLoading,
        tiposcategorias,
        activateTipocategoria,
        message,
        errores,

        startLoadTiposcategorias,
        startAddTipocategoria,
        startDeleteTipocategoria,
        startClearTiposcategorias,
        setActivateTipocategoria
    };
};
