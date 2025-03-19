import { createSlice } from "@reduxjs/toolkit";

export const invConsumibleSlice = createSlice({
    name: "invConsumible",
    initialState: {
        isLoading: false,
        isLoadingHistorial: false,
        isExport: false,
        consumibles: [],
        historial: [],
        activateConsumible: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadingHistorial: (state, { payload }) => {
            state.isLoadingHistorial = payload;
        },
        onExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onLoadInvConsumibles: (state, { payload }) => {
            state.consumibles = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onLoadInvHistorial: (state, { payload }) => {
            state.historial = payload;
            state.isLoadingHistorial = false;
            state.errores = undefined;
        },
        onAddInvConsumible: (state, { payload }) => {
            state.consumibles.push(payload);
            state.isLoading = false;
        },
        onUpdateInvConsumible: (state, { payload }) => {
            state.consumibles = state.consumibles.map((consumible) => {
                if (consumible.id === payload.id) {
                    return payload;
                }
                return consumible;
            });
            state.activateConsumible = null;
            state.isLoading = false;
        },
        onDeleteInvConsumible: (state) => {
            if (state.activateConsumible) {
                state.consumibles = state.consumibles.filter(
                    (consumible) => consumible.id === state.activateConsumible.id
                );
            }
            state.activateConsumible = null;
            state.errores = undefined;
        },
        onSetActivateInvConsumible: (state, { payload }) => {
            state.activateConsumible = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvConsumibles: (state) => {
            state.consumibles = [];
            state.historial = [];
            state.activateConsumible = null;
            state.isLoading = false;
        },
        onClearInvHistorial: (state) => {
            state.historial = [];
            state.activateConsumible = null;
            state.isLoadingHistorial = false;
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
    onLoadingHistorial,
    onExport,
    onLoadInvConsumibles,
    onLoadInvHistorial,
    onAddInvConsumible,
    onUpdateInvConsumible,
    onDeleteInvConsumible,
    onSetActivateInvConsumible,
    onClearInvConsumibles,
    onClearInvHistorial,
    onLoadMessage,
    onLoadErrores,
} = invConsumibleSlice.actions;
