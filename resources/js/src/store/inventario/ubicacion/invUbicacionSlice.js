import { createSlice } from "@reduxjs/toolkit";

export const invUbicacionSlice = createSlice({
    name: "invUbicacion",
    initialState: {
        isLoading: false,
        invUbicaciones: [],
        activateUbicacion: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadInvUbicaciones: (state, { payload }) => {
            state.invUbicaciones = payload;
            state.isLoading = false;
        },
        onAddInvUbicacion: (state, { payload }) => {
            state.invUbicaciones.push(payload);
            state.isLoading = false;
        },
        onUpdateInvUbicacion: (state, { payload }) => {
            state.invUbicaciones = state.invUbicaciones.map((ubicacion) => {
                if (ubicacion.id === payload.id) {
                    return payload;
                }
                return ubicacion;
            });
            state.activateUbicacion = null;
            state.isLoading = false;
        },
        onDeleteInvUbicacion: (state) => {
            if (state.activateUbicacion) {
                state.invUbicaciones = state.invUbicaciones.filter(
                    (ubicacion) => ubicacion.id === state.activateUbicacion.id
                );
            }
            state.activateUbicacion = null;
            state.errores = undefined;
        },
        onSetActivateInvUbicacion: (state, { payload }) => {
            state.activateUbicacion = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvUbicaciones: (state) => {
            state.invUbicaciones = [];
            state.activateUbicacion = null;
            state.isLoading = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
            state.isLoading = false;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onLoadInvUbicaciones,
    onAddInvUbicacion,
    onUpdateInvUbicacion,
    onDeleteInvUbicacion,
    onSetActivateInvUbicacion,
    onClearInvUbicaciones,
    onLoadMessage,
    onLoadErrores,
} = invUbicacionSlice.actions;
