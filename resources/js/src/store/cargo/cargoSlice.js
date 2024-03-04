import { createSlice } from "@reduxjs/toolkit";

export const cargoSlice = createSlice({
    name: "cargo",
    initialState: {
        isLoading: false,
        cargos: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.counter = true;
        },
        onLoadCargos: (state, { payload }) => {
            state.cargos = payload;
            state.isLoading = false;
        },
        onClearCargos: (state) => {
            state.cargos = [];
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
    onLoadCargos,
    onClearCargos,
    onLoadErrores,
    onClearErrores,
} = cargoSlice.actions;
