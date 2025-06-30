import { useDispatch, useSelector } from "react-redux";
import { onLoadingHelpRuta } from "../../store/ruta/uiRutaSlice";

export const useUiRuta = () => {
    const { isLoadingHelpRuta } = useSelector((state) => state.uiRuta);
    const dispatch = useDispatch();

    const modalActionHelpRuta = (behavior = false) => {
        dispatch(onLoadingHelpRuta(behavior));
    };

    return {
        isLoadingHelpRuta,
        modalActionHelpRuta,
    };
};
