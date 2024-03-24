import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalDesempTecnicos,
    onOpenModalDesempTecnicos,
} from "../../store/indicador/uiIndicadorSlice";

export const useUiIndicador = () => {
    const { isOpenModalDesempTecnicos } = useSelector(
        (state) => state.uiIndicador
    );
    const dispatch = useDispatch();

    const modalActionDesempTecnicos = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalDesempTecnicos())
            : dispatch(onCloseModalDesempTecnicos());
    };

    return {
        isOpenModalDesempTecnicos,

        modalActionDesempTecnicos
    };
};
