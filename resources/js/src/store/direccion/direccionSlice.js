import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    direcciones: [],
    activateDireccion: null,
    errores: undefined,
};

export const direccionSlice = createSlice({
    name: "direccion",
    initialState,
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadDirecciones: (state, { payload }) => {
            state.direcciones = payload;
            state.isLoading = false;
        },
        onSetActivateDireccion: (state, {payload}) => {
            state.activateDireccion = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearDirecciones: (state) => {
            state.isLoading = false;
            state.direcciones = [];
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
    onLoadDirecciones,
    onSetActivateDireccion,
    onClearDirecciones,
    onLoadErrores,
    onClearErrores,
} = direccionSlice.actions;
