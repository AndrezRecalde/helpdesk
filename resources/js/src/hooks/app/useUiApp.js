import { useDispatch, useSelector } from "react-redux";
import { onOpenModalImagenes } from "../../store/app/uiAppSlice";

export const useUiApp = () => {
    const { isOpenModalImagenes } = useSelector((state) => state.uiApp);
    const dispatch = useDispatch();

    const modalActionApplication = (behavior) => {
        dispatch(onOpenModalImagenes(behavior));
    };

    return {
        isOpenModalImagenes,

        modalActionApplication
    };
};
