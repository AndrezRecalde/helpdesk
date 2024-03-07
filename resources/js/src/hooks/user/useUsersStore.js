import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearUsers,
    onLoadErrores,
    onLoadMessage,
    onLoadUsers,
    onLoading,
    onSetActivateUser,
    onSetUserVerified,
    onUpdateUsers,
} from "../../store/user/usersSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useUsersStore = () => {
    const {
        isLoading,
        users,
        activateUser,
        validate,
        userVerified,
        message,
        errores,
    } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    /* GENERAL */
    const startLoadUsersGeneral = async ({ cdgo_direccion }) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/general/usuarios", {
                cdgo_direccion,
            });
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    /* GENERAL */
    const startLoadUsersExtrict = async (cdgo_direccion) => {
        try {
            dispatch(onLoading());
            const { data } = await helpdeskApi.post("/general/usuarios-extrict", {
                cdgo_direccion,
            });
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

    const startUpdateActivoUser = async (usuario) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/usuario/activo/${usuario.cdgo_usrio}`,
                usuario
            );
            dispatch(onUpdateUsers(usuario));
            dispatch(onLoadMessage(data));
            dispatch(onSetActivateUser(null));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const verifiedUser = async (usu_ci) => {
        try {
            const { data } = await helpdeskApi.post(
                "/gerencia/verified/usuario",
                { usu_ci }
            );
            if (data.status === "success") {
                const { usuario } = data;
                dispatch(onSetUserVerified(usuario));
            } else {
                dispatch(onSetUserVerified(null));
            }
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
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                return;
            }

            const { data } = await helpdeskApi.post(
                "/gerencia/store/usuario",
                user
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
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
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            console.log(error);
            ExceptionMessageError(error);
        }
    };

    const clearUsers = () => {
        dispatch(onClearUsers());
    };

    const setActivateUser = (user) => {
        dispatch(onSetActivateUser(user));
    };

    const setClearActivateUser = () => {
        dispatch(onSetActivateUser(null));
        dispatch(onSetUserVerified(null));
    };

    return {
        isLoading,
        users,
        activateUser,
        userVerified, //aqui
        validate,
        errores,
        message,

        startLoadUsersGeneral,
        startLoadUsersExtrict,
        startLoadUsers,
        startUpdateActivoUser,
        verifiedUser,
        clearUsers,
        setActivateUser,
        setClearActivateUser,
    };
};
