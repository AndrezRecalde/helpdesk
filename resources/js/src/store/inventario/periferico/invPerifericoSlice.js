import { createSlice } from "@reduxjs/toolkit";

export const invPerifericoSlice = createSlice({
    name: "invPeriferico",
    initialState: {
        isLoading: false,
        isExport: false,
        invPerifericos: [],
        activatePeriferico: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onLoadInvPerifericos: (state, { payload }) => {
            state.invPerifericos = payload;
            state.isLoading = false;
        },
        onAddInvPeriferico: (state, { payload }) => {
            state.invPerifericos.push(payload);
            state.isLoading = false;
        },
        onUpdateInvPeriferico: (state, { payload }) => {
            state.invPerifericos = state.invPerifericos.map((periferico) => {
                if (periferico.id === payload.id) {
                    return payload;
                }
                return periferico;
            });
            state.activatePeriferico = null;
            state.isLoading = false;
        },
        onDeleteInvPeriferico: (state) => {
            if (state.activatePeriferico) {
                state.invPerifericos = state.invPerifericos.filter(
                    (periferico) =>
                        periferico.id === state.activatePeriferico.id
                );
            }
            state.activatePeriferico = null;
            state.errores = undefined;
        },
        onSetActivateInvPeriferico: (state, { payload }) => {
            state.activatePeriferico = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvPerifericos: (state) => {
            state.invPerifericos = [];
            state.activatePeriferico = null;
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
    onExport,
    onLoadInvPerifericos,
    onAddInvPeriferico,
    onUpdateInvPeriferico,
    onDeleteInvPeriferico,
    onSetActivateInvPeriferico,
    onClearInvPerifericos,
    onLoadMessage,
    onLoadErrores,
} = invPerifericoSlice.actions;
