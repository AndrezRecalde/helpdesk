import { useDispatch, useSelector } from "react-redux";
import {
    onCloseModalActiveUser,
    onCloseModalAddUser,
    onCloseModalResetPwd,
    onOpenModalActiveUser,
    onOpenModalAddUser,
    onOpenModalResetPwd,
} from "../../store/user/uiUserSlice";

export const useUiUser = () => {
    const { isOpenModalAddUser, isOpenModalResetPwd, isOpenModalActiveUser } =
        useSelector((state) => state.uiUser);
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

    const modalActionActiveUser = (behavior) => {
        behavior === 1
            ? dispatch(onOpenModalActiveUser())
            : dispatch(onCloseModalActiveUser());
    }

    return {
        isOpenModalAddUser,
        isOpenModalResetPwd,
        isOpenModalActiveUser,

        modalActionUser,
        modalActionResetPwd,
        modalActionActiveUser
    };
};
