import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalActionDirector,
    onOpenModalActionDirector,
} from "../../store/directores/uiDirectorSlice";

export const useUiDirector = () => {
    const { isOpenModalActionDirector } = useSelector(
        (state) => state.uiDirector
    );
    const dispatch = useDispatch();

    const modalActionDirector = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalActionDirector())
            : dispatch(onCloseModalActionDirector());
    };

    return {
        isOpenModalActionDirector,

        modalActionDirector
    };
};
