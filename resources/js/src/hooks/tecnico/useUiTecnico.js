import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalActivateTecnico,
    onCloseModalAddTecnico,
    onOpenModalActivateTecnico,
    onOpenModalAddTecnico,
} from "../../store/tecnico/uiTecnicoSlice";

export const useUiTecnico = () => {
    const { isOpenModalAddTecnico, isOpenModalActivateTecnico, disabledInput } = useSelector(
        (state) => state.uiTecnico
    );
    const dispatch = useDispatch();

    const modalActionTecnico = (behavior, disabled = false) => {
        behavior === 1
            ? dispatch(onOpenModalAddTecnico(disabled))
            : dispatch(onCloseModalAddTecnico());
    };

    const modalActionActivateTecnico = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalActivateTecnico())
            : dispatch(onCloseModalActivateTecnico());
    };

    return {
        isOpenModalAddTecnico,
        isOpenModalActivateTecnico,
        disabledInput,

        modalActionTecnico,
        modalActionActivateTecnico,
    };
};
