import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvCategorias,
    onDeleteInvCategoria,
    onLoadErrores,
    onLoading,
    onLoadInvCategorias,
    onLoadMessage,
    onSetActivateInvCategoria,
} from "../../../store/inventario/categoria/invCategoriaSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvCategoriaStore = () => {
    const { isLoading, categorias, activateCategoria, message, errores } =
        useSelector((state) => state.invCategoria);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvCategorias = async ({
        tipocategoria_id = null,
        activo = null,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/gerencia/inventario/categorias", {
                tipocategoria_id,
                activo,
            });
            const { categorias } = data;
            dispatch(onLoadInvCategorias(categorias));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvCategoria = async (categoria) => {
        try {
            if (categoria.id) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/inventario/categoria/update/${categoria.id}`
                );
                startLoadInvCategorias({});
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/gerencia/inventario/categoria/store",
                categoria
            );
            startLoadInvCategorias({});
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvCategoria = async (categoria) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/gerencia/inventario/categoria/destroy/${categoria.id}`
            );
            dispatch(onDeleteInvCategoria());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateInvCategoria = (categoria) => {
        dispatch(onSetActivateInvCategoria(categoria));
    };

    const startClearInvCategorias = () => {
        dispatch(onClearInvCategorias());
    };

    return {
        isLoading,
        categorias,
        activateCategoria,
        message,
        errores,

        startLoadInvCategorias,
        startAddInvCategoria,
        startDeleteInvCategoria,
        setActivateInvCategoria,
        startClearInvCategorias,
    };
};
