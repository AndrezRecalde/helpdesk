import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearRoles,
    onLoadRoles,
    onLoadErrores,
    onLoadMessage,
    onSetActiveRole,
    onLoading,
    onAddRole,
    onUpdateRole,
    onDeleteRole,
} from "../../store/accessControl/roleSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useRoleStore = () => {
    const { isLoading, roles, activeRole, message, errores } = useSelector(
        (state) => state.role,
    );

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const dispatch = useDispatch();

    const startLoadRoles = async () => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.get("/gerencia/roles");
            const { roles } = data;
            dispatch(onLoadRoles(roles));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const startAddRole = async (role) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/gerencia/roles", role);
            dispatch(onAddRole(data.role));
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

    const startUpdateRole = async (role) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.put(
                `/gerencia/roles/${role.id}`,
                role,
            );
            dispatch(onUpdateRole(data.role));
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
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startDeleteRole = async (id) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.delete(`/gerencia/roles/${id}`);
            dispatch(onDeleteRole(id));
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

    const setActiveRole = (role) => {
        dispatch(onSetActiveRole(role));
    };

    const clearRoles = () => {
        dispatch(onClearRoles());
    };

    return {
        isLoading,
        roles,
        activeRole,
        message,
        errores,

        startLoadRoles,
        startAddRole,
        startUpdateRole,
        startDeleteRole,
        setActiveRole,
        clearRoles,
    };
};
