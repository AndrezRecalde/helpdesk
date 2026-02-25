import { useDispatch, useSelector } from "react-redux";
import { useErrorException } from "../../hooks";
import {
    onClearUsers,
    onLoadBirthdays,
    onLoadErrores,
    onLoadMessage,
    onLoadUsers,
    onLoadUsersRolesPermissions,
    onLoading,
    onSetActivateResponsable,
    onSetActivateUser,
    onSetInfoSoportes,
    onSetUltimosFiltros,
    onSetUserVerified,
    onUpdateUsers,
} from "../../store/user/usersSlice";
import helpdeskApi from "../../api/helpdeskApi";

export const useUsersStore = () => {
    const {
        isLoading,
        users,
        usersRolesPermissions,
        birthdays,
        activateUser,
        activateResponsable,
        validate,
        userVerified,
        infoSoportes,
        message,
        errores,
        ultimosFiltros,
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
        } finally {
            dispatch(onLoading(false));
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
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startLoadUsers = async ({
        cdgo_direccion = null,
        nmbre_usrio = "",
        lgin = "",
    }) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/general/obtener-usuarios",
                {
                    params: {
                        cdgo_direccion,
                        nmbre_usrio,
                        lgin,
                    },
                },
            );
            const { usuarios } = data;
            dispatch(onLoadUsers(usuarios));
            dispatch(
                onSetUltimosFiltros({
                    cdgo_direccion,
                    nmbre_usrio,
                    lgin,
                }),
            );
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
            const { data } = await helpdeskApi.get(
                "/general/verified/usuario",
                { params: { lgin } },
            );
            if (data.status === "success") {
                dispatch(onSetUserVerified(data.existe));
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
                "/general/admin/show-user",
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

    const startAddUser = async (user) => {
        try {
            if (user.cdgo_usrio) {
                const { data } = await helpdeskApi.put(
                    `/general/update/usuario/${user.cdgo_usrio}`,
                    user,
                );
                dispatch(onLoadMessage(data));
                setTimeout(() => {
                    dispatch(onLoadMessage(undefined));
                }, 40);
                startLoadUsers({
                    ...ultimosFiltros,
                });
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
            startLoadUsers({
                ...ultimosFiltros,
            });
        } catch (error) {
            //console.log(error);
            ExceptionMessageError(error);
        }
    };

    const startAddCodigoBiometrico = async (cdgo_usrio, asi_id_reloj) => {
        try {
            const { data } = await helpdeskApi.put(
                `/gerencia/update/codigo-biometrico/${cdgo_usrio}`,
                { asi_id_reloj },
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            startLoadUsers({
                ...ultimosFiltros,
            });
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
        pagina_actual = 1,
        por_pagina = 10,
        search = "",
    } = {}) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.get(
                "/gerencia/users-with-roles-permissions",
                {
                    params: {
                        pagina_actual,
                        por_pagina,
                        search,
                    },
                },
            );
            const { usuarios } = data;
            dispatch(onLoadUsersRolesPermissions(usuarios));
        } catch (error) {
            ExceptionMessageError(error);
        } finally {
            dispatch(onLoading(false));
        }
    };

    const startAssignUserRolesPermissions = async (
        cdgo_usrio,
        roles = [],
        permissions = [],
        paginationParams = {},
    ) => {
        try {
            dispatch(onLoading(true));
            const { data } = await helpdeskApi.post(
                `/gerencia/user/${cdgo_usrio}/assign-roles-permissions`,
                { roles, permissions },
            );
            dispatch(onLoadMessage(data));
            setTimeout(() => {
                dispatch(onLoadMessage(undefined));
            }, 40);
            await startLoadUsersWithRolesOrPermissions(paginationParams);
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
        usersRolesPermissions,
        birthdays,
        activateUser,
        activateResponsable,
        userVerified, //aqui
        infoSoportes,
        validate,
        validate,
        errores,
        message,
        ultimosFiltros,

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
        startAssignUserRolesPermissions,
        startAddCodigoBiometrico,
        clearInfoSoportes,
        clearUsers,
        setActivateUser,
        setClearActivateUser,
    };
};
