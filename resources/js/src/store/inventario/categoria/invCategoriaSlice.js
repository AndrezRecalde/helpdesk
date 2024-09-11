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
        onLoadInvCategorias: (state, { payload }) => {
            state.categorias = payload;
            state.isLoading = false;
        },
        onAddInvCategoria: (state, { payload }) => {
            state.categorias.push(payload);
            state.isLoading = false;
        },
        onUpdateInvCategoria: (state, { payload }) => {
            state.categorias = state.categorias.map((categoria) => {
                if (categoria.id === payload.id) {
                    return payload;
                }
                return categoria;
            });
            state.activateCategoria = null;
            state.isLoading = false;
        },
        onDeleteInvCategoria: (state) => {
            if (state.activateCategoria) {
                state.categorias = state.categorias.filter(
                    (categoria) => categoria.id === state.activateCategoria.id
                );
            }
            state.activateCategoria = null;
            state.errores = undefined;
        },
        onSetActivateInvCategoria: (state, { payload }) => {
            state.activateCategoria = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvCategorias: (state) => {
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
    onLoadInvCategorias,
    onAddInvCategoria,
    onUpdateInvCategoria,
    onDeleteInvCategoria,
    onSetActivateInvCategoria,
    onClearInvCategorias,
    onLoadMessage,
    onLoadErrores,
} = invCategoriaSlice.actions;
