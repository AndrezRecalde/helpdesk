import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalAddUser,
    onCloseModalResetPwd,
    onOpenModalAddUser,
    onOpenModalResetPwd,
} from "../../store/user/uiUserSlice";

export const useUiUser = () => {
    const { isOpenModalAddUser } = useSelector((state) => state.uiUser);
    const dispatch = useDispatch();

    const modalActionUser = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalAddUser())
            : dispatch(onCloseModalAddUser());
    };

    const modalActionResetPwd = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalResetPwd())
            : dispatch(onCloseModalResetPwd());
    };

    return {
        isOpenModalAddUser,

        modalActionUser,
        modalActionResetPwd
    };
};
