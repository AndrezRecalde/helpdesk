import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAnularPermiso,
    onOpenModalAnularPermiso,
} from "../../store/permiso/uiPermisoSlice";

export const useUiPermiso = () => {
    const { isOpenModalAnularPermiso } = useSelector(
        (state) => state.uiPermiso
    );
    const dispatch = useDispatch();

    const modalActionAnularPermiso = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAnularPermiso())
            : dispatch(onCloseModalAnularPermiso());
    };

    return {
        isOpenModalAnularPermiso,

        modalActionAnularPermiso
    };
};
