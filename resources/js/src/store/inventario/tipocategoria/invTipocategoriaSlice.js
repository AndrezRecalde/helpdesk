import { createSlice } from "@reduxjs/toolkit";

export const invTipocategoriaSlice = createSlice({
    name: "invTipoCategoria",
    initialState: {
        isLoading: false,
        tiposcategorias: [],
        activateTipocategoria: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadTiposcategorias: (state, { payload }) => {
            state.tiposcategorias = payload;
            state.isLoading = false;
        },
        onAddTipocategoria: (state, { payload }) => {
            state.tiposcategorias.push(payload);
            state.isLoading = false;
        },
        onUpdateTipocategoria: (state, { payload }) => {
            state.tiposcategorias = state.tiposcategorias.map((tipo) => {
                if (tipo.id === payload.id) {
                    return payload;
                }
                return tipo;
            });
            state.activateTipocategoria = null;
            state.isLoading = false;
        },
        onDeleteTipocategoria: (state) => {
            if (state.activateTipocategoria) {
                state.tiposcategorias = state.tiposcategorias.filter(
                    (tipo) => tipo.id === state.activateTipocategoria.id
                );
            }
            state.activateTipocategoria = null;
            state.errores = undefined;
        },
        onSetActivateTipocategoria: (state, { payload }) => {
            state.activateTipocategoria = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearTipocategorias: (state) => {
            state.tiposcategorias = [];
            state.activateTipocategoria = null;
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
    onLoadTiposcategorias,
    onAddTipocategoria,
    onUpdateTipocategoria,
    onDeleteTipocategoria,
    onSetActivateTipocategoria,
    onClearTipocategorias,
    onLoadMessage,
    onLoadErrores,
} = invTipocategoriaSlice.actions;
