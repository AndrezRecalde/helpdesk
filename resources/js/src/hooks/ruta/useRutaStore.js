import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onLoadDespachos,
    onLoadErrores,
    onLoadFichaIngreso,
    onLoadingDespachos,
    onLoadingFichaIngreso,
    onLoadNumeroRuta,
} from "../../store/ruta/rutaSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useRutaStore = () => {
    const {
        isLoadingIngreso,
        isLoadingDespachos,
        ingreso,
        despachos,
        activateFichaIngreso,
        activateDespacho,
        message,
        errores,
    } = useSelector((state) => state.ruta);
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startSearchRutaTramite = async ({ anio, numero_ruta, captcha }) => {
        //console.log(captcha);
        try {
            dispatch(onLoadingDespachos(true));
            const { data } = await helpdeskApi.post("/consulta-tramite", {
                anio,
                numero_ruta,
                captcha,
            });
            const { numero_ruta: ruta, ingreso, despachos } = data;
            dispatch(onLoadNumeroRuta(ruta));
            dispatch(onLoadFichaIngreso(ingreso));
            dispatch(onLoadDespachos(despachos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoadingDespachos(false));
        }
    };

    const startBuscarFichasIngresos = async (formValues) => {
        try {
            dispatch(onLoadingFichaIngreso(true));
            const { data } = await helpdeskApi.post(
                "/usuario/fichas-ingresos/buscar",
                {
                    ...formValues,
                }
            );
            const { fichas_ingresos } = data;

            dispatch(onLoadFichaIngreso(fichas_ingresos));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoadingFichaIngreso(false));
        }
    };

    return {
        isLoadingIngreso,
        isLoadingDespachos,
        ingreso,
        despachos,
        activateFichaIngreso,
        activateDespacho,
        message,
        errores,

        startSearchRutaTramite,
        startBuscarFichasIngresos,
    };
};
