import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    users: [],
    activateUser: null,
    storageField: null,
    validate: undefined,
    message: undefined,
    errores: undefined,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadUsers: (state, { payload }) => {
            state.users = payload;
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
        onSetStorageFields: (state, { payload }) => {
            state.storageField = payload;
        },
        onClearUsers: (state) => {
            state.users = [];
            state.errores = undefined;
        },
        onValidate: (state, { payload }) => {
            state.isLoading = false;
            state.validate = payload;
        },
        onSetMessage: (state, { payload }) => {
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
    onUpdateUsers,
    onSetActivateUser,
    onSetStorageFields,
    onClearUsers,
    onValidate,
    onSetMessage,
    onClearValidates,
    onLoadErrores,
    onClearErrores,
} = usersSlice.actions;
