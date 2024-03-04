import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearUsers,
    onLoadErrores,
    onLoadUsers,
    onLoading,
    onSetActivateUser,
    onSetMessage,
} from "../../store/user/usersSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useUsersStore = () => {
    const { isLoading, users, activateUser, validate, message, errores } =
        useSelector((state) => state.users);

    const dispatch = useDispatch();

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    /* GENERAL */
    const startLoadUsersGeneral = async ({ cdgo_direccion }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/general/usuarios",
                {
                    cdgo_direccion,
                }
            );
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GERENCIA */
    const startLoadUsers = async ({ cdgo_direccion, nmbre_usrio, lgin }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post(
                "/gerencia/admin/usuarios",
                {
                    cdgo_direccion,
                    nmbre_usrio,
                    lgin,
                }
            );
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddUser = async (user) => {
        try {
            if (user.cdgo_usrio) {
                const { data } = await helpdeskApi.put(
                    `/update/usuario/${user.cdgo_usrio}`,
                    user
                );
                dispatch(onSetMessage(data.msg));
                setTimeout(() => {
                    dispatch(onSetMessage(undefined));
                }, 40);
                return;
            }

            const { data } = await helpdeskApi.post(
                "/gerencia/store/usuario",
                user
            );
            dispatch(onSetMessage(data.msg));
            setTimeout(() => {
                dispatch(onSetMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const updateTecnico = async ({ cdgo_usrio, roles, actvo }) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/tecnico/${cdgo_usrio}`,
                {
                    roles,
                    actvo,
                }
            );
            dispatch(onSetMessage(data.msg));
            setTimeout(() => {
                dispatch(onSetMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearUsers = () => {
        dispatch(onClearUsers());
    }

    const setActivateUser = (user) => {
        dispatch(onSetActivateUser(user));
    }

    return {
        isLoading,
        users,
        activateUser,
        validate,
        errores,
        message,

        startLoadUsersGeneral,
        startLoadUsers,
        clearUsers,
        setActivateUser
    };
};
