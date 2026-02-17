import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    permissions: [],
    activePermission: null,
    message: undefined,
    errores: undefined,
};

export const accessPermissionSlice = createSlice({
    name: "accessPermission",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadPermissions: (state, { payload }) => {
            state.isLoading = false;
            state.permissions = payload;
            state.errores = undefined;
        },
        onAddPermission: (state, { payload }) => {
            state.permissions.push(payload);
            state.activePermission = null;
            state.isLoading = false;
        },
        onUpdatePermission: (state, { payload }) => {
            state.permissions = state.permissions.map((permission) => {
                if (permission.id === payload.id) {
                    return payload;
                }
                return permission;
            });
            state.activePermission = null;
            state.isLoading = false;
        },
        onDeletePermission: (state, { payload }) => {
            state.permissions = state.permissions.filter(
                (permission) => permission.id !== payload,
            );
            state.activePermission = null;
            state.isLoading = false;
        },
        onSetActivePermission: (state, { payload }) => {
            state.activePermission = payload;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.isLoading = false;
            state.errores = payload;
        },
        onClearPermissions: (state) => {
            state.isLoading = false;
            state.permissions = [];
            state.activePermission = null;
            state.message = undefined;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onLoadPermissions,
    onAddPermission,
    onUpdatePermission,
    onDeletePermission,
    onSetActivePermission,
    onLoadMessage,
    onLoadErrores,
    onClearPermissions,
} = accessPermissionSlice.actions;
