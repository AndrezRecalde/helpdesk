import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearImagenes,
    onLoadErrores,
    onLoadImagenes,
    onLoadMessage,
    onSetActivateImagenes,
} from "../../store/app/appSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useAppStore = () => {
    const { isLoading, imagenes, activateImagenes, message, errores } =
        useSelector((state) => state.app);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);
    const dispatch = useDispatch();

    const startLoadImagenes = async () => {
        try {
            const { data } = await helpdeskApi.get("/app/imagenes");
            const { imagenes } = data;
            localStorage.setItem("service_images", JSON.stringify(imagenes));
            dispatch(onLoadImagenes(imagenes));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateImagenes = async (application) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/app/imagenes/update/${application.id}`,
                application
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const setActivateImagenes = (imagenes) => {
        dispatch(onSetActivateImagenes(imagenes));
    };

    const startClearImagenes = () => {
        dispatch(onClearImagenes());
    }

    return {
        isLoading,
        imagenes,
        activateImagenes,
        message,
        errores,

        startLoadImagenes,
        startUpdateImagenes,
        setActivateImagenes,
        startClearImagenes,
    };
};
