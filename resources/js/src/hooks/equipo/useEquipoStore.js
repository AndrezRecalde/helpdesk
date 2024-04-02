import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import { onClearEquiposInformaticos, onLoadEquiposInformaticos, onLoadErrores } from "../../store/equipo/equipoSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useEquipoStore = () => {
    const { isLoading, equipos, activeEquipo, message, errores } = useSelector(
        (state) => state.equipo
    );
    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadEquiposInformaticos = async () => {
        try {
            const { data } = await helpdeskApi.get("/general/equipos");
            const { equipos } = data;
            dispatch(onLoadEquiposInformaticos(equipos));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    }

    const clearEquiposInformaticos = () => {
        dispatch(onClearEquiposInformaticos());
    }

    return {
        isLoading,
        equipos,
        activeEquipo,
        message,
        errores,

        startLoadEquiposInformaticos,
        clearEquiposInformaticos
    };
};
