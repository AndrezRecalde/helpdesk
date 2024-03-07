import { createSlice } from "@reduxjs/toolkit";

export const equipoSlice = createSlice({
    name: "equipo",
    initialState: {
        isLoading: false,
        equipos: [],
        activeEquipo: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadEquiposInformaticos: (state, { payload }) => {
            state.equipos = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onSetEquipoInformatico: (state, { payload }) => {
            state.activeEquipo = payload;
            state.errores = undefined;
        },
        onClearEquiposInformaticos: (state) => {
            state.equipos = [];
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
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
    onLoadEquiposInformaticos,
    onSetEquipoInformatico,
    onClearEquiposInformaticos,
    onLoadMessage,
    onLoadErrores,
    onClearErrores,
} = equipoSlice.actions;
