import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    users: [],
    usersRolesPermissions: [],
    birthdays: [],
    activateUser: null,
    activateResponsable: null,
    storageField: null,
    userVerified: null, // Booleano: true (existe), false (no existe), null (sin verificar)
    infoSoportes: undefined,
    validate: undefined,
    message: undefined,
    errores: undefined,
    ultimosFiltros: {
        cdgo_direccion: "",
        nmbre_usrio: "",
        lgin: "",
    },
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadUsers: (state, { payload }) => {
            state.users = payload;
            state.isLoading = false;
        },
        onLoadUsersRolesPermissions: (state, { payload }) => {
            state.usersRolesPermissions = payload;
            state.isLoading = false;
        },
        onLoadBirthdays: (state, { payload }) => {
            state.birthdays = payload;
            state.isLoading = false;
        },
        onUpdateUsers: (state, { payload }) => {
            state.users = state.users.map((user) => {
                if (user.cdgo_usrio === payload.cdgo_usrio) {
                    return payload;
                }
                return user;
            });
        },
        onSetActivateUser: (state, { payload }) => {
            state.activateUser = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onSetActivateResponsable: (state, { payload }) => {
            state.activateResponsable = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onSetStorageFields: (state, { payload }) => {
            state.storageField = payload;
        },
        onSetUserVerified: (state, { payload }) => {
            // AQUI
            state.userVerified = payload;
        },
        onSetInfoSoportes: (state, { payload }) => {
            state.infoSoportes = payload;
            state.isLoading = false;
        },
        onSetUltimosFiltros: (state, { payload }) => {
            state.ultimosFiltros = payload;
        },
        onClearUsers: (state) => {
            state.users = [];
            state.activateUser = null;
            state.activateResponsable = null;
            state.storageField = null;
            state.infoSoportes = undefined;
            state.errores = undefined;
            state.message = undefined;
            state.isLoading = false;
        },
        onValidate: (state, { payload }) => {
            state.isLoading = false;
            state.validate = payload;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onClearValidates: (state) => {
            state.isLoading = false;
            state.validate = undefined;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearErrores: (state) => {
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onLoadUsers,
    onLoadUsersRolesPermissions,
    onLoadBirthdays,
    onUpdateUsers,
    onSetActivateUser,
    onSetActivateResponsable,
    onSetStorageFields,
    onSetUserVerified,
    onSetInfoSoportes,
    onSetUltimosFiltros,
    onClearUsers,
    onValidate,
    onLoadMessage,
    onClearValidates,
    onLoadErrores,
    onClearErrores,
} = usersSlice.actions;
