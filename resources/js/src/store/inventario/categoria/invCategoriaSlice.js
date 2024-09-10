import { createSlice } from "@reduxjs/toolkit";

export const invCategoriaSlice = createSlice({
    name: "invCategoria",
    initialState: {
        isLoading: false,
        categorias: [],
        activateCategoria: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadCategorias: (state, { payload }) => {
            state.categorias = payload;
            state.isLoading = false;
        },
        onAddCategoria: (state, { payload }) => {
            state.categorias.push(payload);
            state.isLoading = false;
        },
        onUpdateCategoria: (state, { payload }) => {
            state.categorias = state.categorias.map((categoria) => {
                if (categoria.id === payload.id) {
                    return payload;
                }
                return categoria;
            });
            state.activateCategoria = null;
            state.isLoading = false;
        },
        onDeleteCategoria: (state) => {
            if (state.activateCategoria) {
                state.categorias = state.categorias.filter(
                    (categoria) => categoria.id === state.activateCategoria.id
                );
            }
            state.activateCategoria = null;
            state.errores = undefined;
        },
        onSetActivateCategoria: (state, { payload }) => {
            state.activateCategoria = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearCategorias: (state) => {
            state.categorias = [];
            state.activateCategoria = null;
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
    onLoadCategorias,
    onAddCategoria,
    onUpdateCategoria,
    onDeleteCategoria,
    onSetActivateCategoria,
    onClearCategorias,
    onLoadMessage,
    onLoadErrores,
} = invCategoriaSlice.actions;
