import { useDispatch, useSelector } from "react-redux";
import {
    onToggleModalActivateTecnico,
    onToggleModalAddTecnico,
} from "../../store/tecnico/uiTecnicoSlice";

export const useUiTecnico = () => {
    const { isOpenModalAddTecnico, isOpenModalActivateTecnico, disabledInput } =
        useSelector((state) => state.uiTecnico);
    const dispatch = useDispatch();

    const toggleModalTecnico = (disabled = false) => {
        dispatch(onToggleModalAddTecnico(disabled));
    };

    const toggleModalActivateTecnico = () => {
        dispatch(onToggleModalActivateTecnico());
    };

    return {
        isOpenModalAddTecnico,
        isOpenModalActivateTecnico,
        disabledInput,

        toggleModalTecnico,
        toggleModalActivateTecnico,
    };
};
