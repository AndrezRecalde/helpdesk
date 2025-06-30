import { useDispatch, useSelector } from "react-redux";
import {
    onOpenModalActiveUser,
    onOpenModalAddUser,
    onOpenModalCodigoBiometrico,
    onOpenModalEditUser,
    onOpenModalResetPwd,
} from "../../store/user/uiUserSlice";

export const useUiUser = () => {
    const {
        isOpenModalAddUser,
        isModalEditUser,
        isOpenModalResetPwd,
        isOpenModalActiveUser,
        isOpenModalCodigoBiometrico,
    } = useSelector((state) => state.uiUser);
    const dispatch = useDispatch();

    const modalActionUser = (behavior, action = false) => {
        dispatch(onOpenModalAddUser(behavior));
        dispatch(onOpenModalEditUser(action));
    };

    const modalActionResetPwd = (behavior) => {
        dispatch(onOpenModalResetPwd(behavior));
    };

    const modalActionActiveUser = (behavior) => {
        dispatch(onOpenModalActiveUser(behavior));
    };

    const modalActionCodigoBiometrico = (behavior) => {
        dispatch(onOpenModalCodigoBiometrico(behavior));
    };

    return {
        isOpenModalAddUser,
        isModalEditUser,
        isOpenModalResetPwd,
        isOpenModalActiveUser,
        isOpenModalCodigoBiometrico,

        modalActionUser,
        modalActionResetPwd,
        modalActionActiveUser,
        modalActionCodigoBiometrico,
    };
};
