import { createSlice } from "@reduxjs/toolkit";

export const departamentoSlice = createSlice({
    name: "departamento",
    initialState: {
        isLoading: false,
        departamentos: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadDepartamentos: (state, { payload }) => {
            state.departamentos = payload;
            state.isLoading = false;
        },
        onClearDepartamentos: (state) => {
            state.departamentos = [];
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
    onLoadDepartamentos,
    onClearDepartamentos,
    onLoadErrores,
    onClearErrores,
} = departamentoSlice.actions;
