import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearUsers,
    onLoadBirthdays,
    onLoadErrores,
    onLoadMessage,
    onLoadUsers,
    onLoading,
    onSetActivateResponsable,
    onSetActivateUser,
    onSetInfoSoportes,
    onSetPagination,
    onSetUserVerified,
    onUpdateUsers,
} from "../../store/user/usersSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useUsersStore = () => {
    const {
        isLoading,
        users,
        birthdays,
        activateUser,
        activateResponsable,
        validate,
        userVerified,
        infoSoportes,
        message,
        errores,
        paginacion,
    } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    /* GENERAL */
    const startLoadUsersGeneral = async ({ cdgo_direccion = null }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/usuarios", {
                cdgo_direccion,
            });
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
        } catch (error) {
            //console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    /* GENERAL */
    const startLoadUsersExtrict = async (cdgo_direccion) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                "/usuario/usuarios-extrict",
                {
                    cdgo_direccion,
                },
            );
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
        } catch (error) {
            //console.log(error);
            dispatch(onLoading(false));
            ExceptionMessageError(error);
        }
    };

    /* GERENCIA */
    const startLoadUsers = async ({
        cdgo_direccion = null,
        nmbre_usrio = "",
        lgin = "",
        pagina = 1,
        por_pagina = 10,
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/gerencia/admin/usuarios", {
                params: {
                    cdgo_direccion,
                    nmbre_usrio,
                    lgin,
                    pagina,
                    por_pagina,
                },
            });
            const { usuarios, paginacion } = data;
            dispatch(onLoadUsers(usuarios));
            dispatch(onSetPagination(paginacion));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startLoadBirthdays = async () => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get("/usuario/birthdays");
            const { birthdays } = data;
            dispatch(onLoadBirthdays(birthdays));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startUpdateActivoUser = async (usuario) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/usuario/activo/${usuario.cdgo_usrio}`,
                usuario,
            );
            dispatch(onUpdateUsers(usuario));
            dispatch(onLoadMessage(data));
            dispatch(onSetActivateUser(null));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startUpdateFechaIngreso = async (usuario, values) => {
        try {
            const { data } = await helpdeskApi.put(
                `/tthh/asistencia/update/fecha-ingreso/${usuario.cdgo_usrio}`,
                values,
            );
            dispatch(onLoadMessage(data));
            dispatch(onSetActivateUser(null));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const verifiedUser = async ({ lgin }) => {
        try {
            const { data } = await helpdeskApi.post(
                "/gerencia/verified/usuario",
                { lgin },
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

    const startFindUserResponsable = async (cdgo_usrio) => {
        try {
            const { data } = await helpdeskApi.post(
                "/gerencia/admin/show-user",
                { cdgo_usrio },
            );
            const { usuario } = data;
            //console.log(usuario)
            dispatch(onSetActivateResponsable(usuario));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    /* GERENTE */
    const startUpdatePassword = async (user) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/usuario/reset-password/${user.cdgo_usrio}`,
                user,
            );
            dispatch(onLoadMessage(data));
            dispatch(onSetActivateUser(null));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddUser = async (user, storageFields = null) => {
        try {
            if (user.cdgo_usrio) {
                const { data } = await helpdeskApi.put(
                    `/gerencia/update/usuario/${user.cdgo_usrio}`,
                    user,
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                if (storageFields) startLoadUsers(storageFields);
                return;
            }

            const { data } = await helpdeskApi.post(
                "/gerencia/store/usuario",
                user,
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            if (storageFields) startLoadUsers(storageFields);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddCodigoBiometrico = async (
        cdgo_usrio,
        asi_id_reloj,
        storageFields = null,
    ) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/codigo-biometrico/${cdgo_usrio}`,
                { asi_id_reloj },
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            if (storageFields) startLoadUsers(storageFields);
        } catch (error) {
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
                },
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startChangePwdUser = async (cdgo_usrio, paswrd) => {
        try {
            const { data } = await helpdeskApi.put(
                `/change-password/${cdgo_usrio}`,
                { paswrd },
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startLoadInfoUsersSoporte = async (usuario_id) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post("/usuario/info-soportes", {
                usuario_id,
            });
            const { info } = data;
            dispatch(onSetInfoSoportes(info));
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startLoadUsersWithRolesOrPermissions = async ({
        pagina = 1,
        por_pagina = 10,
        search = "",
    } = {}) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/gerencia/users-with-roles-permissions",
                {
                    params: {
                        pagina,
                        por_pagina,
                        search,
                    },
                },
            );
            const { usuarios, paginacion } = data;
            dispatch(onLoadUsers(usuarios));
            dispatch(onSetPagination(paginacion));
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const clearInfoSoportes = () => {
        dispatch(onSetInfoSoportes(undefined));
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
        birthdays,
        activateUser,
        activateResponsable,
        userVerified, //aqui
        infoSoportes,
        validate,
        validate,
        errores,
        message,
        paginacion,

        startAddUser,
        startLoadUsersGeneral,
        startLoadUsersExtrict,
        startLoadUsers,
        startLoadBirthdays,
        startUpdateActivoUser,
        startUpdateFechaIngreso,
        verifiedUser,
        startFindUserResponsable,
        startUpdatePassword,
        startChangePwdUser,
        startLoadInfoUsersSoporte,
        startLoadUsersWithRolesOrPermissions,
        startAddCodigoBiometrico,
        clearInfoSoportes,
        clearUsers,
        setActivateUser,
        setClearActivateUser,
    };
};
