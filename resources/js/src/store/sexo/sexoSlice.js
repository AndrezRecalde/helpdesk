import { createSlice } from "@reduxjs/toolkit";

export const sexoSlice = createSlice({
    name: "sexo",
    initialState: {
        isLoading: false,
        sexo: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.counter = true;
        },
        onLoadSexo: (state, { payload }) => {
            state.sexo = payload;
            state.isLoading = false;
        },
        onClearSexo: (state) => {
            state.sexo = [];
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
    onLoadSexo,
    onClearSexo,
    onLoadErrores,
    onClearErrores,
} = sexoSlice.actions;
