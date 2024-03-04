import { createSlice } from "@reduxjs/toolkit";

export const directorSlice = createSlice({
    name: "director",
    initialState: {
        isLoading: false,
        directores: [],
        activateDirector: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.counter = true;
        },
        onLoadDirectores: (state, { payload }) => {
            state.directores = payload;
            state.isLoading = false;
        },
        onSetActivateDirectores: ( state, { payload }) => {
            state.activateDirector = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearDirectores: (state) => {
            state.directores = [];
            state.activateDirector = null,
            state.errores = undefined;
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
    onSetActivateDirectores,
    onClearDirectores,
    onLoadErrores,
    onClearErrores,
} = directorSlice.actions;
