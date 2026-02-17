import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearPermissions,
    onLoadPermissions,
    onLoadErrores,
    onLoadMessage,
    onSetActivePermission,
    onLoading,
    onAddPermission,
    onUpdatePermission,
    onDeletePermission,
} from "../../store/accessControl/accessPermissionSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useAccessPermissionStore = () => {
    const { isLoading, permissions, activePermission, message, errores } =
        useSelector((state) => state.accessPermission);

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadPermissions = async () => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get("/gerencia/permissions");
            const { permissions } = data;
            dispatch(onLoadPermissions(permissions));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startAddPermission = async (permission) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/gerencia/permissions",
                permission,
            );
            dispatch(onAddPermission(data.permission));
            dispatch(
                onLoadMessage({
                    status: data.status,
                    msg: data.message,
                }),
            );
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startUpdatePermission = async (permission) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.put(
                `/gerencia/permissions/${permission.id}`,
                permission,
            );
            dispatch(onUpdatePermission(data.permission));
            dispatch(
                onLoadMessage({
                    status: data.status,
                    msg: data.message,
                }),
            );
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startDeletePermission = async (id) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.delete(
                `/gerencia/permissions/${id}`,
            );
            dispatch(onDeletePermission(id));
            dispatch(
                onLoadMessage({
                    status: data.status,
                    msg: data.message,
                }),
            );
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const setActivePermission = (permission) => {
        dispatch(onSetActivePermission(permission));
    };

    const clearPermissions = () => {
        dispatch(onClearPermissions());
    };

    return {
        isLoading,
        permissions,
        activePermission,
        message,
        errores,

        startLoadPermissions,
        startAddPermission,
        startUpdatePermission,
        startDeletePermission,
        setActivePermission,
        clearPermissions,
    };
};
