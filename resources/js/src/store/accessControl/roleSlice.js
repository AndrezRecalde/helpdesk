import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    roles: [],
    activeRole: null,
    message: undefined,
    errores: undefined,
};

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadRoles: (state, { payload }) => {
            state.isLoading = false;
            state.roles = payload;
            state.errores = undefined;
        },
        onAddRole: (state, { payload }) => {
            state.roles.push(payload);
            state.activeRole = null;
            state.isLoading = false;
        },
        onUpdateRole: (state, { payload }) => {
            state.roles = state.roles.map((role) => {
                if (role.id === payload.id) {
                    return payload;
                }
                return role;
            });
            state.activeRole = null;
            state.isLoading = false;
        },
        onDeleteRole: (state, { payload }) => {
            state.roles = state.roles.filter((role) => role.id !== payload);
            state.activeRole = null;
            state.isLoading = false;
        },
        onSetActiveRole: (state, { payload }) => {
            state.activeRole = payload;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.isLoading = false;
            state.errores = payload;
        },
        onClearRoles: (state) => {
            state.isLoading = false;
            state.roles = [];
            state.activeRole = null;
            state.message = undefined;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onLoadRoles,
    onAddRole,
    onUpdateRole,
    onDeleteRole,
    onSetActiveRole,
    onLoadMessage,
    onLoadErrores,
    onClearRoles,
} = roleSlice.actions;
