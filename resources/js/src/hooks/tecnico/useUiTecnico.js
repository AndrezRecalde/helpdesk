import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAddTecnico,
    onOpenModalAddTecnico,
} from "../../store/tecnico/uiTecnicoSlice";

export const useUiTecnico = () => {
    const { isOpenModalAddTecnico } = useSelector((state) => state.uiTecnico);
    const dispatch = useDispatch();

    const modalActionTecnico = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAddTecnico())
            : dispatch(onCloseModalAddTecnico());
    };

    return {
        isOpenModalAddTecnico,

        modalActionTecnico
    };
};
