import { createSlice } from "@reduxjs/toolkit";

export const directorSlice = createSlice({
    name: "director",
    initialState: {
        isLoading: false,
        directores: [],
        activateDirector: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadDirectores: (state, { payload }) => {
            state.directores = payload;
            state.isLoading = false;
        },
        onUpdateDirector: (state, { payload }) => {
            state.directores = state.directores.map((director) => {
                if (director.cdgo_dprtmnto === payload.cdgo_dprtmnto) {
                    return payload;
                }
                return director;
            });
            state.activateDirector = null;
            state.errores = undefined;
            state.isLoading = false;
        },
        onSetActivateDirectores: (state, { payload }) => {
            state.activateDirector = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onClearMessage: (state) => {
            state.message = undefined;
        },
        onClearDirectores: (state) => {
            state.directores = [];
            (state.activateDirector = null), (state.errores = undefined);
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
    onLoadDirectores,
    onUpdateDirector,
    onSetActivateDirectores,
    onLoadMessage,
    onClearMessage,
    onClearDirectores,
    onLoadErrores,
    onClearErrores,
} = directorSlice.actions;
