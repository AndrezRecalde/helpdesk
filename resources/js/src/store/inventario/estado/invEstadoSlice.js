import { createSlice } from "@reduxjs/toolkit";

export const invEstadoSlice = createSlice({
    name: "invEstado",
    initialState: {
        isLoading: false,
        invEstados: [],
        activateInvEstado: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadInvEstados: (state, { payload }) => {
            state.invEstados = payload;
            state.isLoading = false;
        },
        onAddInvEstado: (state, { payload }) => {
            state.invEstados.push(payload);
            state.isLoading = false;
        },
        onUpdateInvEstado: (state, { payload }) => {
            state.invEstados = state.invEstados.map((estado) => {
                if (estado.id === payload.id) {
                    return payload;
                }
                return estado;
            });
            state.activateInvEstado = null;
            state.isLoading = false;
        },
        onDeleteInvEstado: (state) => {
            if (state.activateInvEstado) {
                state.invEstados = state.invEstados.filter(
                    (estado) => estado.id === state.activateInvEstado.id
                );
            }
            state.activateInvEstado = null;
            state.errores = undefined;
        },
        onSetActivateInvEstado: (state, { payload }) => {
            state.activateInvEstado = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvEstados: (state) => {
            state.invEstados = [];
            state.activateInvEstado = null;
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
    onLoadInvEstados,
    onAddInvEstado,
    onUpdateInvEstado,
    onDeleteInvEstado,
    onSetActivateInvEstado,
    onClearInvEstados,
    onLoadMessage,
    onLoadErrores,
} = invEstadoSlice.actions;
