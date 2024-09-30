import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../../hooks";
import {
    onClearInvMarcas,
    onDeleteInvMarca,
    onLoadErrores,
    onLoading,
    onLoadInvMarcas,
    onLoadMessage,
    onSetActivateInvMarca,
} from "../../../store/inventario/marca/invMarcaSlice";
import helpdeskApi from "../../../api/helpdeskApi";

export const useInvMarcaStore = () => {
    const { isLoading, invMarcas, activateInvMarca, message, errores } =
        useSelector((state) => state.invMarca);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadInvMarcas = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/inventario/marcas");
            const { marcas } = data;
            dispatch(onLoadInvMarcas(marcas));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddInvMarca = async (marca) => {
        try {
            if (marca.id) {
                const { data } = await helpdeskApi.put(
                    `/inventario/marca/update/${marca.id}`,
                    marca
                );
                startLoadInvMarcas();
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }
            const { data } = await helpdeskApi.post(
                "/inventario/marca/store",
                marca
            );
            startLoadInvMarcas();
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteInvMarca = async (marca) => {
        try {
            const { data } = await helpdeskApi.delete(
                `/inventario/marca/destroy/${marca.id}`
            );
            dispatch(onDeleteInvMarca());
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const setActivateInvMarca = (marca) => {
        dispatch(onSetActivateInvMarca(marca));
    }

    const startClearInvMarcas = () => {
        dispatch(onClearInvMarcas());
    }

    return {
        isLoading,
        invMarcas,
        activateInvMarca,
        message,
        errores,

        startLoadInvMarcas,
        startAddInvMarca,
        startDeleteInvMarca,
        setActivateInvMarca,
        startClearInvMarcas
    };
};
