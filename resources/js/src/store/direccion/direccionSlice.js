import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    direcciones: [],
    activeDireccion: null,
    validate: undefined,
    message: undefined,
    errores: undefined,
};

export const direccionSlice = createSlice({
    name: "direccion",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadDirecciones: (state, { payload }) => {
            state.direcciones = payload;
            state.isLoading = false;
        },
        onSetActiveDireccion: (state, { payload }) => {
            state.activeDireccion = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearDirecciones: (state) => {
            state.isLoading = false;
            state.direcciones = [];
            state.activeDireccion = null;
            state.validate = undefined;
            state.message = undefined;
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
    onSetActiveDireccion,
    onClearDirecciones,
    onLoadErrores,
    onClearErrores,
} = direccionSlice.actions;
